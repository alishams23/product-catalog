import type { H3Event } from 'h3'

type CategoryDetail = {
  id: number
  title: string
  slug: string
  image?: string | null
  short_description?: string
  description?: string
}

const API_BASE_URL = 'http://156.236.31.140:8001'

const handler = async (event: H3Event) => {
  const slug = getRouterParam(event, 'slug') ?? ''

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Category slug is required'
    })
  }

  const url = `${API_BASE_URL}/api/products/categories/${encodeURIComponent(slug)}/`
  const res = await fetch(url)

  if (!res.ok) {
    throw createError({
      statusCode: res.status,
      statusMessage: `Category API fetch failed (${res.status})`
    })
  }

  return await res.json() as CategoryDetail
}

export default import.meta.dev
  ? defineEventHandler(handler)
  : defineCachedEventHandler(handler, {
      maxAge: 60 * 30,
      getKey(event) {
        const slug = getRouterParam(event, 'slug') ?? ''
        return `product-category:${slug}`
      }
    })
