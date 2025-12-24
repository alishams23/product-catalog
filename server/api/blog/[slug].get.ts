type BlogPostDetail = {
  slug: string
  title: string
  image?: string
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

  return {
    slug,
    title,
    image: image || undefined,
    description,
    href
  } satisfies BlogPostDetail
}, {
  maxAge: 60 * 60,
  getKey(event) {
    const slug = getRouterParam(event, 'slug') ?? ''
    return `mbico-blog:${slug}`
  }
})

