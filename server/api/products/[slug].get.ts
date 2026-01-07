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
