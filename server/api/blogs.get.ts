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

const API_BASE_URL = 'http://156.236.31.140:8001'

const handler = async (_event: H3Event) => {
  const res = await fetch(`${API_BASE_URL}/api/blogs/`)

  if (!res.ok) {
    throw createError({
      statusCode: res.status,
      statusMessage: `Blog API fetch failed (${res.status})`
    })
  }

  return await res.json() as BlogListItem[]
}

export default defineEventHandler(handler)
