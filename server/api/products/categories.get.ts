import type { H3Event } from 'h3'

type CategoryListItem = {
  title: string
  image?: string | null
}

type PaginatedCategoryList = {
  count: number
  next: string | null
  previous: string | null
  results: CategoryListItem[]
}

function appendQuery(params: URLSearchParams, key: string, value: unknown) {
  if (value === undefined || value === null || value === '') return
  if (Array.isArray(value)) {
    const first = value[0]
    if (first !== undefined && first !== null && first !== '') {
      params.set(key, String(first))
    }
    return
  }
  params.set(key, String(value))
}

const handler = async (event: H3Event) => {
  const { apiBaseUrl } = useRuntimeConfig()
  if (!apiBaseUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'API base URL is not configured. Set NUXT_API_BASE_URL.'
    })
  }

  const query = getQuery(event)
  const params = new URLSearchParams()
  appendQuery(params, 'page', Array.isArray(query.page) ? query.page[0] : query.page)
  appendQuery(params, 'page_size', Array.isArray(query.page_size) ? query.page_size[0] : query.page_size)

  const suffix = params.toString() ? `?${params.toString()}` : ''
  const url = `${apiBaseUrl.replace(/\/$/, '')}/api/products/categories/${suffix}`
  let res: Response
  try {
    res = await fetch(url)
  } catch (error) {
    throw createError({
      statusCode: 502,
      statusMessage: `Categories API fetch failed (${error instanceof Error ? error.message : 'network error'})`
    })
  }

  if (!res.ok) {
    throw createError({
      statusCode: res.status,
      statusMessage: `Categories API fetch failed (${res.status})`
    })
  }

  return await res.json() as PaginatedCategoryList
}

export default defineEventHandler(handler)
