import type { H3Event } from 'h3'

type CategoryDetail = {
  id: number
  title: string
  slug: string
  image?: string | null
  short_description?: string
  description?: string
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
      statusMessage: 'Category slug is required'
    })
  }

  const url = `${apiBaseUrl.replace(/\/$/, '')}/api/products/categories/${encodeURIComponent(slug)}/`
  let res: Response
  try {
    res = await fetch(url)
  } catch (error) {
    throw createError({
      statusCode: 502,
      statusMessage: `Category API fetch failed (${error instanceof Error ? error.message : 'network error'})`
    })
  }

  if (!res.ok) {
    throw createError({
      statusCode: res.status,
      statusMessage: `Category API fetch failed (${res.status})`
    })
  }

  return await res.json() as CategoryDetail
}

export default defineEventHandler(handler)
