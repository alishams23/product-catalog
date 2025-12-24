type Product = {
  title: string
  href: string
  image: string
  price?: string
  slug: string
}

type ProductsResponse = {
  page: number
  items: Product[]
  hasNext: boolean
}

function decodeHtmlEntities(input: string): string {
  return input
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#039;', '\'')
    .replaceAll('&nbsp;', ' ')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&ldquo;', '“')
    .replaceAll('&rdquo;', '”')
    .replaceAll(/&#x([0-9a-fA-F]+);/g, (_, hex: string) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replaceAll(/&#([0-9]+);/g, (_, num: string) => String.fromCodePoint(Number.parseInt(num, 10)))
}

function stripTags(input: string): string {
  return input.replaceAll(/<[^>]*>/g, '')
}

function parseProducts(html: string): Product[] {
  const products: Product[] = []
  const seen = new Set<string>()

  const linkRe = /<a href="(https:\/\/mbico\.ir\/products\/[^"]+)"[^>]*aria-label="([^"]+)"/g
  while (products.length < 24) {
    const match = linkRe.exec(html)
    if (!match) break

    const href = decodeHtmlEntities(match[1] ?? '')
    if (!href || seen.has(href)) continue

    const slugEncoded = /https:\/\/mbico\.ir\/products\/([^/?#]+)(?:\/|$)/.exec(href)?.[1]
    if (!slugEncoded) continue

    let slug = slugEncoded
    try {
      slug = decodeURIComponent(slugEncoded)
    } catch {
      slug = slugEncoded
    }

    const title = decodeHtmlEntities(match[2] ?? '').trim()
    const after = html.slice(match.index, match.index + 6000)

    const img
      = /data-lazy-src="([^"]+)"/.exec(after)?.[1]
        ?? /data-src="([^"]+)"/.exec(after)?.[1]
        ?? /<noscript>\s*<img[^>]*src="([^"]+)"/.exec(after)?.[1]

    if (!img) continue

    const priceRaw = /<span class="woocommerce-Price-amount amount"><bdi>(.*?)<\/bdi>/.exec(after)?.[1]
    const price = priceRaw ? decodeHtmlEntities(stripTags(priceRaw)).trim() : undefined

    const image = decodeHtmlEntities(img)
    seen.add(href)
    products.push({ title, href, image, price, slug })
  }

  return products
}

export default defineCachedEventHandler(async (event) => {
  const query = getQuery(event)
  const rawPage = Array.isArray(query.page) ? query.page[0] : query.page
  const page = Math.max(1, Number.parseInt(String(rawPage ?? '1'), 10) || 1)

  const url = page === 1 ? 'https://mbico.ir/products/' : `https://mbico.ir/products/page/${page}/`
  const res = await fetch(url, {
    headers: {
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'
    }
  })

  if (!res.ok) {
    throw createError({
      statusCode: res.status,
      statusMessage: `MBICO products fetch failed (${res.status})`
    })
  }

  const html = await res.text()
  const items = parseProducts(html)
  const hasNext = html.includes('rel="next"') || html.includes(`/products/page/${page + 1}/`)

  return { page, items, hasNext } satisfies ProductsResponse
}, {
  maxAge: 60 * 30,
  getKey(event) {
    const query = getQuery(event)
    const rawPage = Array.isArray(query.page) ? query.page[0] : query.page
    return `mbico-products:${rawPage ?? '1'}`
  }
})
