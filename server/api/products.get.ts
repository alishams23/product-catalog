import type { H3Event } from 'h3'

type Product = {
  title: string
  href: string
  image: string
  price?: string
  slug: string
  cartHref?: string
  categories?: Array<{
    name: string
    slug: string
    rootName?: string
    rootSlug?: string
  }>
}

type ProductSection = {
  title: string
  description?: string
  items: Product[]
}

type ProductsResponse = {
  page: number
  items: Product[]
  hasNext: boolean
  sections: ProductSection[]
}

type ApiCategory = {
  id: number
  name: string
  slug: string
  root_category?: {
    id: number
    name: string
    slug: string
  }
}

type ApiProductListItem = {
  id: number
  title: string
  slug: string
  short_description?: string
  primary_image?: string | { url?: string; alt_text?: string }
  categories?: ApiCategory[]
  is_featured?: boolean
  published_at?: string
}

type ApiListResponse = {
  count: number
  next: string | null
  previous: string | null
  results: ApiProductListItem[]
}

const API_BASE_URL = 'http://156.236.31.140:8001'

function isVideoUrl(url: string): boolean {
  return /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(url)
}

function coerceImageUrl(value: ApiProductListItem['primary_image']): string {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object' && typeof value.url === 'string') return value.url
  return ''
}

function appendQuery(params: URLSearchParams, key: string, value: unknown) {
  if (value === undefined || value === null || value === '') return
  if (Array.isArray(value)) {
    for (const entry of value) {
      if (entry !== undefined && entry !== null && entry !== '') {
        params.append(key, String(entry))
      }
    }
    return
  }
  params.set(key, String(value))
}

const handler = async (event: H3Event) => {
  const query = getQuery(event)
  const rawPage = Array.isArray(query.page) ? query.page[0] : query.page
  const page = Math.max(1, Number.parseInt(String(rawPage ?? '1'), 10) || 1)

  const params = new URLSearchParams()
  params.set('page', String(page))
  appendQuery(params, 'page_size', Array.isArray(query.page_size) ? query.page_size[0] : query.page_size)
  appendQuery(params, 'category', Array.isArray(query.category) ? query.category[0] : query.category)
  appendQuery(params, 'root_category', Array.isArray(query.root_category) ? query.root_category[0] : query.root_category)
  appendQuery(params, 'is_featured', Array.isArray(query.is_featured) ? query.is_featured[0] : query.is_featured)
  appendQuery(params, 'search', Array.isArray(query.search) ? query.search[0] : query.search)
  appendQuery(params, 'ordering', Array.isArray(query.ordering) ? query.ordering[0] : query.ordering)

  const url = `${API_BASE_URL}/api/products/?${params.toString()}`
  const res = await fetch(url)

  if (!res.ok) {
    throw createError({
      statusCode: res.status,
      statusMessage: `Product API fetch failed (${res.status})`
    })
  }

  const data = await res.json() as ApiListResponse
  const items: Product[] = (data.results ?? []).map((item) => ({
    title: item.title ?? '',
    href: `/products/${encodeURIComponent(item.slug ?? '')}`,
    image: (() => {
      const url = coerceImageUrl(item.primary_image)
      if (!url || isVideoUrl(url)) return ''
      return url
    })(),
    slug: item.slug ?? '',
    categories: (item.categories ?? [])
      .map((cat) => ({
        name: cat.name ?? '',
        slug: cat.slug ?? '',
        rootName: cat.root_category?.name ?? '',
        rootSlug: cat.root_category?.slug ?? ''
      }))
      .filter((cat) => cat.name && cat.slug)
  }))

  return {
    page,
    items,
    hasNext: Boolean(data.next),
    sections: []
  } satisfies ProductsResponse
}

export default import.meta.dev
  ? defineEventHandler(handler)
  : defineCachedEventHandler(handler, {
      maxAge: 60 * 30,
      getKey(event) {
        const query = getQuery(event)
        const rawPage = Array.isArray(query.page) ? query.page[0] : query.page
        const params = new URLSearchParams()
        params.set('page', String(rawPage ?? '1'))
        appendQuery(params, 'page_size', Array.isArray(query.page_size) ? query.page_size[0] : query.page_size)
        appendQuery(params, 'category', Array.isArray(query.category) ? query.category[0] : query.category)
        appendQuery(params, 'root_category', Array.isArray(query.root_category) ? query.root_category[0] : query.root_category)
        appendQuery(params, 'is_featured', Array.isArray(query.is_featured) ? query.is_featured[0] : query.is_featured)
        appendQuery(params, 'search', Array.isArray(query.search) ? query.search[0] : query.search)
        appendQuery(params, 'ordering', Array.isArray(query.ordering) ? query.ordering[0] : query.ordering)
        return `product-list:${params.toString()}`
      }
    })
