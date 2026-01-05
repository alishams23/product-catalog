<script setup lang="ts">
type CategoryListItem = {
  title: string
  image?: string | null
  slug?: string
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

type CategoryCard = {
  title: string
  slug: string
  image?: string | null
}

type CategorySection = {
  title: string
  slug?: string
  items: CategoryCard[]
}

useSeoMeta({
  title: 'Categories | MBICO',
  description: 'Browse product categories.'
})

const route = useRoute()

function queryValue(value: string | string[] | null | undefined) {
  return Array.isArray(value) ? value[0] ?? '' : value ?? ''
}

const rootCategoryFilter = computed(() => queryValue(route.query.root_category).trim())

const { data: categoriesData, pending: categoriesPending, error: categoriesError } = await useFetch<PaginatedCategoryList>('/api/products/categories', {
  query: { page_size: 200 },
  default: () => ({ count: 0, next: null, previous: null, results: [] })
})

const { data: rootCategories, pending: rootsPending, error: rootsError } = await useFetch<RootCategory[]>('/api/products/root-categories', {
  default: () => []
})

const categoryImageMap = computed(() => {
  const map = new Map<string, string>()
  for (const item of categoriesData.value?.results ?? []) {
    const title = item.title?.trim() ?? ''
    if (!title) continue
    const image = typeof item.image === 'string' ? item.image : ''
    if (image) map.set(title, image)
  }
  return map
})

const categorySlugMap = computed(() => {
  const map = new Map<string, string>()
  for (const root of rootCategories.value ?? []) {
    for (const cat of root.categories ?? []) {
      const name = cat.name?.trim() ?? ''
      if (name && cat.slug) map.set(name, cat.slug)
    }
  }
  for (const item of categoriesData.value?.results ?? []) {
    const title = item.title?.trim() ?? ''
    const slug = item.slug?.trim() ?? ''
    if (title && slug && !map.has(title)) map.set(title, slug)
  }
  return map
})

function slugifyCategoryTitle(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
}

function categoryTo(slug: string) {
  return slug ? `/categories/${encodeURIComponent(slug)}` : '/categories'
}

const sections = computed<CategorySection[]>(() => {
  const imageMap = categoryImageMap.value
  const roots = rootCategories.value ?? []
  const rootSections: CategorySection[] = roots
    .map((root) => {
      const items = (root.categories ?? [])
        .map((cat) => {
          const title = (cat.name ?? '').trim()
          if (!title) return null
          const slug = cat.slug || categorySlugMap.value.get(title) || slugifyCategoryTitle(title)
          return {
            title,
            slug,
            image: imageMap.get(title) ?? null
          }
        })
        .filter((item): item is CategoryCard => Boolean(item))
      if (!items.length) return null
      return {
        title: root.name || root.slug || 'Categories',
        slug: root.slug || undefined,
        items
      }
    })
    .filter((section): section is CategorySection => Boolean(section))

  if (rootSections.length) {
    const filterSlug = rootCategoryFilter.value
    if (filterSlug) {
      const matches = rootSections.filter((section) => section.slug === filterSlug)
      if (matches.length) return matches
    }
    return rootSections
  }

  const fallbackItems = (categoriesData.value?.results ?? [])
    .map((item) => {
      const title = item.title?.trim() ?? ''
      if (!title) return null
      const slug = item.slug?.trim()
        || categorySlugMap.value.get(title)
        || slugifyCategoryTitle(title)
      return {
        title,
        slug,
        image: typeof item.image === 'string' ? item.image : null
      }
    })
    .filter((item): item is CategoryCard => Boolean(item))

  if (!fallbackItems.length) return []
  return [{ title: 'Categories', items: fallbackItems }]
})

const hasError = computed(() => Boolean(categoriesError.value || rootsError.value))
const isPending = computed(() => categoriesPending.value || rootsPending.value)
</script>

<template>
  <div class="bg-white">
    <div class="mx-auto max-w-[1220px] px-4 pt-6">
      <nav class="text-xs uppercase text-zinc-500">
        <NuxtLink to="/" class="hover:text-zinc-700">
          Home
        </NuxtLink>
        <span class="mx-2 text-zinc-400">/</span>
        <span class="text-zinc-700">Categories</span>
      </nav>
    </div>

    <section class="mx-auto max-w-[1220px] px-4 pb-16 pt-6">
      <div class="text-center">
        <h1 class="text-3xl font-black text-zinc-900 sm:text-4xl">
          Product Categories
        </h1>
        <p class="mt-3 text-sm text-zinc-600">
          Browse the product categories and jump into the collection you need.
        </p>
      </div>

      <div v-if="hasError" class="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
        We could not load the categories right now. Please try again later.
      </div>

      <div v-else class="mt-10">
        <div v-if="isPending" class="space-y-12">
          <div v-for="i in 2" :key="i" class="space-y-6">
            <div class="h-6 w-48 rounded-full bg-zinc-200/70" />
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              <div v-for="j in 6" :key="j" class="animate-pulse overflow-hidden rounded-[26px] bg-zinc-100">
                <div class="aspect-[4/3] bg-white" />
                <div class="p-4">
                  <div class="h-4 w-3/4 rounded bg-zinc-200" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="sections.length === 0" class="mt-10 text-center text-sm text-zinc-600">
          There are no categories to display yet.
        </div>

        <div v-else class="space-y-14">
          <section v-for="section in sections" :key="section.title" class="space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-black text-zinc-900 sm:text-xl">
                {{ section.title }}
              </h2>
              <div class="h-px flex-1 bg-zinc-200/70" />
            </div>

            <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              <component
                :is="item.slug ? 'NuxtLink' : 'div'"
                v-for="item in section.items"
                :key="`${section.title}-${item.title}`"
                class="group overflow-hidden rounded-[26px] bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md"
                :to="item.slug ? categoryTo(item.slug) : undefined"
              >
                <div class="aspect-[4/3] w-full overflow-hidden bg-zinc-100">
                  <NuxtImg
                    v-if="item.image"
                    :src="item.image"
                    :alt="item.title"
                    class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 50vw, 220px"
                  />
                  <div v-else class="flex h-full w-full items-center justify-center text-xs text-zinc-500">
                    No image
                  </div>
                </div>
                <div class="px-4 py-3 text-center">
                  <p class="text-sm font-semibold text-zinc-900">
                    {{ item.title }}
                  </p>
                </div>
              </component>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>
