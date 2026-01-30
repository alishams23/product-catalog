import type { H3Event } from 'h3'

type ProductCategory = {
  id: number
  name: string
  slug: string
}

type ProductGalleryImage = {
  id: number
  url: string
  alt_text?: string
  sort_order?: number
}

type ProductDetail = {
  id: number
  title: string
  slug: string
  categories: ProductCategory[]
  short_description?: string
  description?: string
  hero_image?: string
  hero_video?: string
  gallery_images: ProductGalleryImage[]
  faq_items?: Array<{
    question?: string
    answer?: string
    sort_order?: number
  }>
  spec_table?: unknown
  videos?: Array<{
    id: number
    url: string
    title?: string
    sort_order?: number
  }>
  related_products?: Array<{
    id: number
    title: string
    slug: string
    short_description?: string
    hero_image?: string
    categories?: ProductCategory[]
  }>
}

const handler = async (event: H3Event) => {
  const { apiBaseUrl } = useRuntimeConfig()
  if (!apiBaseUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'API base URL is not configured. Set NUXT_API_BASE_URL.'
    })
  }

  const slug = getRouterParam(event, 'slug') ?? ''

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Product slug is required'
    })
  }

  const url = `${apiBaseUrl.replace(/\/$/, '')}/api/products/${encodeURIComponent(slug)}/`
  let res: Response
  try {
    res = await fetch(url)
  } catch (error) {
    throw createError({
      statusCode: 502,
      statusMessage: `Product API fetch failed (${error instanceof Error ? error.message : 'network error'})`
    })
  }

  if (!res.ok) {
    throw createError({
      statusCode: res.status,
      statusMessage: `Product API fetch failed (${res.status})`
    })
  }

  return await res.json() as ProductDetail
}

export default defineEventHandler(handler)
