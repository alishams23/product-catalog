type ProductDetail = {
  slug: string
  title: string
  image?: string
  price?: string
  description?: string
  href: string
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

export default defineCachedEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') ?? ''
  const encodedSlug = encodeURIComponent(slug)
  const href = `https://mbico.ir/products/${encodedSlug}/`

  const res = await fetch(href, {
    headers: {
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'
    }
  })

  if (!res.ok) {
    throw createError({
      statusCode: res.status,
      statusMessage: `MBICO product fetch failed (${res.status})`
    })
  }

  const html = await res.text()

  const titleFromOg = /<meta property="og:title" content="([^"]+)"/.exec(html)?.[1]
  const titleFromH1 = /<h1[^>]*class="[^"]*product-title[^"]*"[^>]*>(.*?)<\/h1>/.exec(html)?.[1]
  const title = decodeHtmlEntities(stripTags(titleFromH1 ?? titleFromOg ?? slug)).trim()

  const image = decodeHtmlEntities(/<meta property="og:image" content="([^"]+)"/.exec(html)?.[1] ?? '')
  const descriptionRaw = /<meta property="og:description" content="([^"]+)"/.exec(html)?.[1]
  const description = descriptionRaw ? decodeHtmlEntities(descriptionRaw).trim() : undefined

  const priceRaw = /<span class="woocommerce-Price-amount amount"><bdi>(.*?)<\/bdi>/.exec(html)?.[1]
  const price = priceRaw ? decodeHtmlEntities(stripTags(priceRaw)).trim() : undefined

  return {
    slug,
    title,
    image: image || undefined,
    price,
    description,
    href
  } satisfies ProductDetail
}, {
  maxAge: 60 * 60,
  getKey(event) {
    const slug = getRouterParam(event, 'slug') ?? ''
    return `mbico-product:${slug}`
  }
})

