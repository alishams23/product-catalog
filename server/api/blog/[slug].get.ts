type BlogPostDetail = {
  slug: string
  title: string
  image?: string
  description?: string
  contentHtml?: string
  author?: string
  publishedAt?: string
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

function extractMetaContent(html: string, key: string, attribute: 'property' | 'name' = 'property'): string | undefined {
  const pattern = new RegExp(`<meta\\s+${attribute}="${key}"\\s+content="([^"]+)"`, 'i')
  return pattern.exec(html)?.[1]
}

function sanitizeHtml(input: string): string {
  return input
    .replaceAll(/<script[\s\S]*?<\/script>/gi, '')
    .replaceAll(/<style[\s\S]*?<\/style>/gi, '')
    .replaceAll(/<noscript[\s\S]*?<\/noscript>/gi, '')
    .trim()
}

function extractContentHtml(html: string): string {
  const patterns: RegExp[] = [
    /<div[^>]+class="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]+class="[^"]*elementor-widget-theme-post-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]+class="[^"]*post-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<article[^>]*class="[^"]*post[^"]*"[^>]*>([\s\S]*?)<\/article>/i
  ]

  for (const pattern of patterns) {
    const match = pattern.exec(html)
    if (match?.[1]) return sanitizeHtml(match[1])
  }

  return ''
}

export default defineCachedEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') ?? ''
  const encodedSlug = encodeURIComponent(slug)
  const href = `https://mbico.ir/blog/${encodedSlug}/`

  const res = await fetch(href, {
    headers: {
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'
    }
  })

  if (!res.ok) {
    throw createError({
      statusCode: res.status,
      statusMessage: `MBICO blog fetch failed (${res.status})`
    })
  }

  const html = await res.text()

  const titleRaw = /<meta property="og:title" content="([^"]+)"/.exec(html)?.[1]
  const title = decodeHtmlEntities(stripTags(titleRaw ?? slug)).trim()

  const image = decodeHtmlEntities(/<meta property="og:image" content="([^"]+)"/.exec(html)?.[1] ?? '')
  const descriptionRaw = /<meta property="og:description" content="([^"]+)"/.exec(html)?.[1]
  const description = descriptionRaw ? decodeHtmlEntities(descriptionRaw).trim() : undefined
  const authorRaw = extractMetaContent(html, 'author', 'name') ?? extractMetaContent(html, 'article:author')
  const author = authorRaw ? decodeHtmlEntities(stripTags(authorRaw)).trim() : undefined
  const publishedAt = extractMetaContent(html, 'article:published_time')
    ?? extractMetaContent(html, 'article:modified_time')
  const contentHtml = extractContentHtml(html)

  return {
    slug,
    title,
    image: image || undefined,
    description,
    contentHtml: contentHtml || undefined,
    author: author || undefined,
    publishedAt: publishedAt || undefined,
    href
  } satisfies BlogPostDetail
}, {
  maxAge: 60 * 60,
  getKey(event) {
    const slug = getRouterParam(event, 'slug') ?? ''
    return `mbico-blog:${slug}`
  }
})
