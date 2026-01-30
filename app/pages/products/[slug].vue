<script setup lang="ts">
definePageMeta({
  hideHeaderAtTop: true
})

const { t, localePath, isRtl } = useTranslations()

type ContentBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'image'; src: string; alt?: string }
  | { type: 'video'; src: string }

type VideoSlide = {
  type: 'video' | 'image'
  src: string
  label?: string
  poster?: string
}

type VideoItem = {
  url: string
  title?: string
}

type CertificatesBlock = {
  type: 'certificates'
  title: string
  description?: string
  items: Array<{ title: string; image: string }>
}

type RenderBlock = ContentBlock | CertificatesBlock

type SpecModel = {
  name: string
  specs: Array<{ label: string; value: string }>
}

type SpecTable = {
  columns: string[]
  rows: Array<{ label: string; values: Record<string, string> }>
}

type NavItem = {
  id: string
  label: string
}

type FaqItem = {
  question: string
  answer: string
  answerHtml?: string
}

type ProductDetail = {
  slug: string
  title: string
  image?: string
  imageGallery?: readonly string[]
  price?: string
  description?: string
  fullDescriptionHtml?: string
  fullDescription?: string
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
  heroVideo?: string
  heroCatalogHref?: string
  heroCatalogLabel?: string
  navItems?: readonly NavItem[]
  moarefiBlocks?: readonly ContentBlock[]
  moshakhasatBlocks?: readonly ContentBlock[]
  videoBlocks?: readonly ContentBlock[]
  specModels?: readonly SpecModel[]
  specTable?: SpecTable
  specDownloadHref?: string
  videoGallery?: readonly string[]
  videoItems?: readonly VideoItem[]
  faqItems?: readonly FaqItem[]
  relatedProducts?: readonly RelatedProduct[]
  href: string
}

type CategoryDetail = {
  id: number
  title: string
  slug: string
  image?: string | null
  short_description?: string
  description?: string
}

type RootCategory = {
  id: number
  name: string
  slug: string
  categories: Array<{
    id: number
    name: string
    slug: string
    root_category?: {
      id: number
      name: string
      slug: string
    }
  }>
}

type RelatedProduct = {
  id?: number
  title: string
  slug: string
  image?: string
  category?: string
}

type ApiCategory = {
  id?: number
  name?: string
  slug?: string
}

type ApiGalleryImage = {
  id?: number
  url?: string
  alt_text?: string
  sort_order?: number
}

type ApiFaqItemV2 = {
  question?: string
  answer?: string
  sort_order?: number
}

type ApiProductVideo = {
  id?: number
  url?: string
  title?: string
  sort_order?: number
}

type ApiRelatedProduct = {
  id?: number
  title?: string
  slug?: string
  short_description?: string
  hero_image?: string
  categories?: ApiCategory[]
}

type ApiMedia = {
  media_type?: string
  role?: string
  title?: string
  url?: string
  image?: string | null
  file?: string | null
  alt_text?: string
  is_primary?: boolean
  sort_order?: number
}

type ApiFeature = {
  title?: string
  body?: string
  sort_order?: number
}

type ApiSpecification = {
  name?: string
  value?: string
  unit?: string
  sort_order?: number
}

type ApiNavItem = {
  anchor_id?: string
  label?: string
  href?: string
  sort_order?: number
}

type ApiContentBlock = {
  section?: string
  block_type?: string
  title?: string
  body?: string
  media?: ApiMedia | null
  items?: Array<{ label?: string; value?: string; sort_order?: number }>
  sort_order?: number
}

type ApiSpecModel = {
  title?: string
  spec_items?: Array<{ name?: string; value?: string; unit?: string; sort_order?: number }>
  sort_order?: number
}

type ApiSpecTable = {
  columns?: Array<string | number | null>
  rows?: Array<{
    label?: string | null
    values?: Record<string, string | number | null>
  }>
}

type ApiFaqItem = {
  question?: string
  answer_html?: string
  sort_order?: number
}

type ApiProductDetail = {
  id?: number
  title?: string
  slug?: string
  short_description?: string
  description?: string
  full_description?: string
  full_decription?: string
  hero_image?: string
  hero_video?: string
  gallery_images?: ApiGalleryImage[]
  faq_items?: ApiFaqItemV2[]
  videos?: ApiProductVideo[]
  related_products?: ApiRelatedProduct[]
  categories?: ApiCategory[] | number[]
  highlights?: string
  applications?: string
  technical_overview?: string
  model_number?: string
  brand?: string
  warranty?: string
  datasheet_url?: string
  brochure_url?: string
  demo_video_url?: string
  price?: string | number
  highlight?: string
  highlight_html?: string
  summary_html?: string
  hero_title?: string
  hero_tagline?: string
  hero_english?: string
  hero_alt?: string
  hero_video_url?: string
  hero_catalog_href?: string
  hero_catalog_label?: string
  cart_href?: string
  spec_download_href?: string
  meta_title?: string
  meta_description?: string
  is_featured?: boolean
  status?: string
  published_at?: string
  categories?: number[]
  media?: ApiMedia[]
  features?: ApiFeature[]
  specifications?: ApiSpecification[]
  nav_items?: ApiNavItem[]
  content_blocks?: ApiContentBlock[]
  spec_models?: ApiSpecModel[]
  spec_table?: ApiSpecTable | null
  faq_items?: ApiFaqItem[]
  navItems?: NavItem[]
  moarefiBlocks?: ContentBlock[]
  moshakhasatBlocks?: ContentBlock[]
  videoBlocks?: ContentBlock[]
  specModels?: SpecModel[]
  specDownloadHref?: string
  videoGallery?: string[]
  faqItems?: FaqItem[]
  image?: string
  category?: string
  categoryHref?: string
  cartHref?: string
  highlightHtml?: string
  summaryHtml?: string
  heroImage?: string
  heroAlt?: string
  heroEnglish?: string
  heroTitle?: string
  heroTagline?: string
  heroVideo?: string
  heroCatalogHref?: string
  heroCatalogLabel?: string
  href?: string
}

function decodeHtmlEntities(input: string): string {
  return input
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#039;', '\'')
    .replaceAll('&nbsp;', ' ')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&ldquo;', '"')
    .replaceAll('&rdquo;', '"')
    .replaceAll(/&#x([0-9a-fA-F]+);/g, (_, hex: string) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replaceAll(/&#([0-9]+);/g, (_, num: string) => String.fromCodePoint(Number.parseInt(num, 10)))
}

function normalizeText(input: string): string {
  return decodeHtmlEntities(input || '').replace(/\s+/g, ' ').trim()
}

function stripHtml(input: string): string {
  return normalizeText((input || '').replace(/<[^>]*>/g, ' '))
}

function looksLikeHtml(input: string): boolean {
  return /<[^>]+>/.test(input)
}

function resolveFullDescription(input: {
  full_description?: string
  full_decription?: string
}): string {
  const candidates = [input.full_description, input.full_decription]
  for (const value of candidates) {
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return ''
}

function safeDecodeURIComponent(value: string): string {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function toTelLink(value: string): string {
  const map: Record<string, string> = {
    '۰': '0',
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9'
  }
  const normalized = value.replace(/[۰-۹]/g, (digit) => map[digit] ?? digit)
  const digits = normalized.replace(/[^0-9+]/g, '')
  return digits ? `tel:${digits}` : ''
}

function extractCategorySlug(href: string | undefined): string {
  if (!href) return ''
  const match = /\/categories\/([^/?#]+)/.exec(href)
  if (match?.[1]) return safeDecodeURIComponent(match[1]).trim()
  try {
    const url = href.startsWith('http')
      ? new URL(href)
      : new URL(href, 'https://example.com')
    const param = url.searchParams.get('category') ?? ''
    if (param) return safeDecodeURIComponent(param).trim()
  } catch {
    const queryIndex = href.indexOf('?')
    if (queryIndex !== -1) {
      const query = href.slice(queryIndex + 1).split('#')[0]
      for (const part of query.split('&')) {
        const [key, value] = part.split('=')
        if (key === 'category' && value) return safeDecodeURIComponent(value).trim()
      }
    }
  }
  const fallback = href.split('?')[0]?.split('#')[0]?.split('/').filter(Boolean).pop() ?? ''
  return safeDecodeURIComponent(fallback).trim()
}

function sortByOrder<T extends { sort_order?: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
}

function coerceMediaUrl(value: unknown): { url: string; alt?: string } {
  if (typeof value === 'string') return { url: value }
  if (value && typeof value === 'object') {
    const maybe = value as {
      url?: unknown
      src?: unknown
      href?: unknown
      image?: unknown
      file?: unknown
      alt_text?: unknown
      alt?: unknown
    }
    const url = typeof maybe.url === 'string'
      ? maybe.url
      : typeof maybe.src === 'string'
        ? maybe.src
        : typeof maybe.href === 'string'
          ? maybe.href
          : typeof maybe.image === 'string'
            ? maybe.image
            : typeof maybe.file === 'string'
              ? maybe.file
          : ''
    const alt = typeof maybe.alt_text === 'string'
      ? maybe.alt_text
      : typeof maybe.alt === 'string'
        ? maybe.alt
        : undefined
    return { url, alt }
  }
  return { url: '' }
}

function isVideoUrl(url: string): boolean {
  return /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(url)
}

function isImageMedia(item: ApiMedia): boolean {
  if (item.media_type) return item.media_type === 'image'
  const url = coerceMediaUrl(item).url
  return Boolean(url) && !isVideoUrl(url)
}

function isVideoMedia(item: ApiMedia): boolean {
  if (item.media_type) return item.media_type === 'video'
  const url = coerceMediaUrl(item).url
  return Boolean(url) && isVideoUrl(url)
}

const certificateHeadingKeywords = [
  ['استاندارد', 'گواهینامه'],
  ['certificate', 'standard'],
  ['сертификат', 'стандарт']
]

function isCertificatesHeading(text: string): boolean {
  const normalized = text.toLowerCase()
  return certificateHeadingKeywords.some((keywords) =>
    keywords.every((keyword) => normalized.includes(keyword))
  )
}

function normalizeBlocks(blocks: ContentBlock[] | undefined): ContentBlock[] {
  if (!blocks?.length) return []
  return blocks.flatMap((block) => {
    if (block.type === 'image' || block.type === 'video') {
      const { url, alt } = coerceMediaUrl((block as { src?: unknown }).src)
      if (!url) return []
      if (block.type === 'video') return [{ type: 'video', src: url }]
      const imageAlt = alt || block.alt
      return [{ type: 'image', src: url, alt: imageAlt }]
    }
    return [block]
  })
}

function normalizeSpecTable(input: ApiSpecTable | string | null | undefined): SpecTable | undefined {
  if (!input) return undefined
  let table: ApiSpecTable | null = null

  if (typeof input === 'string') {
    try {
      table = JSON.parse(input) as ApiSpecTable
    } catch {
      return undefined
    }
  } else {
    table = input
  }

  const rawColumns = Array.isArray(table?.columns)
    ? table.columns.map((col) => String(col ?? '')).filter(Boolean)
    : []
  const columns = rawColumns.map((col) => normalizeText(col)).filter(Boolean)
  if (!columns.length) return undefined

  const rows = Array.isArray(table?.rows) ? table.rows : []
  const normalizedRows = rows.map((row) => {
    if (!row || typeof row !== 'object') return null
    const label = normalizeText(String(row.label ?? ''))
    const valuesRaw = row.values && typeof row.values === 'object' ? row.values : {}
    const values: Record<string, string> = {}
    rawColumns.forEach((rawCol, index) => {
      const colLabel = columns[index] || normalizeText(rawCol)
      const rawValue = (valuesRaw as Record<string, unknown>)[rawCol]
        ?? (valuesRaw as Record<string, unknown>)[colLabel]
      values[colLabel] = normalizeText(rawValue === undefined || rawValue === null ? '' : String(rawValue))
    })
    return { label, values }
  }).filter((row): row is { label: string; values: Record<string, string> } =>
    Boolean(row && (row.label || Object.values(row.values).some(Boolean)))
  )

  if (!normalizedRows.length) return undefined
  return { columns, rows: normalizedRows }
}

function normalizeVideoItems(items: ApiProductVideo[] | undefined, fallbackTitle: string): VideoItem[] {
  const list = sortByOrder(items ?? [])
    .map((item) => ({
      url: normalizeText(item.url ?? ''),
      title: normalizeText(item.title ?? '')
    }))
    .filter((item) => item.url)
  return list.map((item) => ({
    url: item.url,
    title: item.title || fallbackTitle
  }))
}

function normalizeRelatedProducts(items: ApiRelatedProduct[] | undefined): RelatedProduct[] {
  return (items ?? [])
    .map((item) => {
      const title = normalizeText(item.title ?? '')
      const slug = normalizeText(item.slug ?? '')
      const image = normalizeText(item.hero_image ?? '')
      const category = normalizeText(item.categories?.[0]?.name ?? '')
      if (!title || !slug) return null
      return {
        id: item.id,
        title,
        slug,
        image: image || undefined,
        category: category || undefined
      }
    })
    .filter((item): item is RelatedProduct => Boolean(item))
}

function mapApiV2(api: ApiProductDetail, fallbackSlug: string): ProductDetail {
  const slug = normalizeText(api.slug ?? fallbackSlug)
  const title = normalizeText(api.title ?? slug)

  const categoryItems = (Array.isArray(api.categories) ? api.categories : [])
    .filter((item): item is ApiCategory => Boolean(item && typeof item === 'object'))
  const primaryCategory = categoryItems.find((item) => normalizeText(item.slug ?? ''))
  const category = normalizeText(primaryCategory?.name ?? '')
  const categoryHref = primaryCategory?.slug
    ? `/categories/${encodeURIComponent(primaryCategory.slug)}`
    : undefined

  const heroImage = normalizeText(api.hero_image ?? '')
  const heroVideo = normalizeText(api.hero_video ?? '')

  const gallery = sortByOrder(api.gallery_images ?? [])
  const galleryUrls = gallery
    .map((item) => normalizeText(item.url ?? ''))
    .filter(Boolean)

  const heroAlt = (() => {
    if (!heroImage) return ''
    const match = gallery.find((item) => normalizeText(item.url ?? '') === heroImage)
    return normalizeText(match?.alt_text ?? '')
  })()

  const imageGallery = Array.from(new Set([heroImage, ...galleryUrls].filter(Boolean)))
  const image = heroImage || imageGallery[0] || ''

  const rawDescription = typeof api.description === 'string' ? api.description.trim() : ''
  const summaryHtml = rawDescription && looksLikeHtml(rawDescription) ? rawDescription : ''
  const descriptionText = summaryHtml ? '' : normalizeText(rawDescription)
  const shortDescription = normalizeText(api.short_description ?? '')
  const description = descriptionText || (summaryHtml ? stripHtml(rawDescription) : '')
  const rawFullDescription = resolveFullDescription(api)
  const fullDescriptionHtml = rawFullDescription && looksLikeHtml(rawFullDescription)
    ? decodeHtmlEntities(rawFullDescription)
    : ''
  const fullDescription = fullDescriptionHtml ? '' : normalizeText(rawFullDescription)

  const faqItems = sortByOrder(api.faq_items ?? [])
    .map((item) => {
      const rawAnswer = (item.answer ?? '').trim()
      const answerHtml = rawAnswer && looksLikeHtml(rawAnswer) ? decodeHtmlEntities(rawAnswer) : ''
      return {
        question: normalizeText(item.question ?? ''),
        answer: stripHtml(answerHtml || rawAnswer),
        answerHtml: answerHtml || undefined
      }
    })
    .filter((item) => item.question && item.answer)

  const videoGallery = heroVideo ? [heroVideo] : []
  const videoItems = normalizeVideoItems(api.videos, title)
  if (heroVideo && !videoItems.some((item) => item.url === heroVideo)) {
    videoItems.unshift({ url: heroVideo, title })
  }
  const relatedProducts = normalizeRelatedProducts(api.related_products)
  const specTable = normalizeSpecTable(api.spec_table ?? undefined)

  return {
    slug,
    title,
    image: image || undefined,
    imageGallery: imageGallery.length ? imageGallery : undefined,
    description: description || undefined,
    fullDescriptionHtml: fullDescriptionHtml || undefined,
    fullDescription: fullDescription || undefined,
    summaryHtml: summaryHtml || undefined,
    category: category || undefined,
    categoryHref: categoryHref || undefined,
    heroImage: heroImage || undefined,
    heroAlt: heroAlt || undefined,
    heroTitle: title || undefined,
    heroTagline: shortDescription || undefined,
    heroVideo: heroVideo || undefined,
    videoGallery: videoGallery.length ? videoGallery : undefined,
    videoItems: videoItems.length ? videoItems : undefined,
    faqItems: faqItems.length ? faqItems : undefined,
    relatedProducts: relatedProducts.length ? relatedProducts : undefined,
    specTable,
    href: slug ? `/products/${encodeURIComponent(slug)}` : ''
  }
}

function mapLegacyApi(api: ApiProductDetail, fallbackSlug: string): ProductDetail {
  const moarefiBlocks = normalizeBlocks(api.moarefiBlocks)
  const moshakhasatBlocks = normalizeBlocks(api.moshakhasatBlocks)
  const videoBlocks = normalizeBlocks(api.videoBlocks)
  const videoGallery = (api.videoGallery ?? []).map((item) => coerceMediaUrl(item).url).filter(Boolean)
  const videoItems = videoGallery.map((url) => ({ url, title: normalizeText(api.title ?? fallbackSlug) }))
  const relatedProducts = normalizeRelatedProducts(api.related_products)
  const specTable = normalizeSpecTable(api.spec_table ?? undefined)
  const rawFullDescription = resolveFullDescription(api)
  const fullDescriptionHtml = rawFullDescription && looksLikeHtml(rawFullDescription)
    ? decodeHtmlEntities(rawFullDescription)
    : ''
  const fullDescription = fullDescriptionHtml ? '' : normalizeText(rawFullDescription)

  const image = coerceMediaUrl(api.image).url
  const heroImage = coerceMediaUrl(api.heroImage).url
  const heroAlt = coerceMediaUrl(api.heroImage).alt || api.heroAlt
  const heroVideo = coerceMediaUrl(api.heroVideo).url
  const legacyMedia = sortByOrder(api.media ?? []).filter(isImageMedia)
  const legacyGallery = legacyMedia.map((item) => coerceMediaUrl(item).url).filter(Boolean)
  const imageGallery = Array.from(new Set([heroImage, image, ...legacyGallery].filter(Boolean)))

  return {
    slug: api.slug ?? fallbackSlug,
    title: api.title ?? api.heroTitle ?? fallbackSlug,
    image: image || undefined,
    imageGallery: imageGallery.length ? imageGallery : undefined,
    price: api.price ? String(api.price) : undefined,
    description: api.description,
    fullDescriptionHtml: fullDescriptionHtml || undefined,
    fullDescription: fullDescription || undefined,
    highlight: api.highlight,
    highlightHtml: api.highlightHtml,
    summaryHtml: api.summaryHtml,
    category: api.category,
    categoryHref: api.categoryHref,
    cartHref: api.cartHref,
    heroImage: heroImage || undefined,
    heroAlt: heroAlt || undefined,
    heroEnglish: api.heroEnglish,
    heroTitle: api.heroTitle,
    heroTagline: api.heroTagline,
    heroVideo: heroVideo || undefined,
    heroCatalogHref: api.heroCatalogHref,
    heroCatalogLabel: api.heroCatalogLabel,
    navItems: api.navItems,
    moarefiBlocks: moarefiBlocks.length ? moarefiBlocks : undefined,
    moshakhasatBlocks: moshakhasatBlocks.length ? moshakhasatBlocks : undefined,
    videoBlocks: videoBlocks.length ? videoBlocks : undefined,
    specModels: api.specModels,
    specTable,
    specDownloadHref: api.specDownloadHref,
    videoGallery: videoGallery.length ? videoGallery : undefined,
    videoItems: videoItems.length ? videoItems : undefined,
    faqItems: api.faqItems,
    relatedProducts: relatedProducts.length ? relatedProducts : undefined,
    href: api.href ?? ''
  }
}

function mapApiToProduct(api: ApiProductDetail | null | undefined, fallbackSlug: string): ProductDetail {
  if (api?.faqItems || api?.moarefiBlocks || api?.moshakhasatBlocks || api?.videoBlocks) {
    return mapLegacyApi(api, fallbackSlug)
  }

  if (api && (api.hero_image || api.hero_video || Array.isArray(api.gallery_images))) {
    return mapApiV2(api, fallbackSlug)
  }

  const media = sortByOrder(api?.media ?? [])
  const imageMedia = media.filter(isImageMedia)
  const videoMedia = media.filter(isVideoMedia)

  const heroMedia = imageMedia.find((item) => item.role === 'hero')
    ?? imageMedia.find((item) => item.is_primary)
    ?? imageMedia[0]
  const primaryImage = imageMedia.find((item) => item.is_primary)
    ?? heroMedia
    ?? imageMedia[0]

  const heroImage = coerceMediaUrl(heroMedia).url
  const heroAlt = normalizeText(api?.hero_alt ?? heroMedia?.alt_text ?? heroMedia?.title ?? '')
  const image = coerceMediaUrl(primaryImage ?? heroImage).url
  const imageGallery = imageMedia
    .map((item) => coerceMediaUrl(item).url)
    .filter(Boolean)

  const demoVideo = coerceMediaUrl(api?.demo_video_url ?? api?.hero_video_url).url
  const videoGallery = sortByOrder(videoMedia)
    .map((item) => coerceMediaUrl(item).url)
    .filter(Boolean)

  if (demoVideo && !videoGallery.includes(demoVideo)) {
    videoGallery.unshift(demoVideo)
  }

  const navItems = sortByOrder(api?.nav_items ?? [])
    .map((item) => ({
      id: normalizeText(item.anchor_id ?? ''),
      label: normalizeText(item.label ?? item.anchor_id ?? '')
    }))
    .filter((item) => item.id && item.label)

  const blocksBySection = (section: string) => sortByOrder(api?.content_blocks ?? [])
    .filter((block) => normalizeText(block.section ?? '').toLowerCase() === section)
    .flatMap<ContentBlock>((block) => {
      const type = normalizeText(block.block_type ?? '').toLowerCase()
      if (type === 'heading') {
        const text = normalizeText(block.title ?? block.body ?? '')
        return text ? [{ type: 'heading', text }] : []
      }
      if (type === 'paragraph') {
        const text = normalizeText(block.body ?? block.title ?? '')
        return text ? [{ type: 'paragraph', text }] : []
      }
      if (type === 'list') {
        const items = sortByOrder(block.items ?? [])
          .map((item) => {
            const label = normalizeText(item.label ?? '')
            const value = normalizeText(item.value ?? '')
            if (label && value) return `${label}: ${value}`
            return label || value
          })
          .filter(Boolean)
        return items.length ? [{ type: 'list', items }] : []
      }
      if (type === 'image' || type === 'video') {
        const mediaValue = block.media?.url ?? block.media ?? ''
        const { url, alt } = coerceMediaUrl(mediaValue)
        if (!url) return []
        if (type === 'video') return [{ type: 'video', src: url }]
        const resolvedAlt = normalizeText(block.media?.alt_text ?? block.media?.title ?? block.title ?? alt ?? '')
        return [{ type: 'image', src: url, alt: resolvedAlt || undefined }]
      }
      return []
    })

  const moarefiBlocks = blocksBySection('moarefi')
  if (!moarefiBlocks.length && (api?.features?.length ?? 0) > 0) {
    const items = sortByOrder(api?.features ?? [])
      .map((feature) => normalizeText(feature.title ?? ''))
      .filter(Boolean)
    if (items.length) moarefiBlocks.push({ type: 'list', items })
  }

  const moshakhasatBlocks = blocksBySection('moshakhasat')
  if (!moshakhasatBlocks.length && (api?.specifications?.length ?? 0) > 0) {
    const items = sortByOrder(api?.specifications ?? [])
      .map((spec) => {
        const name = normalizeText(spec.name ?? '')
        const value = normalizeText(spec.value ?? '')
        const unit = normalizeText(spec.unit ?? '')
        const valueWithUnit = [value, unit].filter(Boolean).join(' ')
        if (name && valueWithUnit) return `${name}: ${valueWithUnit}`
        return name || valueWithUnit
      })
      .filter(Boolean)
    if (items.length) moshakhasatBlocks.push({ type: 'list', items })
  }

  const videoBlocks = blocksBySection('video')

  const specModels = sortByOrder(api?.spec_models ?? [])
    .map((model) => ({
      name: normalizeText(model.title ?? ''),
      specs: sortByOrder(model.spec_items ?? [])
        .map((item) => ({
          label: normalizeText(item.name ?? ''),
          value: normalizeText([item.value ?? '', item.unit ?? ''].filter(Boolean).join(' '))
        }))
        .filter((spec) => spec.label || spec.value)
    }))
    .filter((model) => model.name || model.specs.length)

  const faqItems = sortByOrder(api?.faq_items ?? [])
    .map((item) => {
      const rawAnswer = (item.answer_html ?? '').trim()
      const answerHtml = rawAnswer ? decodeHtmlEntities(rawAnswer) : ''
      return {
        question: normalizeText(item.question ?? ''),
        answer: stripHtml(answerHtml),
        answerHtml: answerHtml || undefined
      }
    })
    .filter((item) => item.question && item.answer)

  const specTable = normalizeSpecTable(api?.spec_table ?? undefined)
  const relatedProducts = normalizeRelatedProducts(api?.related_products)

  const title = normalizeText(api?.title ?? api?.hero_title ?? api?.meta_title ?? fallbackSlug)
  const slug = normalizeText(api?.slug ?? fallbackSlug)
  const highlight = normalizeText(api?.highlight ?? api?.highlights ?? '')
  const rawDescription = typeof api?.description === 'string' ? api.description.trim() : ''
  const rawSummaryHtml = typeof api?.summary_html === 'string' ? api.summary_html.trim() : ''
  const summaryHtml = rawDescription && looksLikeHtml(rawDescription)
    ? rawDescription
    : rawSummaryHtml && looksLikeHtml(rawSummaryHtml)
      ? rawSummaryHtml
      : ''
  const description = summaryHtml ? stripHtml(summaryHtml) : normalizeText(rawDescription || rawSummaryHtml)
  const rawFullDescription = resolveFullDescription(api ?? {})
  const fullDescriptionHtml = rawFullDescription && looksLikeHtml(rawFullDescription)
    ? decodeHtmlEntities(rawFullDescription)
    : ''
  const fullDescription = fullDescriptionHtml ? '' : normalizeText(rawFullDescription)
  const price = api?.price !== undefined ? String(api.price) : ''
  const category = normalizeText(api?.category ?? '')
  const categoryHref = normalizeText(api?.categoryHref ?? '')

  const heroTitle = normalizeText(api?.hero_title ?? title ?? slug)
  const heroTagline = normalizeText(api?.hero_tagline ?? '')
  const heroEnglish = normalizeText(api?.hero_english ?? '')
  const heroVideo = coerceMediaUrl(api?.hero_video_url ?? api?.demo_video_url).url
  const videoItems = normalizeVideoItems(api?.videos, heroTitle || title || slug)
  if (heroVideo && !videoItems.some((item) => item.url === heroVideo)) {
    videoItems.unshift({ url: heroVideo, title: heroTitle || title || slug })
  }

  const specDownloadHref = normalizeText(api?.spec_download_href ?? api?.datasheet_url ?? '')
  const heroCatalogHref = normalizeText(api?.hero_catalog_href ?? api?.brochure_url ?? '')
  const heroCatalogLabel = normalizeText(api?.hero_catalog_label ?? '')
  const imageGalleryUnique = [...imageGallery]

  if (heroImage && !imageGalleryUnique.includes(heroImage)) {
    imageGalleryUnique.unshift(heroImage)
  }

  if (image && !imageGalleryUnique.includes(image)) {
    imageGalleryUnique.unshift(image)
  }

  return {
    slug,
    title,
    image: image || undefined,
    imageGallery: imageGalleryUnique.length ? imageGalleryUnique : undefined,
    price: price || undefined,
    description: description || undefined,
    fullDescriptionHtml: fullDescriptionHtml || undefined,
    fullDescription: fullDescription || undefined,
    highlight: highlight || undefined,
    highlightHtml: api?.highlight_html || undefined,
    summaryHtml: summaryHtml || undefined,
    category: category || undefined,
    categoryHref: categoryHref || undefined,
    cartHref: normalizeText(api?.cart_href ?? '') || undefined,
    heroImage: heroImage || undefined,
    heroAlt: heroAlt || undefined,
    heroEnglish: heroEnglish || undefined,
    heroTitle: heroTitle || undefined,
    heroTagline: heroTagline || undefined,
    heroVideo: heroVideo || undefined,
    heroCatalogHref: heroCatalogHref || undefined,
    heroCatalogLabel: heroCatalogLabel || undefined,
    navItems: navItems.length ? navItems : undefined,
    moarefiBlocks: moarefiBlocks.length ? moarefiBlocks : undefined,
    moshakhasatBlocks: moshakhasatBlocks.length ? moshakhasatBlocks : undefined,
    videoBlocks: videoBlocks.length ? videoBlocks : undefined,
    specModels: specModels.length ? specModels : undefined,
    specTable,
    specDownloadHref: specDownloadHref || undefined,
    videoGallery: videoGallery.length ? videoGallery : undefined,
    videoItems: videoItems.length ? videoItems : undefined,
    faqItems: faqItems.length ? faqItems : undefined,
    relatedProducts: relatedProducts.length ? relatedProducts : undefined,
    href: ''
  }
}

const route = useRoute()
const routeSlug = computed(() => {
  const param = route.params.slug
  return Array.isArray(param) ? param[0] ?? '' : String(param ?? '')
})

const { data: apiData, pending, error } = await useFetch<ApiProductDetail>(() => `/api/products/${encodeURIComponent(routeSlug.value)}/`, {
  key: () => `product:${routeSlug.value}`,
  watch: [routeSlug],
  default: () => ({
    slug: routeSlug.value,
    title: routeSlug.value
  })
})

const data = computed<ProductDetail>(() => mapApiToProduct(apiData.value, routeSlug.value))
const slug = computed(() => data.value?.slug || routeSlug.value)

const { data: rootCategories } = await useFetch<RootCategory[]>('/api/products/root-categories', {
  default: () => []
})

const categorySlug = computed(() => extractCategorySlug(data.value?.categoryHref))

const { data: categoryDetail } = await useAsyncData<CategoryDetail | null>(async () => {
  const slugValue = categorySlug.value
  if (!slugValue) return null
  try {
    return await $fetch<CategoryDetail>(`/api/products/categories/${encodeURIComponent(slugValue)}`)
  } catch {
    return null
  }
}, {
  watch: [categorySlug],
  default: () => null
})

const rootCategory = computed(() => {
  const slugValue = categorySlug.value
  if (!slugValue) return null
  return rootCategories.value.find((root) =>
    root.categories?.some((item) => item.slug === slugValue)
  ) ?? null
})

const rootCategoryLabel = computed(() => rootCategory.value?.name || '')
const rootCategoryHref = computed(() =>
  rootCategory.value?.slug ? localePath(`/categories?root_category=${encodeURIComponent(rootCategory.value.slug)}`) : ''
)
const breadcrumbCategoryLabel = computed(() =>
  categoryDetail.value?.title || data.value?.category || ''
)
const breadcrumbCategoryHref = computed(() =>
  categoryDetail.value?.slug || categorySlug.value
    ? localePath(`/categories/${encodeURIComponent(categoryDetail.value?.slug || categorySlug.value)}`)
    : data.value?.categoryHref || ''
)
const breadcrumbCategoryIsInternal = computed(() => breadcrumbCategoryHref.value.startsWith('/categories'))

const heroTitle = computed(() => data.value?.heroTitle || data.value?.title || data.value?.slug)
const descriptionHtml = computed(() => data.value?.summaryHtml?.trim() || '')
const fullDescriptionHtml = computed(() => data.value?.fullDescriptionHtml?.trim() || '')
const fullDescriptionText = computed(() => data.value?.fullDescription || '')
const relatedProducts = computed(() => data.value?.relatedProducts ?? [])
const tableTextAlign = computed(() => (isRtl.value ? 'text-right' : 'text-left'))
const phoneDisplay = computed(() => t('shared.phoneDisplay'))
const callHref = computed(() => toTelLink(phoneDisplay.value))
const contactHref = computed(() => localePath('/contact'))
const productImages = computed(() => {
  const images = data.value?.imageGallery ?? []
  const merged = [data.value?.heroImage, data.value?.image, ...images].filter(Boolean) as string[]
  return Array.from(new Set(merged))
})
const activeImageIndex = ref(0)
const activeImage = computed(() => productImages.value[activeImageIndex.value] ?? productImages.value[0] ?? '')

const relatedProductHref = (slugValue: string) =>
  localePath(`/products/${encodeURIComponent(slugValue)}`)

watch(productImages, (images) => {
  if (!images.length) {
    activeImageIndex.value = 0
    return
  }
  if (activeImageIndex.value >= images.length) {
    activeImageIndex.value = 0
  }
}, { immediate: true })

const fallbackNav = computed<NavItem[]>(() => [
  { id: 'moarefi', label: t('productDetail.fallbackNav.intro') },
  { id: 'moshakhasat', label: t('productDetail.fallbackNav.specs') },
  { id: 'video', label: t('productDetail.fallbackNav.video') },
  { id: 'faq', label: t('productDetail.fallbackNav.faq') }
])

const introHasContent = computed(() =>
  Boolean(data.value?.moarefiBlocks?.length || fullDescriptionHtml.value || fullDescriptionText.value)
)

const navItems = computed(() => {
  const apiItems = data.value?.navItems?.length ? data.value.navItems : null
  const items = apiItems ?? fallbackNav.value
  const filtered = items.filter((item) => item.id !== 'price')
  if (apiItems) return filtered

  const available = new Set<string>()
  if (introHasContent.value) available.add('moarefi')
  if (data.value?.moshakhasatBlocks?.length || data.value?.specModels?.length || data.value?.specTable?.rows?.length) {
    available.add('moshakhasat')
  }
  if (
    data.value?.videoBlocks?.length ||
    data.value?.videoGallery?.length ||
    data.value?.heroVideo ||
    data.value?.videoItems?.length
  ) {
    available.add('video')
  }
  if (data.value?.faqItems?.length) available.add('faq')

  return filtered.filter((item) => available.has(item.id))
})

const videoItems = computed<VideoItem[]>(() => {
  const items: VideoItem[] = []
  const seen = new Set<string>()
  const fallbackTitle = heroTitle.value || ''
  const addItem = (url: string, title?: string) => {
    if (!url || seen.has(url)) return
    seen.add(url)
    items.push({ url, title: title || fallbackTitle })
  }

  for (const item of data.value?.videoItems ?? []) {
    addItem(item.url, item.title)
  }
  for (const block of data.value?.videoBlocks ?? []) {
    if (block.type === 'video') addItem(block.src, fallbackTitle)
  }
  for (const src of data.value?.videoGallery ?? []) {
    addItem(src, fallbackTitle)
  }
  if (data.value?.heroVideo) addItem(data.value.heroVideo, fallbackTitle)

  return items
})

const heroVideoSrc = computed(() => videoItems.value[0]?.url || data.value?.heroVideo || '')
const videoPoster = computed(() => data.value?.heroImage || data.value?.image || '')

const videoTextBlocks = computed(() =>
  (data.value?.videoBlocks ?? []).filter((block) => block.type !== 'video' && block.type !== 'image')
)

const videoSlides = computed<VideoSlide[]>(() => {
  const slides: VideoSlide[] = []
  const fallbackPoster = videoPoster.value || undefined

  for (const item of videoItems.value) {
    slides.push({
      type: 'video',
      src: item.url,
      label: item.title || heroTitle.value,
      poster: fallbackPoster
    })
  }

  for (const block of data.value?.videoBlocks ?? []) {
    if (block.type !== 'image') continue
    slides.push({
      type: 'image',
      src: block.src,
      label: block.alt || heroTitle.value
    })
  }

  if (!slides.length && heroVideoSrc.value) {
    slides.push({
      type: 'video',
      src: heroVideoSrc.value,
      label: heroTitle.value,
      poster: fallbackPoster
    })
  }

  return slides
})

const videoModalSrc = ref<string | null>(null)

function openVideoModal(src: string) {
  videoModalSrc.value = src
}

function closeVideoModal() {
  videoModalSrc.value = null
}

const moarefiRenderBlocks = computed<RenderBlock[]>(() => {
  const blocks = data.value?.moarefiBlocks ?? []
  const result: RenderBlock[] = []

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index]

    if (block.type === 'heading' && isCertificatesHeading(block.text)) {
      const title = block.text
      let cursor = index + 1
      let description: string | undefined

      if (blocks[cursor]?.type === 'paragraph') {
        description = blocks[cursor].text
        cursor += 1
      }

      const items: CertificatesBlock['items'] = []

      while (cursor < blocks.length) {
        const nextBlock = blocks[cursor]

        if (nextBlock.type === 'heading') break

        if (nextBlock.type === 'image') {
          let itemTitle = nextBlock.alt ?? ''

          if (blocks[cursor + 1]?.type === 'paragraph') {
            itemTitle = blocks[cursor + 1].text
            cursor += 1
          }

          items.push({ title: itemTitle, image: nextBlock.src })
        }

        cursor += 1
      }

      if (items.length) {
        result.push({ type: 'certificates', title, description, items })
        index = cursor - 1
        continue
      }
    }

    result.push(block)
  }

  return result
})

function sectionLabel(id: string, fallback: string) {
  return navItems.value.find((item) => item.id === id)?.label ?? fallback
}

useSeoMeta({
  title: computed(() => data.value?.title ? `${data.value.title} | MBICO` : t('seo.productDetail.titleFallback')),
  description: computed(() => data.value?.description ?? data.value?.heroTagline ?? t('seo.productDetail.descriptionFallback'))
})
</script>

<template>
  <div class="bg-white">
    <section class="relative isolate min-h-[60vh] overflow-hidden bg-zinc-900 sm:min-h-[70vh] lg:min-h-[78vh]">
      <video
        v-if="heroVideoSrc"
        class="absolute inset-0 h-full w-full object-cover"
        autoplay
        muted
        loop
        playsinline
        preload="metadata"
        :poster="data?.heroImage"
      >
        <source :src="heroVideoSrc" type="video/mp4">
      </video>
      <NuxtImg
        v-else-if="data?.heroImage"
        :src="data.heroImage"
        :alt="data.heroAlt || data.title"
        class="absolute inset-0 h-full w-full object-cover"
        sizes="100vw"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
      <div class="relative mx-auto max-w-[1220px] px-4 py-16 sm:py-24">
        <div class="max-w-xl text-white">
          <p v-if="data?.heroEnglish" class="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
            {{ data.heroEnglish }}
          </p>
          <h1 class="mt-4 text-3xl font-black sm:text-4xl lg:text-5xl">
            {{ heroTitle }}
          </h1>
          <p v-if="data?.heroTagline" class="mt-4 text-base font-semibold text-white/90 sm:text-lg">
            {{ data.heroTagline }}
          </p>
          <div v-if="data?.heroCatalogHref" class="mt-6 flex flex-wrap gap-3">
            <a
              :href="data.heroCatalogHref"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center justify-center rounded-full border border-white/70 px-6 py-2 text-sm font-semibold text-white transition hover:border-white"
            >
              {{ data.heroCatalogLabel || t('productDetail.catalogLabel') }}
            </a>
          </div>
        </div>
      </div>
      <div class="absolute inset-x-0 bottom-0">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none" class="h-16 w-full">
          <path
            d="M500 47.0297C184.4 47.0297 -26 100 -26 100H1026C1026 100 815.6 47.0297 500 47.0297ZM1026 -5.94059H-26V-7H1026V-5.94059Z"
            fill="#f89014"
          />
        </svg>
      </div>
    </section>

    <section v-if="navItems.length" class="bg-zinc-900">
      <div class="mx-auto max-w-[1220px] px-4 py-3">
        <div class="flex flex-wrap items-center justify-center gap-3">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            class="rounded-full border border-amber-500/60 px-4 py-1.5 text-xs font-semibold text-white/90 transition hover:border-amber-400 hover:text-white"
          >
            {{ item.label }}
          </a>
        </div>
      </div>
      <div class="h-1 bg-amber-500" />
    </section>

    <section class="relative bg-white">
      <div class="relative mx-auto max-w-[1220px] px-4 pb-12 pt-12">
        <div class="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
          <NuxtLink class="transition hover:text-amber-600" :to="localePath('/')">
            {{ t('header.links.home') }}
          </NuxtLink>
          <span class="text-zinc-300">/</span>
          <NuxtLink class="transition hover:text-amber-600" :to="localePath('/products')">
            {{ t('header.links.products') }}
          </NuxtLink>
          <template v-if="breadcrumbCategoryLabel">
            <span class="text-zinc-300">/</span>
            <component
              :is="breadcrumbCategoryIsInternal ? 'NuxtLink' : 'a'"
              :to="breadcrumbCategoryIsInternal ? breadcrumbCategoryHref : undefined"
              :href="breadcrumbCategoryIsInternal ? undefined : breadcrumbCategoryHref"
              class="transition hover:text-amber-600"
            >
              {{ breadcrumbCategoryLabel }}
            </component>
          </template>
        </div>

        <div class="mt-8 grid items-start gap-10 lg:grid-cols-12">
          <div class="order-2 flex justify-center lg:order-1 lg:col-span-6 lg:justify-start">
            <div v-if="productImages.length" class="w-full max-w-xl">
              <div class="overflow-hidden rounded-[28px] shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
                <NuxtImg
                  v-if="activeImage"
                  :src="activeImage"
                  :alt="data?.heroAlt || data?.title || heroTitle"
                  class="w-full object-contain mix-blend-multiply"
                  sizes="(max-width: 768px) 100vw, 520px"
                  loading="eager"
                />
              </div>

              <div v-if="productImages.length > 1" class="mt-4 flex gap-3 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
                <button
                  v-for="(image, index) in productImages"
                  :key="`${image}-${index}`"
                  type="button"
                  class="group relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl transition"
                  :class="index === activeImageIndex ? 'ring-2 ring-amber-500' : 'ring-1 ring-zinc-200 hover:ring-amber-300'"
                  :aria-pressed="index === activeImageIndex"
                  :aria-label="`${heroTitle} ${index + 1}`"
                  :title="`${heroTitle} ${index + 1}`"
                  @click="activeImageIndex = index"
                >
                  <NuxtImg
                    :src="image"
                    :alt="data?.heroAlt || data?.title || heroTitle"
                    class="h-full w-full object-contain mix-blend-multiply"
                    sizes="80px"
                    :loading="index < 4 ? 'eager' : 'lazy'"
                  />
                </button>
              </div>
            </div>
          </div>

          <div class="order-1 lg:order-2 lg:col-span-6">
            <h1 v-if="!data?.heroImage" class="text-2xl font-black text-zinc-900 sm:text-3xl">
              {{ heroTitle }}
            </h1>

            <div v-if="descriptionHtml" class="mt-4">
              <div class="ql-container ql-snow" :dir="isRtl ? 'rtl' : 'ltr'">
                <div class="ql-editor" v-html="descriptionHtml" />
              </div>
            </div>
            <p v-else-if="data?.description" class="mt-4 text-justify text-sm leading-8 text-zinc-900/80">
              {{ data.description }}
            </p>
            <p v-else class="mt-4 text-justify text-sm leading-8 text-zinc-500">
              {{ t('productDetail.noDetails') }}
            </p>

            <div v-if="data?.highlight || data?.highlightHtml" class="mt-8 rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
              <div
                v-if="data?.highlightHtml"
                class="text-justify text-sm font-semibold leading-7 text-amber-700"
                v-html="data.highlightHtml"
              />
              <p v-else-if="data?.highlight" class="text-justify text-sm font-semibold leading-7 text-amber-700">
                {{ data.highlight }}
              </p>
            </div>

            <div class="mt-8 rounded-[28px] border border-amber-200 bg-amber-50 p-6 shadow-[0_20px_50px_rgba(248,144,20,0.15)]">
              <p class="text-sm font-semibold text-zinc-900">
                {{ t('productDetail.callToBuy.title') }}
              </p>
              <p class="mt-2 text-xs leading-6 text-zinc-600">
                {{ t('productDetail.callToBuy.description') }}
              </p>
              <div class="mt-4 flex flex-wrap items-center gap-3">
                <a
                  v-if="callHref"
                  :href="callHref"
                  class="inline-flex items-center justify-center rounded-full bg-amber-500 px-5 py-2 text-xs font-semibold text-white shadow hover:bg-amber-600"
                >
                  {{ t('productDetail.callToBuy.primary') }} {{ phoneDisplay }}
                </a>
                <NuxtLink
                  :to="contactHref"
                  class="inline-flex items-center justify-center rounded-full border border-amber-500 px-5 py-2 text-xs font-semibold text-amber-700 transition hover:bg-amber-100"
                >
                  {{ t('productDetail.callToBuy.secondary') }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <div v-if="pending" class="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500">
          {{ t('productDetail.loading') }}
        </div>

        <div v-if="error" class="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          {{ t('productDetail.error') }}
        </div>
      </div>
    </section>

    <section v-if="introHasContent" id="moarefi" class="scroll-mt-24 py-12">
      <div class="mx-auto max-w-[1220px] px-4">
        <div class="flex items-center gap-4">
          <div class="h-[2px] flex-1 bg-amber-500"></div>
          <h2 class="text-lg font-black text-amber-600">
            {{ sectionLabel('moarefi', t('productDetail.fallbackNav.intro')) }}
          </h2>
          <div class="h-[2px] flex-1 bg-amber-500"></div>
        </div>

        <div class="mt-8 space-y-6">
          <template v-for="(block, index) in moarefiRenderBlocks" :key="`moarefi-${index}`">
            <h3 v-if="block.type === 'heading'" class="text-lg font-black text-amber-600">
              {{ block.text }}
            </h3>
            <p v-else-if="block.type === 'paragraph'" class="text-sm leading-8 text-zinc-800">
              {{ block.text }}
            </p>
            <div
              v-else-if="block.type === 'certificates'"
              class="relative w-full overflow-hidden rounded-lg bg-[linear-gradient(180deg,#8b90a0_0%,#7a8191_55%,#666d7f_100%)] py-12 sm:py-16"
            >
              <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_60%)]" />
              <div class="relative mx-auto max-w-[1220px] px-4 text-center text-white">
                <h3 class="text-2xl font-black sm:text-3xl lg:text-4xl">
                  {{ block.title }}
                </h3>
                <div class="mx-auto mt-4 h-1 w-16 rounded-full bg-amber-500" />
                <p v-if="block.description" class="mx-auto mt-5 max-w-4xl text-sm leading-8 text-white/80">
                  {{ block.description }}
                </p>
                <div class="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
                  <div
                    v-for="item in block.items"
                    :key="item.image"
                    class="flex flex-col items-center justify-start text-center"
                  >
                    <div class="flex h-16 w-20 items-center justify-center sm:h-20 sm:w-24">
                      <NuxtImg
                        :src="item.image"
                        :alt="item.title"
                        class="h-full w-full object-contain opacity-90 grayscale brightness-0 invert"
                        sizes="(max-width: 640px) 80px, 96px"
                      />
                    </div>
                    <p class="mt-3 text-xs font-semibold text-white/90 sm:text-sm">
                      {{ item.title }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <ul v-else-if="block.type === 'list'" class="list-disc space-y-2 pr-5 text-sm text-zinc-800">
              <li v-for="(item, itemIndex) in block.items" :key="`moarefi-list-${itemIndex}`">
                {{ item }}
              </li>
            </ul>
            <div v-else-if="block.type === 'image'" class="mx-auto w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-[0_18px_50px_rgba(0,0,0,0.12)]">
              <NuxtImg
                :src="block.src"
                :alt="block.alt || heroTitle"
                class="h-auto w-full object-contain"
                sizes="(max-width: 768px) 100vw, 900px"
              />
            </div>
            <div v-else-if="block.type === 'video'" class="mx-auto w-full max-w-5xl overflow-hidden rounded-3xl bg-black shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
              <div class="aspect-3/2 w-full">
                <video class="h-full w-full object-cover" autoplay muted loop playsinline>
                  <source :src="block.src" type="video/mp4">
                </video>
              </div>
            </div>
          </template>
          <div v-if="fullDescriptionHtml || fullDescriptionText" class="space-y-3">
            <p class="text-sm font-semibold text-zinc-900">
              {{ t('productDetail.fullDescription') }}
            </p>
            <div v-if="fullDescriptionHtml">
              <div class="ql-container ql-snow" :dir="isRtl ? 'rtl' : 'ltr'">
                <div class="ql-editor" v-html="fullDescriptionHtml" />
              </div>
            </div>
            <p v-else class="text-sm leading-8 text-zinc-700">
              {{ fullDescriptionText }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section v-if="data?.moshakhasatBlocks?.length || data?.specModels?.length || data?.specTable?.rows?.length" id="moshakhasat" class="scroll-mt-24 py-12 bg-zinc-50/70">
      <div class="mx-auto max-w-[1220px] px-4">
        <div class="flex items-center gap-4">
          <div class="h-[2px] flex-1 bg-amber-500"></div>
          <h2 class="text-lg font-black text-amber-600">
            {{ sectionLabel('moshakhasat', t('productDetail.fallbackNav.specs')) }}
          </h2>
          <div class="h-[2px] flex-1 bg-amber-500"></div>
        </div>

        <div v-if="data?.specTable?.rows?.length" class="mt-8">
          <h3 class="text-base font-bold text-zinc-900">
            {{ t('productDetail.specTable.title') }}
          </h3>
          <div class="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <div class="overflow-x-auto">
              <table class="min-w-full text-xs">
                <thead class="bg-zinc-900 text-white">
                  <tr>
                    <th class="px-4 py-3 font-semibold" :class="tableTextAlign">
                      {{ t('productDetail.specTable.rowLabel') }}
                    </th>
                    <th
                      v-for="column in data.specTable.columns"
                      :key="column"
                      class="px-4 py-3 font-semibold"
                      :class="tableTextAlign"
                    >
                      {{ column }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="row in data.specTable.rows"
                    :key="row.label"
                    class="border-t border-zinc-200/80"
                  >
                    <td class="whitespace-nowrap px-4 py-3 font-semibold text-zinc-900" :class="tableTextAlign">
                      {{ row.label }}
                    </td>
                    <td
                      v-for="column in data.specTable.columns"
                      :key="`${row.label}-${column}`"
                      class="px-4 py-3 text-zinc-600"
                      :class="tableTextAlign"
                    >
                      {{ row.values[column] || '-' }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div v-if="data?.moshakhasatBlocks?.length" class="mt-8 space-y-6">
          <template v-for="(block, index) in data.moshakhasatBlocks" :key="`moshakhasat-${index}`">
            <h3 v-if="block.type === 'heading'" class="text-lg font-black text-amber-600">
              {{ block.text }}
            </h3>
            <p v-else-if="block.type === 'paragraph'" class="text-sm leading-8 text-zinc-800">
              {{ block.text }}
            </p>
            <ul v-else-if="block.type === 'list'" class="list-disc space-y-2 pr-5 text-sm text-zinc-800">
              <li v-for="(item, itemIndex) in block.items" :key="`moshakhasat-list-${itemIndex}`">
                {{ item }}
              </li>
            </ul>
            <div v-else-if="block.type === 'image'" class="mx-auto w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-[0_18px_50px_rgba(0,0,0,0.12)]">
              <NuxtImg
                :src="block.src"
                :alt="block.alt || heroTitle"
                class="h-auto w-full object-contain"
                sizes="(max-width: 768px) 100vw, 900px"
              />
            </div>
          </template>
        </div>

        <div v-if="data?.specDownloadHref" class="mt-8 flex justify-center">
          <a
            :href="data.specDownloadHref"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-amber-600"
          >
            {{ t('productDetail.downloadCatalog') }}
          </a>
        </div>

        <div v-if="data?.specModels?.length" class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div
            v-for="model in data.specModels"
            :key="model.name"
            class="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow"
          >
            <div class="bg-zinc-700 px-4 py-3 text-center text-sm font-semibold text-white">
              {{ model.name }}
            </div>
            <div class="divide-y divide-zinc-200/80">
              <div
                v-for="(spec, specIndex) in model.specs"
                :key="`${model.name}-${specIndex}`"
                class="flex items-start justify-between gap-4 px-4 py-3 text-xs"
              >
                <span v-if="spec.label" class="text-zinc-500">
                  {{ spec.label }}
                </span>
                <span class="font-semibold text-zinc-900">
                  {{ spec.value }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="videoSlides.length || videoTextBlocks.length" id="video" class="scroll-mt-24 py-12">
      <div class="mx-auto max-w-[1220px] px-4">
        <div class="flex items-center gap-4">
          <div class="h-[2px] flex-1 bg-amber-500"></div>
          <h2 class="text-lg font-black text-amber-600">
            {{ sectionLabel('video', t('productDetail.fallbackNav.video')) }}
          </h2>
          <div class="h-[2px] flex-1 bg-amber-500"></div>
        </div>

        <div v-if="videoTextBlocks.length" class="mt-8 space-y-6">
          <template v-for="(block, index) in videoTextBlocks" :key="`video-${index}`">
            <h3 v-if="block.type === 'heading'" class="text-lg font-black text-amber-600">
              {{ block.text }}
            </h3>
            <p v-else-if="block.type === 'paragraph'" class="text-sm leading-8 text-zinc-800">
              {{ block.text }}
            </p>
            <ul v-else-if="block.type === 'list'" class="list-disc space-y-2 pr-5 text-sm text-zinc-800">
              <li v-for="(item, itemIndex) in block.items" :key="`video-list-${itemIndex}`">
                {{ item }}
              </li>
            </ul>
          </template>
        </div>

        <div v-if="videoSlides.length" class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <button
            v-for="slide in videoSlides"
            :key="`${slide.type}-${slide.src}`"
            type="button"
            class="group overflow-hidden rounded-[26px] border border-zinc-200 bg-white shadow-[0_16px_36px_rgba(0,0,0,0.12)] transition hover:-translate-y-1"
            @click="slide.type === 'video' ? openVideoModal(slide.src) : null"
          >
            <div class="relative aspect-[16/9] w-full bg-black">
              <NuxtImg
                v-if="slide.type === 'image'"
                :src="slide.src"
                :alt="slide.label || heroTitle"
                class="h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, 480px"
              />
              <video
                v-else
                class="h-full w-full object-cover"
                playsinline
                preload="metadata"
                :poster="slide.poster || videoPoster"
              >
                <source :src="slide.src" type="video/mp4">
              </video>
              <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div class="absolute inset-0 flex items-center justify-center">
                <span
                  v-if="slide.type === 'video'"
                  class="inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/80 bg-white/10 text-white backdrop-blur transition group-hover:bg-white/20"
                >
                  <svg viewBox="0 0 24 24" class="h-7 w-7" fill="currentColor">
                    <path d="M8 5.2v13.6c0 .7.8 1.1 1.4.7l10-6.8a.8.8 0 000-1.4l-10-6.8c-.6-.4-1.4 0-1.4.7z" />
                  </svg>
                </span>
              </div>
            </div>
            <div class="px-4 py-4 text-right">
              <p class="text-sm font-semibold text-zinc-900">
                {{ slide.label || heroTitle }}
              </p>
            </div>
          </button>
        </div>
      </div>
    </section>

    <section v-if="relatedProducts.length" class="py-12 bg-white">
      <div class="mx-auto max-w-[1220px] px-4">
        <div class="flex items-center gap-4">
          <div class="h-[2px] flex-1 bg-amber-500"></div>
          <h2 class="text-lg font-black text-amber-600">
            {{ t('productDetail.related.title') }}
          </h2>
          <div class="h-[2px] flex-1 bg-amber-500"></div>
        </div>

        <div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <article
            v-for="item in relatedProducts"
            :key="item.slug"
            class="group flex h-full flex-col overflow-hidden rounded-[26px] bg-[linear-gradient(180deg,#7a7a7a_0%,#1f1f1f_100%)] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
          >
            <NuxtLink
              :to="relatedProductHref(item.slug)"
              class="flex aspect-square items-center justify-center overflow-hidden rounded-[20px] bg-white"
            >
              <NuxtImg
                v-if="item.image"
                :src="item.image"
                :alt="item.title"
                class="h-full w-full object-contain transition duration-500 group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 50vw, 240px"
              />
              <div v-else class="text-xs text-zinc-400">
                {{ t('categories.list.noImage') }}
              </div>
            </NuxtLink>

            <div class="mt-4 flex flex-1 flex-col items-center text-center text-white">
              <NuxtLink
                :to="relatedProductHref(item.slug)"
                class="text-sm font-semibold leading-7 text-white/90 hover:text-white"
              >
                {{ item.title }}
              </NuxtLink>
              <p v-if="item.category" class="mt-2 text-xs text-white/70">
                {{ item.category }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section v-if="data?.faqItems?.length" id="faq" class="scroll-mt-24 py-12 bg-zinc-50/70">
      <div class="mx-auto max-w-[1220px] px-4">
        <div class="flex items-center gap-4">
          <div class="h-[2px] flex-1 bg-amber-500"></div>
          <h2 class="text-lg font-black text-amber-600">
            {{ sectionLabel('faq', t('productDetail.fallbackNav.faq')) }}
          </h2>
          <div class="h-[2px] flex-1 bg-amber-500"></div>
        </div>

        <div class="mt-8 grid gap-4 md:grid-cols-2">
          <details
            v-for="item in data.faqItems"
            :key="item.question"
            class="group rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-sm"
          >
            <summary class="cursor-pointer text-sm font-semibold text-zinc-900">
              {{ item.question }}
            </summary>
            <div
              v-if="item.answerHtml"
              class="mt-3 text-sm leading-7 text-zinc-600"
              v-html="item.answerHtml"
            />
            <p v-else class="mt-3 text-sm leading-7 text-zinc-600">
              {{ item.answer }}
            </p>
          </details>
        </div>
      </div>
    </section>

    <Teleport to="body">
      <div v-if="videoModalSrc" class="fixed inset-0 z-[70]">
        <button class="absolute inset-0 bg-black/70" :aria-label="t('productDetail.video.close')" @click="closeVideoModal" />
        <div class="absolute inset-0 flex items-center justify-center p-4">
          <div class="w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10">
            <div class="flex items-center justify-between px-4 py-3 text-white/90">
              <span class="text-sm">{{ heroTitle }}</span>
              <button class="h-9 w-9 rounded-xl bg-white/10 hover:bg-white/15" :aria-label="t('productDetail.video.close')" @click="closeVideoModal">
                x
              </button>
            </div>
            <video :src="videoModalSrc" controls autoplay class="w-full" />
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
:deep(.ql-container) {
  border: 0;
  font-family: inherit;
  background: transparent;
}

:deep(.ql-editor) {
  padding: 0;
  font-size: 0.875rem;
  line-height: 2;
  color: rgba(24, 24, 27, 0.8);
  text-align: justify;
  direction: inherit;
}

:deep(.ql-editor > *:first-child) {
  margin-top: 0;
}

:deep(.ql-editor p) {
  margin-top: 0.75rem;
}

:deep(.ql-editor h2) {
  margin-top: 1.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: #18181b;
}

:deep(.ql-editor h3) {
  margin-top: 1.25rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: #27272a;
}

:deep(.ql-editor a) {
  color: #d97706;
  font-weight: 600;
}

:deep(.ql-editor ul),
:deep(.ql-editor ol) {
  margin-top: 0.75rem;
  padding-right: 1.25rem;
}

:deep(.ql-editor ul) {
  list-style: disc;
}

:deep(.ql-editor ol) {
  list-style: decimal;
}

:deep(.ql-editor li) {
  margin-top: 0.35rem;
}

:deep(.ql-editor blockquote) {
  margin-top: 1rem;
  border-right: 3px solid #f59e0b;
  padding-right: 0.75rem;
  color: #52525b;
}

:deep(.ql-editor img) {
  margin: 1.25rem auto;
  width: 100%;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

:deep(.ql-editor .ql-align-center) {
  text-align: center;
}

:deep(.ql-editor .ql-align-right) {
  text-align: right;
}

:deep(.ql-editor .ql-align-left) {
  text-align: left;
}

:deep(.ql-editor .ql-align-justify) {
  text-align: justify;
}

:deep(.ql-editor .ql-direction-rtl) {
  direction: rtl;
}
</style>
