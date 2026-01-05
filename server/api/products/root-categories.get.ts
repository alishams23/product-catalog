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

const API_BASE_URL = 'http://156.236.31.140:8001'

const handler = async () => {
  const res = await fetch(`${API_BASE_URL}/api/products/root-categories/`)

  if (!res.ok) {
    throw createError({
      statusCode: res.status,
      statusMessage: `Root categories API fetch failed (${res.status})`
    })
  }

  return await res.json() as RootCategory[]
}

export default import.meta.dev
  ? defineEventHandler(handler)
  : defineCachedEventHandler(handler, {
      maxAge: 60 * 30,
      name: 'product-root-categories'
    })
