import type { H3Event } from 'h3'

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
  heroVideo?: string
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

const API_BASE_URL = 'http://156.236.31.140:8001'

const handler = async (event: H3Event) => {
  const slug = getRouterParam(event, 'slug') ?? ''

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Product slug is required'
    })
  }

  const url = `${API_BASE_URL}/api/products/${encodeURIComponent(slug)}/`
  const res = await fetch(url)

  if (!res.ok) {
    throw createError({
      statusCode: res.status,
      statusMessage: `Product API fetch failed (${res.status})`
    })
  }

  return await res.json() as ProductDetail
}

export default defineEventHandler(handler)
