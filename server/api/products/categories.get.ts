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

const API_BASE_URL = 'http://156.236.31.140:8001'

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
  const query = getQuery(event)
  const params = new URLSearchParams()
  appendQuery(params, 'page', Array.isArray(query.page) ? query.page[0] : query.page)
  appendQuery(params, 'page_size', Array.isArray(query.page_size) ? query.page_size[0] : query.page_size)

  const suffix = params.toString() ? `?${params.toString()}` : ''
  const url = `${API_BASE_URL}/api/products/categories/${suffix}`
  const res = await fetch(url)

  if (!res.ok) {
    throw createError({
      statusCode: res.status,
      statusMessage: `Categories API fetch failed (${res.status})`
    })
  }

  return await res.json() as PaginatedCategoryList
}

export default import.meta.dev
  ? defineEventHandler(handler)
  : defineCachedEventHandler(handler, {
      maxAge: 60 * 30,
      getKey(event) {
        const query = getQuery(event)
        const params = new URLSearchParams()
        appendQuery(params, 'page', Array.isArray(query.page) ? query.page[0] : query.page)
        appendQuery(params, 'page_size', Array.isArray(query.page_size) ? query.page_size[0] : query.page_size)
        return `product-categories:${params.toString()}`
      }
    })
