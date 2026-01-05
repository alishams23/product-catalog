import type { H3Event } from 'h3'

type BlogPostDetail = {
  slug: string
  title: string
  image?: string
  description?: string
  contentHtml?: string
  author?: string
  publishedAt?: string
  href: string
}

type BlogDetailResponse = {
  id: number
  title: string
  slug: string
  image?: string | null
  excerpt?: string
  body?: string
  categories?: Array<{ id: number; name: string; slug: string }>
  published_at?: string | null
}

const API_BASE_URL = 'http://156.236.31.140:8001'

const handler = async (event: H3Event) => {
  const slug = getRouterParam(event, 'slug') ?? ''

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Blog slug is required'
    })
  }

  const url = `${API_BASE_URL}/api/blogs/${encodeURIComponent(slug)}/`
  const res = await fetch(url)

  if (!res.ok) {
    throw createError({
      statusCode: res.status,
      statusMessage: `Blog API fetch failed (${res.status})`
    })
  }

  const data = await res.json() as BlogDetailResponse

  return {
    slug: data.slug ?? slug,
    title: data.title ?? slug,
    image: data.image ?? undefined,
    description: data.excerpt?.trim() || undefined,
    contentHtml: data.body?.trim() || undefined,
    author: undefined,
    publishedAt: data.published_at ?? undefined,
    categories: data.categories ?? [],
    href: ''
  } satisfies BlogPostDetail
}

export default defineEventHandler(handler)
