type ContentBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'image'; src: string; alt?: string }
  | { type: 'video'; src: string }

type SpecModel = {
  name: string
  specs: Array<{ label: string; value: string }>
}

type NavItem = {
  id: string
  label: string
}

type FaqItem = {
  question: string
  answer: string
}

type ProductDetail = {
  slug: string
  title: string
  image?: string
  price?: string
  description?: string
  highlight?: string
  highlightHtml?: string
  summaryHtml?: string
  category?: string
  categoryHref?: string
  cartHref?: string
  heroImage?: string
  heroAlt?: string
  heroEnglish?: string
  heroTitle?: string
  heroTagline?: string
  heroCatalogHref?: string
  heroCatalogLabel?: string
  navItems?: NavItem[]
  moarefiBlocks?: ContentBlock[]
  moshakhasatBlocks?: ContentBlock[]
  videoBlocks?: ContentBlock[]
  specModels?: SpecModel[]
  specDownloadHref?: string
  videoGallery?: string[]
  faqItems?: FaqItem[]
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

function normalizeText(input: string): string {
  return input.replaceAll(/\s+/g, ' ').trim()
}

function makeAbsoluteUrl(input: string): string {
  const trimmed = input.trim()
  if (!trimmed) return trimmed
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  if (trimmed.startsWith('//')) return `https:${trimmed}`
  if (trimmed.startsWith('/')) return `https://mbico.ir${trimmed}`
  return trimmed
}

type JsonLdProduct = {
  description?: string
}

function parseJsonLdProduct(html: string): JsonLdProduct | undefined {
  const scriptRe = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
  let match: RegExpExecArray | null

  while ((match = scriptRe.exec(html))) {
    const raw = match[1]?.trim()
    if (!raw || !raw.includes('"@type":"Product"')) continue

    try {
      const parsed = JSON.parse(raw)

      if (Array.isArray(parsed)) {
        const product = parsed.find((item) => item?.['@type'] === 'Product')
        if (product) return product as JsonLdProduct
      }

      if (parsed && typeof parsed === 'object') {
        if (parsed['@type'] === 'Product') return parsed as JsonLdProduct
        const graph = parsed['@graph']
        if (Array.isArray(graph)) {
          const product = graph.find((item) => item?.['@type'] === 'Product')
          if (product) return product as JsonLdProduct
        }
      }
    } catch {
      continue
    }
  }

  return undefined
}

function extractBreadcrumb(html: string): { category?: string; categoryHref?: string } {
  const nav = /<nav class="woocommerce-breadcrumb[^"]*"[^>]*>([\s\S]*?)<\/nav>/.exec(html)?.[1]
  if (!nav) return {}

  const anchors: Array<{ href: string; label: string }> = []
  const anchorRe = /<a[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/g
  let match: RegExpExecArray | null
  while ((match = anchorRe.exec(nav))) {
    const href = decodeHtmlEntities(match[1] ?? '').trim()
    const label = decodeHtmlEntities(stripTags(match[2] ?? '')).trim()
    if (href && label) anchors.push({ href, label })
  }

  const last = anchors[anchors.length - 1]
  return last ? { category: last.label, categoryHref: last.href } : {}
}

function extractHighlight(html: string): string | undefined {
  const match = /<div class="text[^"]*">\s*<p[^>]*>([\s\S]*?)<\/p>[\s\S]*?<div class="product-price-container/i.exec(html)
  if (!match) return undefined
  const text = decodeHtmlEntities(stripTags(match[1] ?? '')).trim()
  return text || undefined
}

function extractHighlightHtml(html: string): string | undefined {
  const match = /<div class="text[^"]*">\s*<p[^>]*>([\s\S]*?)<\/p>[\s\S]*?<div class="product-price-container/i.exec(html)
  if (!match) return undefined
  return decodeHtmlEntities(match[1] ?? '').trim() || undefined
}

function extractSummaryHtml(html: string): string | undefined {
  const match = /<div class="text justifyalign[^"]*">[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i.exec(html)
  if (!match) return undefined
  return decodeHtmlEntities(match[1] ?? '').trim() || undefined
}

function extractHeroImage(html: string): { src?: string; alt?: string } {
  const tagMatch = /<img[^>]*class="[^"]*bg[^"]*attachment-original[^"]*"[^>]*>/i.exec(html)
  if (!tagMatch) return {}
  const tag = tagMatch[0]
  const srcMatch = /(?:data-lazy-src|src)="([^"]+)"/i.exec(tag)
  const altMatch = /alt="([^"]*)"/i.exec(tag)
  const src = srcMatch ? decodeHtmlEntities(srcMatch[1] ?? '') : undefined
  const alt = altMatch ? decodeHtmlEntities(altMatch[1] ?? '') : undefined
  return { src: src || undefined, alt: alt || undefined }
}

function stripScriptsAndStyles(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
}

function extractNavItems(html: string): NavItem[] {
  const items: NavItem[] = []
  const seen = new Set<string>()
  const navRe = /href="#([^"]+)"[^>]*>\s*<span>([^<]+)<\/span>/gi
  for (const match of html.matchAll(navRe)) {
    const id = normalizeText(match[1] ?? '')
    const label = normalizeText(decodeHtmlEntities(stripTags(match[2] ?? '')))
    if (!id || !label || seen.has(id)) continue
    items.push({ id, label })
    seen.add(id)
  }
  return items
}

function extractHeroData(html: string): {
  english?: string
  title?: string
  tagline?: string
  catalogHref?: string
  catalogLabel?: string
} {
  const heroSection = /<section class="section hide-for-small"[\s\S]*?<\/section>/i.exec(html)?.[0]
  const scope = heroSection ?? html
  const h1Match = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(scope)
  const title = h1Match ? normalizeText(decodeHtmlEntities(stripTags(h1Match[1] ?? ''))) : undefined

  const pMatches = [...scope.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
  const pTexts = pMatches
    .map((match) => normalizeText(decodeHtmlEntities(stripTags(match[1] ?? ''))))
    .filter(Boolean)

  const english = pTexts.find((text) => /[A-Za-z]/.test(text))

  let tagline: string | undefined
  if (h1Match?.index !== undefined) {
    const afterH1 = pMatches.find((match) => (match.index ?? 0) > h1Match.index)
    const afterText = afterH1 ? normalizeText(decodeHtmlEntities(stripTags(afterH1[1] ?? ''))) : ''
    tagline = afterText && afterText !== english ? afterText : undefined
  }

  const catalogMatch = /href="([^"]+\.pdf)"/i.exec(scope)
  const catalogHref = catalogMatch ? makeAbsoluteUrl(decodeHtmlEntities(catalogMatch[1] ?? '')) : undefined
  const catalogLabelMatch = /href="[^"]+\.pdf"[^>]*>\s*<span[^>]*>([^<]+)<\/span>/i.exec(scope)
  const catalogLabel = catalogLabelMatch
    ? normalizeText(decodeHtmlEntities(stripTags(catalogLabelMatch[1] ?? '')))
    : undefined

  return {
    english,
    title,
    tagline,
    catalogHref: catalogHref || undefined,
    catalogLabel
  }
}

function extractAnchorBlock(html: string, anchor: string, anchors: string[]): string | undefined {
  const anchorIndex = html.indexOf(`name="${anchor}"`)
  if (anchorIndex === -1) return undefined
  let endIndex = html.length
  for (const next of anchors) {
    if (next === anchor) continue
    const nextIndex = html.indexOf(`name="${next}"`, anchorIndex + 1)
    if (nextIndex !== -1 && nextIndex < endIndex) {
      endIndex = nextIndex
    }
  }
  return html.slice(anchorIndex, endIndex)
}

function tokenizeContent(rawHtml?: string): ContentBlock[] {
  if (!rawHtml) return []
  const html = stripScriptsAndStyles(rawHtml)
  const tokenRe = /<h2[^>]*>[\s\S]*?<\/h2>|<p[^>]*>[\s\S]*?<\/p>|<ul[^>]*>[\s\S]*?<\/ul>|<img[^>]*>|<source[^>]*>/gi
  const tokens = html.match(tokenRe) ?? []
  const blocks: ContentBlock[] = []
  const seenText = new Set<string>()
  const seenMedia = new Set<string>()

  for (const token of tokens) {
    if (token.startsWith('<h2')) {
      const inner = /<h2[^>]*>([\s\S]*?)<\/h2>/i.exec(token)?.[1] ?? ''
      const text = normalizeText(decodeHtmlEntities(stripTags(inner)))
      if (!text || seenText.has(text)) continue
      blocks.push({ type: 'heading', text })
      seenText.add(text)
      continue
    }

    if (token.startsWith('<p')) {
      const inner = /<p[^>]*>([\s\S]*?)<\/p>/i.exec(token)?.[1] ?? ''
      const text = normalizeText(decodeHtmlEntities(stripTags(inner)))
      if (!text || text.length < 3 || seenText.has(text)) continue
      blocks.push({ type: 'paragraph', text })
      seenText.add(text)
      continue
    }

    if (token.startsWith('<ul')) {
      const items = [...token.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
        .map((match) => normalizeText(decodeHtmlEntities(stripTags(match[1] ?? ''))))
        .filter(Boolean)
      if (!items.length) continue
      const key = items.join('|')
      if (seenText.has(key)) continue
      blocks.push({ type: 'list', items })
      seenText.add(key)
      continue
    }

    if (token.startsWith('<img')) {
      const srcMatch = /(?:data-lazy-src|src)="([^"]+)"/i.exec(token)
      if (!srcMatch) continue
      const src = makeAbsoluteUrl(decodeHtmlEntities(srcMatch[1] ?? ''))
      if (!src || src.startsWith('data:image') || seenMedia.has(src)) continue
      const alt = decodeHtmlEntities(/alt="([^"]*)"/i.exec(token)?.[1] ?? '').trim() || undefined
      blocks.push({ type: 'image', src, alt })
      seenMedia.add(src)
      continue
    }

    if (token.startsWith('<source')) {
      const srcMatch = /src="([^"]+)"/i.exec(token)
      if (!srcMatch) continue
      const src = makeAbsoluteUrl(decodeHtmlEntities(srcMatch[1] ?? ''))
      if (!src || seenMedia.has(src)) continue
      blocks.push({ type: 'video', src })
      seenMedia.add(src)
    }
  }

  return blocks
}

function extractDivBlock(html: string, startIndex: number): string | undefined {
  const openRe = /<div\b/gi
  const closeRe = /<\/div>/gi

  openRe.lastIndex = startIndex
  closeRe.lastIndex = startIndex

  const firstOpen = openRe.exec(html)
  if (!firstOpen || firstOpen.index !== startIndex) return undefined

  let depth = 1
  let cursor = openRe.lastIndex

  while (depth > 0) {
    const nextOpen = openRe.exec(html)
    const nextClose = closeRe.exec(html)
    if (!nextClose) return undefined

    if (nextOpen && nextOpen.index < nextClose.index) {
      depth += 1
      cursor = openRe.lastIndex
    } else {
      depth -= 1
      cursor = closeRe.lastIndex
    }
  }

  return html.slice(startIndex, cursor)
}

function extractSpecRowBlock(html: string): string | undefined {
  const rowRe = /<div class="row row-small align-equal align-center"[^>]*>/gi
  for (const match of html.matchAll(rowRe)) {
    const block = extractDivBlock(html, match.index ?? 0)
    if (!block) continue
    if (block.includes('tarieven-title') && block.includes('large-3')) {
      return block
    }
  }
  return undefined
}

function parseSpecModelsFromRow(rowBlock: string): SpecModel[] {
  const cards = rowBlock.split(/<div[^>]*class="col medium-6 small-6 large-3"[^>]*>/gi).slice(1)
  const models: SpecModel[] = []

  for (const card of cards) {
    const pMatches = [...card.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    if (!pMatches.length) continue
    const titleText = normalizeText(decodeHtmlEntities(stripTags(pMatches[0]?.[1] ?? '')))
    if (!titleText) continue

    const specs: SpecModel['specs'] = []
    for (const match of pMatches.slice(1)) {
      const pHtml = match[1] ?? ''
      const valueMatch = /<strong[^>]*>([\s\S]*?)<\/strong>/i.exec(pHtml)
      if (!valueMatch) continue
      const value = normalizeText(decodeHtmlEntities(stripTags(valueMatch[1] ?? '')))
      if (!value) continue
      let label = ''
      const spanMatch = /<span[^>]*>([\s\S]*?)<\/span>/i.exec(pHtml)
      if (spanMatch) {
        label = normalizeText(decodeHtmlEntities(stripTags(spanMatch[1] ?? '')))
      } else {
        const plain = normalizeText(decodeHtmlEntities(stripTags(pHtml)))
        label = plain.replace(value, '').replace(':', '').trim()
      }
      specs.push({ label, value })
    }

    models.push({ name: titleText, specs })
  }

  return models
}

function extractVideoGallery(html: string): string[] {
  const sources = new Set<string>()
  const linkRe = /class="button open-video[^"]*"[^>]*href="([^"]+)"/gi
  for (const match of html.matchAll(linkRe)) {
    const src = makeAbsoluteUrl(decodeHtmlEntities(match[1] ?? ''))
    if (!src) continue
    sources.add(src)
  }
  return Array.from(sources)
}

function extractFaqItems(html: string): FaqItem[] {
  const items: FaqItem[] = []
  const seen = new Set<string>()
  const faqRe = /<a[^>]*class="accordion-title[^"]*"[^>]*>[\s\S]*?<span>([\s\S]*?)<\/span>[\s\S]*?<\/a>[\s\S]*?<div class="accordion-inner">([\s\S]*?)<\/div>/gi
  for (const match of html.matchAll(faqRe)) {
    const question = normalizeText(decodeHtmlEntities(stripTags(match[1] ?? '')))
    const answer = normalizeText(decodeHtmlEntities(stripTags(match[2] ?? '')))
    if (!question || !answer || seen.has(question)) continue
    items.push({ question, answer })
    seen.add(question)
  }
  return items
}

function absolutizeRelativeLinks(html?: string): string | undefined {
  if (!html) return undefined
  return html.replace(/href="\/(?!\/)/g, 'href="https://mbico.ir/')
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
  const jsonLdProduct = parseJsonLdProduct(html)
  const summaryHtml = absolutizeRelativeLinks(extractSummaryHtml(html))
  const summaryText = summaryHtml ? decodeHtmlEntities(stripTags(summaryHtml)).trim() : undefined
  const descriptionRaw = summaryText ?? jsonLdProduct?.description ?? /<meta property="og:description" content="([^"]+)"/.exec(html)?.[1]
  const description = descriptionRaw ? decodeHtmlEntities(descriptionRaw).trim() : undefined

  const priceRaw = /<span class="woocommerce-Price-amount amount"><bdi>(.*?)<\/bdi>/.exec(html)?.[1]
  const price = priceRaw ? decodeHtmlEntities(stripTags(priceRaw)).trim() : undefined
  const highlight = extractHighlight(html)
  const highlightHtml = absolutizeRelativeLinks(extractHighlightHtml(html))
  const { category, categoryHref } = extractBreadcrumb(html)
  const cartId = /name="add-to-cart" value="([^"]+)"/.exec(html)?.[1]
  const cartHref = cartId ? `${href}?add-to-cart=${cartId}` : undefined
  const hero = extractHeroImage(html)
  const heroData = extractHeroData(html)
  const navItems = extractNavItems(html)

  const anchors = ['moarefi', 'moshakhasat', 'video', 'faq']
  const moarefiHtml = extractAnchorBlock(html, 'moarefi', anchors)
  const moshakhasatHtml = extractAnchorBlock(html, 'moshakhasat', anchors)
  const videoHtml = extractAnchorBlock(html, 'video', anchors)

  const specRowBlock = moshakhasatHtml ? extractSpecRowBlock(moshakhasatHtml) : undefined
  const specModels = specRowBlock ? parseSpecModelsFromRow(specRowBlock) : []
  const moshakhasatClean = specRowBlock && moshakhasatHtml
    ? moshakhasatHtml.replace(specRowBlock, '')
    : moshakhasatHtml
  const specDownloadHrefMatch = /href="([^"]+\.pdf)"/i.exec(moshakhasatHtml ?? '')
  const specDownloadHref = specDownloadHrefMatch
    ? makeAbsoluteUrl(decodeHtmlEntities(specDownloadHrefMatch[1] ?? ''))
    : undefined

  const videoGallery = videoHtml ? extractVideoGallery(videoHtml) : []
  const faqItems = extractFaqItems(html)

  return {
    slug,
    title,
    image: image || undefined,
    price,
    description,
    highlight,
    highlightHtml,
    summaryHtml,
    category,
    categoryHref,
    cartHref,
    heroImage: hero.src,
    heroAlt: hero.alt,
    heroEnglish: heroData.english,
    heroTitle: heroData.title,
    heroTagline: heroData.tagline,
    heroCatalogHref: heroData.catalogHref,
    heroCatalogLabel: heroData.catalogLabel,
    navItems: navItems.length ? navItems : undefined,
    moarefiBlocks: tokenizeContent(moarefiHtml),
    moshakhasatBlocks: tokenizeContent(moshakhasatClean),
    videoBlocks: tokenizeContent(videoHtml),
    specModels: specModels.length ? specModels : undefined,
    specDownloadHref: specDownloadHref || undefined,
    videoGallery: videoGallery.length ? videoGallery : undefined,
    faqItems: faqItems.length ? faqItems : undefined,
    href
  } satisfies ProductDetail
}, {
  maxAge: 60 * 60,
  getKey(event) {
    const slug = getRouterParam(event, 'slug') ?? ''
    return `mbico-product:v4:${slug}`
  }
})
