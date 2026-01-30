import type { H3Event } from 'h3'

type BlogCategory = {
  id: number
  name: string
  slug: string
}

type BlogListItem = {
  id: number
  title: string
  slug: string
  excerpt?: string
  image?: string | null
  categories?: BlogCategory[]
  published_at?: string | null
}

const handler = async (_event: H3Event) => {
  const { apiBaseUrl } = useRuntimeConfig()
  if (!apiBaseUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'API base URL is not configured. Set NUXT_API_BASE_URL.'
    })
  }

  const url = `${apiBaseUrl.replace(/\/$/, '')}/api/blogs/`
  let res: Response
  try {
    res = await fetch(url)
  } catch (error) {
    throw createError({
      statusCode: 502,
      statusMessage: `Blog API fetch failed (${error instanceof Error ? error.message : 'network error'})`
    })
  }

  if (!res.ok) {
    throw createError({
      statusCode: res.status,
      statusMessage: `Blog API fetch failed (${res.status})`
    })
  }

  return await res.json() as BlogListItem[]
}

export default defineEventHandler(handler)
