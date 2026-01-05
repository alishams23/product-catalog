<script setup lang="ts">
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
  heroVideo?: string
  heroCatalogHref?: string
  heroCatalogLabel?: string
  navItems?: readonly NavItem[]
  moarefiBlocks?: readonly ContentBlock[]
  moshakhasatBlocks?: readonly ContentBlock[]
  videoBlocks?: readonly ContentBlock[]
  specModels?: readonly SpecModel[]
  specDownloadHref?: string
  videoGallery?: readonly string[]
  faqItems?: readonly FaqItem[]
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

type ApiMedia = {
  media_type?: string
  role?: string
  title?: string
  url?: string
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

type ApiFaqItem = {
  question?: string
  answer_html?: string
  sort_order?: number
}

type ApiProductDetail = {
  title?: string
  slug?: string
  short_description?: string
  description?: string
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

function safeDecodeURIComponent(value: string): string {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
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
    const maybe = value as { url?: unknown; src?: unknown; href?: unknown; alt_text?: unknown; alt?: unknown }
    const url = typeof maybe.url === 'string'
      ? maybe.url
      : typeof maybe.src === 'string'
        ? maybe.src
        : typeof maybe.href === 'string'
          ? maybe.href
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
  const url = coerceMediaUrl(item.url).url
  return Boolean(url) && !isVideoUrl(url)
}

function isVideoMedia(item: ApiMedia): boolean {
  if (item.media_type) return item.media_type === 'video'
  const url = coerceMediaUrl(item.url).url
  return Boolean(url) && isVideoUrl(url)
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

function mapLegacyApi(api: ApiProductDetail, fallbackSlug: string): ProductDetail {
  const moarefiBlocks = normalizeBlocks(api.moarefiBlocks)
  const moshakhasatBlocks = normalizeBlocks(api.moshakhasatBlocks)
  const videoBlocks = normalizeBlocks(api.videoBlocks)
  const videoGallery = (api.videoGallery ?? []).map((item) => coerceMediaUrl(item).url).filter(Boolean)

  const image = coerceMediaUrl(api.image).url
  const heroImage = coerceMediaUrl(api.heroImage).url
  const heroAlt = coerceMediaUrl(api.heroImage).alt || api.heroAlt
  const heroVideo = coerceMediaUrl(api.heroVideo).url

  return {
    slug: api.slug ?? fallbackSlug,
    title: api.title ?? api.heroTitle ?? fallbackSlug,
    image: image || undefined,
    price: api.price ? String(api.price) : undefined,
    description: api.description,
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
    specDownloadHref: api.specDownloadHref,
    videoGallery: videoGallery.length ? videoGallery : undefined,
    faqItems: api.faqItems,
    href: api.href ?? ''
  }
}

function mapApiToProduct(api: ApiProductDetail | null | undefined, fallbackSlug: string): ProductDetail {
  if (api?.faqItems || api?.moarefiBlocks || api?.moshakhasatBlocks || api?.videoBlocks) {
    return mapLegacyApi(api, fallbackSlug)
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

  const heroImage = coerceMediaUrl(heroMedia?.url).url
  const heroAlt = normalizeText(api?.hero_alt ?? heroMedia?.alt_text ?? heroMedia?.title ?? '')
  const image = coerceMediaUrl(primaryImage?.url ?? heroImage).url

  const demoVideo = coerceMediaUrl(api?.demo_video_url ?? api?.hero_video_url).url
  const videoGallery = sortByOrder(videoMedia)
    .map((item) => coerceMediaUrl(item.url).url)
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

  const title = normalizeText(api?.title ?? api?.hero_title ?? api?.meta_title ?? fallbackSlug)
  const slug = normalizeText(api?.slug ?? fallbackSlug)
  const highlight = normalizeText(api?.highlight ?? api?.highlights ?? '')
  const description = normalizeText(api?.description ?? api?.short_description ?? '')
  const price = api?.price !== undefined ? String(api.price) : ''
  const category = normalizeText(api?.category ?? '')
  const categoryHref = normalizeText(api?.categoryHref ?? '')

  const heroTitle = normalizeText(api?.hero_title ?? title ?? slug)
  const heroTagline = normalizeText(api?.hero_tagline ?? '')
  const heroEnglish = normalizeText(api?.hero_english ?? '')
  const heroVideo = coerceMediaUrl(api?.hero_video_url ?? api?.demo_video_url).url

  const specDownloadHref = normalizeText(api?.spec_download_href ?? api?.datasheet_url ?? '')
  const heroCatalogHref = normalizeText(api?.hero_catalog_href ?? api?.brochure_url ?? '')
  const heroCatalogLabel = normalizeText(api?.hero_catalog_label ?? '')

  return {
    slug,
    title,
    image: image || undefined,
    price: price || undefined,
    description: description || undefined,
    highlight: highlight || undefined,
    highlightHtml: api?.highlight_html || undefined,
    summaryHtml: api?.summary_html || undefined,
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
    specDownloadHref: specDownloadHref || undefined,
    videoGallery: videoGallery.length ? videoGallery : undefined,
    faqItems: faqItems.length ? faqItems : undefined,
    href: ''
  }
}

const route = useRoute()
const routeSlug = computed(() => {
  const param = route.params.slug
  return Array.isArray(param) ? param[0] ?? '' : String(param ?? '')
})

const { data: apiData, pending, error } = await useFetch<ApiProductDetail>(() => `/api/products/${encodeURIComponent(routeSlug.value)}/`, {
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
  rootCategory.value?.slug ? `/categories?root_category=${encodeURIComponent(rootCategory.value.slug)}` : ''
)
const breadcrumbCategoryLabel = computed(() =>
  categoryDetail.value?.title || data.value?.category || ''
)
const breadcrumbCategoryHref = computed(() =>
  categoryDetail.value?.slug || categorySlug.value
    ? `/categories/${encodeURIComponent(categoryDetail.value?.slug || categorySlug.value)}`
    : data.value?.categoryHref || ''
)
const breadcrumbCategoryIsInternal = computed(() => breadcrumbCategoryHref.value.startsWith('/categories'))

const heroTitle = computed(() => data.value?.heroTitle || data.value?.title || data.value?.slug)

const fallbackNav: NavItem[] = [
  { id: 'moarefi', label: 'معرفی محصول' },
  { id: 'moshakhasat', label: 'مشخصات فنی' },
  { id: 'video', label: 'ویدیو محصول' },
  { id: 'faq', label: 'سوالات متداول' }
]

const navItems = computed(() => {
  const items = data.value?.navItems?.length ? data.value.navItems : fallbackNav
  return items.filter((item) => item.id !== 'price')
})

const videoSources = computed(() => {
  const sources = new Set<string>()
  for (const block of data.value?.videoBlocks ?? []) {
    if (block.type === 'video') sources.add(block.src)
  }
  for (const src of data.value?.videoGallery ?? []) {
    sources.add(src)
  }
  return Array.from(sources)
})

const heroVideoSrc = computed(() => data.value?.heroVideo || videoSources.value[0] || '')
const videoPoster = computed(() => data.value?.heroImage || data.value?.image || '')

const videoTextBlocks = computed(() =>
  (data.value?.videoBlocks ?? []).filter((block) => block.type !== 'video' && block.type !== 'image')
)

const videoSlides = computed<VideoSlide[]>(() => {
  const slides: VideoSlide[] = []
  const blocks = data.value?.videoBlocks ?? []
  const gallery = data.value?.videoGallery ?? []
  let galleryIndex = 0
  const fallbackPoster = videoPoster.value || undefined

  for (const block of blocks) {
    if (block.type === 'video') {
      slides.push({
        type: 'video',
        src: block.src,
        label: heroTitle.value,
        poster: fallbackPoster
      })
      continue
    }

    if (block.type === 'image') {
      const label = block.alt || heroTitle.value
      if (gallery.length) {
        const videoSrc = gallery[galleryIndex]
        galleryIndex += 1
        if (videoSrc) {
          slides.push({
            type: 'video',
            src: videoSrc,
            label,
            poster: block.src
          })
        } else {
          slides.push({ type: 'image', src: block.src, label })
        }
      } else {
        slides.push({ type: 'image', src: block.src, label })
      }
    }
  }

  for (let i = galleryIndex; i < gallery.length; i += 1) {
    slides.push({
      type: 'video',
      src: gallery[i]!,
      label: heroTitle.value,
      poster: fallbackPoster
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

const videoScroller = ref<HTMLDivElement | null>(null)
const videoSlideRefs = ref<HTMLElement[]>([])
const videoActiveIndex = ref(0)
const videoModalSrc = ref<string | null>(null)
let videoRafId = 0

onBeforeUpdate(() => {
  videoSlideRefs.value = []
})

function setVideoSlideRef(el: Element | null) {
  if (el instanceof HTMLElement) videoSlideRefs.value.push(el)
}

function clampVideoIndex(index: number) {
  const max = Math.max(0, videoSlides.value.length - 1)
  return Math.min(Math.max(index, 0), max)
}

function scrollVideoToIndex(index: number, behavior: ScrollBehavior = 'smooth') {
  const container = videoScroller.value
  const clamped = clampVideoIndex(index)
  const el = videoSlideRefs.value[clamped]
  if (!container || !el) return

  videoActiveIndex.value = clamped

  if ('scrollIntoView' in el) {
    el.scrollIntoView({ behavior, block: 'nearest', inline: 'center' })
    return
  }

  const containerRect = container.getBoundingClientRect()
  const elRect = el.getBoundingClientRect()
  const deltaX = (elRect.left + elRect.width / 2) - (containerRect.left + containerRect.width / 2)
  if (Math.abs(deltaX) < 1) return

  container.scrollBy({ left: deltaX, behavior })
}

function scrollVideoPrev() {
  scrollVideoToIndex(videoActiveIndex.value - 1)
}

function scrollVideoNext() {
  scrollVideoToIndex(videoActiveIndex.value + 1)
}

function updateVideoActive() {
  const container = videoScroller.value
  if (!container || !videoSlideRefs.value.length) return

  const containerRect = container.getBoundingClientRect()
  const center = containerRect.left + containerRect.width / 2

  let bestIndex = 0
  let bestDist = Number.POSITIVE_INFINITY
  for (let i = 0; i < videoSlideRefs.value.length; i += 1) {
    const rect = videoSlideRefs.value[i]!.getBoundingClientRect()
    const slideCenter = rect.left + rect.width / 2
    const dist = Math.abs(slideCenter - center)
    if (dist < bestDist) {
      bestDist = dist
      bestIndex = i
    }
  }

  videoActiveIndex.value = bestIndex
}

function onVideoScroll() {
  if (videoRafId) cancelAnimationFrame(videoRafId)
  videoRafId = requestAnimationFrame(updateVideoActive)
}

function openVideoModal(src: string) {
  videoModalSrc.value = src
}

function closeVideoModal() {
  videoModalSrc.value = null
}

watch(videoSlides, async (slides) => {
  if (!import.meta.client) return
  if (!slides.length) {
    videoActiveIndex.value = 0
    return
  }
  videoActiveIndex.value = clampVideoIndex(videoActiveIndex.value)
  await nextTick()
  scrollVideoToIndex(videoActiveIndex.value, 'auto')
  updateVideoActive()
}, { immediate: true })

onMounted(() => {
  window.addEventListener('resize', updateVideoActive, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateVideoActive)
  if (videoRafId) cancelAnimationFrame(videoRafId)
})

const moarefiRenderBlocks = computed<RenderBlock[]>(() => {
  const blocks = data.value?.moarefiBlocks ?? []
  const result: RenderBlock[] = []

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index]

    if (block.type === 'heading' && block.text.includes('استاندارد') && block.text.includes('گواهینامه')) {
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
  title: computed(() => data.value?.title ? `${data.value.title} | MBICO` : 'محصولات | MBICO'),
  description: computed(() => data.value?.description ?? data.value?.heroTagline ?? 'جزئیات محصول صنایع پخت مشهد')
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
              {{ data.heroCatalogLabel || 'کاتالوگ' }}
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
        <nav class="text-xs uppercase text-zinc-500">
          <NuxtLink to="/" class="hover:text-zinc-700">
            خانه
          </NuxtLink>
          <span class="mx-2 text-zinc-400">/</span>
          <NuxtLink to="/products" class="hover:text-zinc-700">
            محصولات
          </NuxtLink>
          <template v-if="rootCategoryLabel">
            <span class="mx-2 text-zinc-400">/</span>
            <NuxtLink
              v-if="rootCategoryHref"
              :to="rootCategoryHref"
              class="text-zinc-700 hover:text-amber-600"
            >
              {{ rootCategoryLabel }}
            </NuxtLink>
            <span v-else class="text-zinc-700">{{ rootCategoryLabel }}</span>
          </template>
          <span class="mx-2 text-zinc-400">/</span>
          <NuxtLink
            v-if="breadcrumbCategoryLabel && breadcrumbCategoryHref && breadcrumbCategoryIsInternal"
            :to="breadcrumbCategoryHref"
            class="text-zinc-700 hover:text-amber-600"
          >
            {{ breadcrumbCategoryLabel }}
          </NuxtLink>
          <a
            v-else-if="breadcrumbCategoryLabel && breadcrumbCategoryHref"
            :href="breadcrumbCategoryHref"
            class="text-zinc-700 hover:text-amber-600"
            target="_blank"
            rel="noopener"
          >
            {{ breadcrumbCategoryLabel }}
          </a>
          <span v-else class="text-zinc-700">دسته بندی محصول</span>
        </nav>

        <div class="mt-8 grid gap-10 lg:grid-cols-12">
          <div class="order-2 flex justify-center lg:order-1 lg:col-span-6">
            <div v-if="data?.image" class="w-full max-w-xl">
              <div class="rounded-[28px] bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.12)]">
                <NuxtImg
                  :src="data.image"
                  :alt="data.title"
                  class="w-full object-contain"
                  sizes="(max-width: 768px) 100vw, 520px"
                />
              </div>
              <div class="mt-4 flex justify-center gap-2">
                <span class="h-2.5 w-2.5 rounded-sm border border-zinc-300 bg-white" />
                <span class="h-2.5 w-2.5 rounded-sm bg-zinc-900" />
                <span class="h-2.5 w-2.5 rounded-sm border border-zinc-300 bg-white" />
              </div>
            </div>
          </div>

          <div class="order-1 lg:order-2 lg:col-span-6">
            <h1 v-if="!data?.heroImage" class="text-2xl font-black text-zinc-900 sm:text-3xl">
              {{ heroTitle }}
            </h1>

            <div
              v-if="data?.summaryHtml"
              class="mt-4 text-justify text-sm leading-8 text-zinc-900/80 [&_a]:font-semibold [&_a]:text-amber-600 [&_a]:hover:text-amber-700"
              v-html="data.summaryHtml"
            />
            <p v-else-if="data?.description" class="mt-4 text-justify text-sm leading-8 text-zinc-900/80">
              {{ data.description }}
            </p>
            <p v-else class="mt-4 text-justify text-sm leading-8 text-zinc-500">
              جزئیات این محصول به زودی تکمیل می‌شود.
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
          </div>
        </div>

        <div v-if="pending" class="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500">
          در حال دریافت اطلاعات محصول...
        </div>

        <div v-if="error" class="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          دریافت اطلاعات محصول با خطا مواجه شد. دوباره تلاش کنید.
        </div>
      </div>
    </section>

    <section v-if="data?.moarefiBlocks?.length" id="moarefi" class="scroll-mt-24 py-12">
      <div class="mx-auto max-w-[1220px] px-4">
        <div class="flex items-center gap-4">
          <div class="h-[2px] flex-1 bg-amber-500"></div>
          <h2 class="text-lg font-black text-amber-600">
            {{ sectionLabel('moarefi', 'معرفی محصول') }}
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
        </div>
      </div>
    </section>

    <section v-if="data?.moshakhasatBlocks?.length || data?.specModels?.length" id="moshakhasat" class="scroll-mt-24 py-12 bg-zinc-50/70">
      <div class="mx-auto max-w-[1220px] px-4">
        <div class="flex items-center gap-4">
          <div class="h-[2px] flex-1 bg-amber-500"></div>
          <h2 class="text-lg font-black text-amber-600">
            {{ sectionLabel('moshakhasat', 'مشخصات فنی') }}
          </h2>
          <div class="h-[2px] flex-1 bg-amber-500"></div>
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
            دانلود کاتالوگ
          </a>
        </div>

        <div v-if="data?.specModels?.length" class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
            {{ sectionLabel('video', 'ویدیو محصول') }}
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

        <div v-if="videoSlides.length" class="mt-10">
          <div class="relative">
            <button
              type="button"
              class="absolute left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-zinc-800 shadow ring-1 ring-black/10 transition hover:bg-white sm:flex"
              :class="videoActiveIndex === 0 ? 'cursor-not-allowed opacity-40' : ''"
              :disabled="videoActiveIndex === 0"
              aria-label="Previous video"
              @click="scrollVideoPrev"
            >
              <svg viewBox="0 0 20 20" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12.5 4.5L7 10l5.5 5.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              class="absolute right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-zinc-800 shadow ring-1 ring-black/10 transition hover:bg-white sm:flex"
              :class="videoActiveIndex >= videoSlides.length - 1 ? 'cursor-not-allowed opacity-40' : ''"
              :disabled="videoActiveIndex >= videoSlides.length - 1"
              aria-label="Next video"
              @click="scrollVideoNext"
            >
              <svg viewBox="0 0 20 20" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7.5 4.5L13 10l-5.5 5.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>

            <div
              ref="videoScroller"
              class="video-scroll flex gap-6 overflow-x-auto pb-8 pt-6 [-webkit-overflow-scrolling:touch] snap-x snap-mandatory"
              :class="videoSlides.length <= 1 ? 'justify-center' : ''"
              @scroll.passive="onVideoScroll"
            >
              <div
                v-for="(slide, index) in videoSlides"
                :key="`${slide.type}-${slide.src}-${index}`"
                :ref="setVideoSlideRef"
                class="group relative w-[88vw] shrink-0 snap-center overflow-hidden rounded-[34px] bg-black shadow-[0_14px_32px_rgba(0,0,0,0.22)] transition duration-300 sm:w-[560px] lg:w-[720px]"
                :class="index === videoActiveIndex ? 'scale-100 opacity-100' : 'scale-[0.94] opacity-60'"
              >
                <div class="relative aspect-[16/9] w-full">
                  <NuxtImg
                    v-if="slide.type === 'image'"
                    :src="slide.src"
                    :alt="slide.label || heroTitle"
                    class="h-full w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 900px"
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
                  <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                  <div class="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                    <button
                      v-if="slide.type === 'video'"
                      type="button"
                      class="inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/80 bg-white/10 backdrop-blur transition hover:bg-white/20"
                      aria-label="Play video"
                      @click="openVideoModal(slide.src)"
                    >
                      <svg viewBox="0 0 24 24" class="h-7 w-7 text-white" fill="currentColor">
                        <path d="M8 5.2v13.6c0 .7.8 1.1 1.4.7l10-6.8a.8.8 0 000-1.4l-10-6.8c-.6-.4-1.4 0-1.4.7z" />
                      </svg>
                    </button>
                    <p class="mt-4 text-base font-semibold text-white drop-shadow sm:text-lg">
                      {{ slide.label || heroTitle }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-4 flex items-center justify-center gap-2">
              <button
                v-for="(slide, index) in videoSlides"
                :key="`video-dot-${slide.src}-${index}`"
                type="button"
                class="h-2 w-8 rounded-full transition"
                :class="index === videoActiveIndex ? 'bg-amber-500' : 'bg-zinc-300 hover:bg-zinc-400'"
                :aria-label="`Go to video ${index + 1}`"
                @click="scrollVideoToIndex(index)"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="data?.faqItems?.length" id="faq" class="scroll-mt-24 py-12 bg-zinc-50/70">
      <div class="mx-auto max-w-[1220px] px-4">
        <div class="flex items-center gap-4">
          <div class="h-[2px] flex-1 bg-amber-500"></div>
          <h2 class="text-lg font-black text-amber-600">
            {{ sectionLabel('faq', 'سوالات متداول') }}
          </h2>
          <div class="h-[2px] flex-1 bg-amber-500"></div>
        </div>

        <div class="mt-8 space-y-4">
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
        <button class="absolute inset-0 bg-black/70" aria-label="Close video" @click="closeVideoModal" />
        <div class="absolute inset-0 flex items-center justify-center p-4">
          <div class="w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10">
            <div class="flex items-center justify-between px-4 py-3 text-white/90">
              <span class="text-sm">{{ heroTitle }}</span>
              <button class="h-9 w-9 rounded-xl bg-white/10 hover:bg-white/15" aria-label="Close video" @click="closeVideoModal">
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
.video-scroll {
  scrollbar-width: none;
}

.video-scroll::-webkit-scrollbar {
  display: none;
}
</style>
