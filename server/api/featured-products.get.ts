type FeaturedProduct = {
  title: string
  href: string
  image: string
}

function decodeHtmlEntities(input: string): string {
  return input
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#039;', "'")
    .replaceAll('&nbsp;', ' ')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
}

export default defineEventHandler(async () => {
  const res = await fetch('https://mbico.ir/', {
    headers: {
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'
    }
  })

  if (!res.ok) {
    throw createError({
      statusCode: res.status,
      statusMessage: `MBICO fetch failed (${res.status})`
    })
  }

  const html = await res.text()
  const marker = 'محصولات منتخب؛ راهکاری حرفه‌ای برای نیازهای شما'
  const startIndex = html.indexOf(marker)

  if (startIndex === -1) return [] satisfies FeaturedProduct[]

  const slice = html.slice(startIndex, startIndex + 200_000)

  const products: FeaturedProduct[] = []
  const seen = new Set<string>()

  const linkRe = /<a href="(https:\/\/mbico\.ir\/products\/[^"]+)"[^>]*aria-label="([^"]+)"/g
  while (products.length < 12) {
    const match = linkRe.exec(slice)
    if (!match) break

    const href = decodeHtmlEntities(match[1] ?? '')
    if (!href) continue
    if (seen.has(href)) continue

    const title = decodeHtmlEntities(match[2] ?? '').trim()
    const after = slice.slice(match.index, match.index + 3500)
    const img =
      /data-lazy-src="([^"]+)"/.exec(after)?.[1] ??
      /<noscript>\s*<img[^>]*src="([^"]+)"/.exec(after)?.[1]

    if (!img) continue

    const image = decodeHtmlEntities(img)
    seen.add(href)
    products.push({ title, href, image })
  }

  return products
})
