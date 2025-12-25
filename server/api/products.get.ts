type Product = {
  title: string
  href: string
  image: string
  price?: string
  slug: string
  cartHref?: string
}

type ProductSection = {
  title: string
  description?: string
  items: Product[]
}

type ProductsResponse = {
  page: number
  items: Product[]
  hasNext: boolean
  sections: ProductSection[]
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

function normalizeHref(href?: string): string | undefined {
  if (!href) return undefined
  if (href.startsWith('http://') || href.startsWith('https://')) return href
  return `https://mbico.ir${href}`
}

function extractDivBlock(html: string, startIndex: number): string | undefined {
  const firstOpen = html.indexOf('<div', startIndex)
  if (firstOpen === -1) return undefined

  let depth = 0
  let cursor = firstOpen

  while (cursor < html.length) {
    const nextOpen = html.indexOf('<div', cursor)
    const nextClose = html.indexOf('</div', cursor)

    if (nextClose === -1) return undefined

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1
      cursor = nextOpen + 4
      continue
    }

    depth -= 1
    cursor = nextClose + 5

    if (depth === 0) {
      const closeEnd = html.indexOf('>', cursor)
      return closeEnd === -1 ? html.slice(firstOpen) : html.slice(firstOpen, closeEnd + 1)
    }
  }

  return undefined
}

function extractParagraphText(segment: string): string | undefined {
  const match = /<p[^>]*>(.*?)<\/p>/s.exec(segment)
  if (!match) return undefined
  const text = decodeHtmlEntities(stripTags(match[1] ?? '')).trim()
  return text || undefined
}

function parseProducts(html: string, limit = 24): Product[] {
  const products: Product[] = []
  const seen = new Set<string>()

  const linkRe = /<a href="(https:\/\/mbico\.ir\/products\/[^"]+)"[^>]*aria-label="([^"]+)"/g
  while (products.length < limit) {
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
    const cartHrefRaw = /<a href="([^"]+)"[^>]*add_to_cart_button/.exec(after)?.[1]
    const cartHref = cartHrefRaw ? normalizeHref(decodeHtmlEntities(cartHrefRaw)) : undefined

    const image = decodeHtmlEntities(img)
    seen.add(href)
    products.push({ title, href, image, price, slug, cartHref })
  }

  return products
}

function extractMainContent(html: string): string {
  const match = /<main[^>]*>([\s\S]*?)<\/main>/i.exec(html)
  return match?.[1] ?? html
}

function extractSections(html: string): ProductSection[] {
  const sections: ProductSection[] = []
  const titleRe = /<span class="section-title-main"\s*>(.*?)<\/span>/g

  const matches: Array<{ title: string; start: number; end: number }> = []
  let match: RegExpExecArray | null
  while ((match = titleRe.exec(html))) {
    const title = decodeHtmlEntities(stripTags(match[1] ?? '')).trim()
    if (!title) continue
    matches.push({ title, start: match.index, end: match.index + match[0].length })
  }

  for (let i = 0; i < matches.length; i += 1) {
    const current = matches[i]
    if (!current) continue

    const sliceStart = current.end
    const sliceEnd = matches[i + 1]?.start ?? html.length
    const slice = html.slice(sliceStart, sliceEnd)
    const listOffset = slice.indexOf('<div class="row mbi-productlist-gradient')
    if (listOffset === -1) continue

    const listStart = sliceStart + listOffset
    const listBlock = extractDivBlock(html, listStart)
    if (!listBlock) continue

    const items = parseProducts(listBlock, 200)
    if (!items.length) continue

    const description = extractParagraphText(html.slice(sliceStart, listStart))
    sections.push({ title: current.title, description, items })
  }

  return sections
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
  const mainHtml = extractMainContent(html)
  const items = parseProducts(mainHtml)
  const sections = extractSections(mainHtml)
  const hasNext = html.includes('rel="next"') || html.includes(`/products/page/${page + 1}/`)

  return { page, items, hasNext, sections } satisfies ProductsResponse
}, {
  maxAge: 60 * 30,
  getKey(event) {
    const query = getQuery(event)
    const rawPage = Array.isArray(query.page) ? query.page[0] : query.page
    return `mbico-products:v2:${rawPage ?? '1'}`
  }
})
