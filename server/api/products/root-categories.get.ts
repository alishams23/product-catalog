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

const handler = async () => {
  const { apiBaseUrl } = useRuntimeConfig()
  if (!apiBaseUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'API base URL is not configured. Set NUXT_API_BASE_URL.'
    })
  }

  const url = `${apiBaseUrl.replace(/\/$/, '')}/api/products/root-categories/`
  let res: Response
  try {
    res = await fetch(url)
  } catch (error) {
    throw createError({
      statusCode: 502,
      statusMessage: `Root categories API fetch failed (${error instanceof Error ? error.message : 'network error'})`
    })
  }

  if (!res.ok) {
    throw createError({
      statusCode: res.status,
      statusMessage: `Root categories API fetch failed (${res.status})`
    })
  }

  return await res.json() as RootCategory[]
}

export default defineEventHandler(handler)
