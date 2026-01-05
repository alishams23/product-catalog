<script setup lang="ts">
type Product = {
  title: string
  href: string
  image: string
  price?: string
  slug: string
  cartHref?: string
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

type RootCategory = {
  id: number
  name: string
  slug: string
  categories: Array<{
    id: number
    name: string
    slug: string
  }>
}

useSeoMeta({
  title: 'محصولات | MBICO',
  description: 'لیست محصولات صنایع پخت مشهد'
})

const preferredSectionOrder = [
  'فرهای پخت',
  'دستگاه های پخت نان',
  'دستگاه های اتوماتیک پخت نان',
  'تجهیزات آماده سازی خمیر و مواد اولیه',
  'تجهیزات فرم دهی خمیر و سیستم های تخمیر',
  'سیستم های خنک کننده',
  'تجهیزات جانبی'
]

const route = useRoute()
const router = useRouter()

function queryValue(value: string | string[] | null | undefined) {
  return Array.isArray(value) ? value[0] ?? undefined : value ?? undefined
}

function slugifyCategoryTitle(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
}

const apiQuery = computed(() => ({
  page: queryValue(route.query.page),
  page_size: queryValue(route.query.page_size),
  category: queryValue(route.query.category),
  root_category: queryValue(route.query.root_category),
  search: queryValue(route.query.search),
  ordering: queryValue(route.query.ordering),
  is_featured: queryValue(route.query.is_featured)
}))

const { data, pending, error } = await useFetch<ProductsResponse>('/api/products', {
  query: apiQuery,
  watch: [apiQuery],
  default: () => ({ page: 1, items: [], hasNext: false, sections: [] })
})

const { data: categoriesData } = await useFetch<PaginatedCategoryList>('/api/products/categories', {
  query: { page_size: 200 },
  default: () => ({ count: 0, next: null, previous: null, results: [] })
})

const { data: rootCategories } = await useFetch<RootCategory[]>('/api/products/root-categories', {
  default: () => []
})

const categorySlugMap = computed(() => {
  const map = new Map<string, string>()
  for (const root of rootCategories.value ?? []) {
    for (const cat of root.categories ?? []) {
      if (cat.name && cat.slug) map.set(cat.name, cat.slug)
    }
  }
  return map
})

const categoryOptions = computed(() =>
  (categoriesData.value?.results ?? [])
    .map((item) => {
      const title = item.title?.trim() ?? ''
      if (!title) return null
      const slug = categorySlugMap.value.get(title) ?? slugifyCategoryTitle(title)
      if (!slug) return null
      return { label: title, value: slug }
    })
    .filter((item): item is { label: string; value: string } => Boolean(item))
)

const selectedCategory = computed({
  get() {
    return queryValue(route.query.category) ?? ''
  },
  set(value: string) {
    const nextQuery = {
      ...route.query,
      category: value || undefined,
      page: undefined
    }
    router.push({ query: nextQuery })
  }
})

function productTo(toSlug: string) {
  return `/products/${encodeURIComponent(toSlug)}`
}

const sections = computed<ProductSection[]>(() => {
  const fromData = data.value?.sections ?? []
  if (fromData.length) {
    const map = new Map(fromData.map(section => [section.title, section]))
    const ordered = preferredSectionOrder.map(title => map.get(title) ?? { title, items: [] })
    const remainder = fromData.filter(section => !preferredSectionOrder.includes(section.title))
    return [...ordered, ...remainder]
  }

  const fallback = data.value?.items ?? []
  if (!fallback.length) {
    return preferredSectionOrder.map(title => ({ title, items: [] }))
  }

  return [{ title: 'محصولات', items: fallback }]
})
</script>

<template>
  <div class="bg-white">
    <div class="mx-auto max-w-[1220px] px-4 pt-6">
      <nav class="text-xs uppercase text-zinc-500">
        <NuxtLink to="/" class="hover:text-zinc-700">
          خانه
        </NuxtLink>
        <span class="mx-2 text-zinc-400">/</span>
        <span class="text-zinc-700">محصولات</span>
      </nav>
    </div>

    <section class="mx-auto max-w-[1220px] px-4 pb-16 pt-6">
      <h1 class="text-center text-3xl font-black text-zinc-900 sm:text-4xl">
        محصولات صنایع پخت مشهد
      </h1>
      <div v-if="categoryOptions.length" class="mt-6 flex flex-wrap items-center justify-center gap-3">
        <label class="text-xs font-semibold text-zinc-600" for="product-category-filter">
          فیلتر دسته
        </label>
        <select
          id="product-category-filter"
          v-model="selectedCategory"
          class="h-10 rounded-full border border-zinc-200 bg-white px-4 text-xs font-semibold text-zinc-700 shadow-sm transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
        >
          <option value="">همه دسته‌ها</option>
          <option v-for="option in categoryOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>

      <div v-if="error" class="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
        دریافت محصولات با خطا مواجه شد. لطفاً دوباره تلاش کنید.
      </div>

      <div v-else class="mt-10">
        <div v-if="pending" class="space-y-12">
          <div v-for="i in 3" :key="i" class="space-y-6">
            <div class="mx-auto h-6 w-56 rounded-full bg-zinc-200/70" />
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
              <div v-for="j in 5" :key="j" class="animate-pulse rounded-[26px] bg-zinc-100 p-3">
                <div class="aspect-square rounded-[20px] bg-white" />
                <div class="mt-4 h-4 rounded bg-zinc-200" />
                <div class="mt-3 h-3 w-2/3 rounded bg-zinc-200" />
                <div class="mt-4 h-8 rounded-full bg-zinc-200" />
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="sections.length === 0" class="mt-10 text-center text-sm text-zinc-600">
          محصولی برای نمایش وجود ندارد.
        </div>

        <div v-else class="space-y-16">
          <section v-for="section in sections" :key="section.title" class="space-y-6">
            <div class="space-y-4 text-center">
              <div class="relative flex items-center justify-center">
                <span class="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-amber-500" />
                <h2 class="relative rounded-md border border-amber-500 bg-white px-6 py-2 text-lg font-black text-amber-600 shadow-[0_6px_16px_rgba(0,0,0,0.08)] sm:text-xl">
                  {{ section.title }}
                </h2>
              </div>
              <p v-if="section.description" class="max-w-3xl text-justify text-sm leading-8 text-zinc-600">
                {{ section.description }}
              </p>
            </div>

            <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
              <article
                v-for="p in section.items"
                :key="p.href"
                class="group flex h-full flex-col overflow-hidden rounded-[26px] bg-[linear-gradient(180deg,#7a7a7a_0%,#1f1f1f_100%)] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
              >
                <NuxtLink
                  :to="productTo(p.slug)"
                  class="flex aspect-square items-center justify-center overflow-hidden rounded-[20px]"
                >
                  <NuxtImg :src="p.image" :alt="p.title" class="h-full w-full object-contain transition duration-500 group-hover:scale-[1.04]" />
                </NuxtLink>

                <div class="mt-4 flex flex-1 flex-col items-center text-center text-white">
                  <NuxtLink :to="productTo(p.slug)" class="text-sm font-semibold leading-7 text-white/90 hover:text-white">
                    {{ p.title }}
                  </NuxtLink>
                  <p class="mt-2 text-sm font-semibold text-white">
                    {{ p.price || 'تماس بگیرید' }}
                  </p>

                  <NuxtLink
                    v-if="p.slug"
                    :to="productTo(p.slug)"
                    class="mt-4 inline-flex items-center justify-center rounded-md bg-amber-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_10px_20px_rgba(248,144,20,0.35)] transition hover:bg-amber-600"
                  >
                    افزودن به سبد خرید
                  </NuxtLink>
                </div>
              </article>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>
