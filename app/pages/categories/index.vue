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

const { t, localePath } = useTranslations()

useSeoMeta({
  title: computed(() => t('seo.categories.title')),
  description: computed(() => t('seo.categories.description'))
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

function normalizeCategorySlug(title: string, slug?: string) {
  const trimmedTitle = title.trim()
  const directSlug = slug?.trim()
  if (directSlug) return directSlug
  const mappedSlug = categorySlugMap.value.get(trimmedTitle)
  if (mappedSlug) return mappedSlug
  const derivedSlug = slugifyCategoryTitle(trimmedTitle)
  if (derivedSlug) return derivedSlug
  return trimmedTitle
}

function categoryTo(slug: string) {
  return slug ? localePath(`/categories/${encodeURIComponent(slug)}`) : localePath('/categories')
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
          const slug = normalizeCategorySlug(title, cat.slug)
          return {
            title,
            slug,
            image: imageMap.get(title) ?? null
          }
        })
        .filter((item): item is CategoryCard => Boolean(item))
      if (!items.length) return null
      return {
        title: root.name || root.slug || t('categories.list.fallbackTitle'),
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
      const slug = normalizeCategorySlug(title, item.slug)
      return {
        title,
        slug,
        image: typeof item.image === 'string' ? item.image : null
      }
    })
    .filter((item): item is CategoryCard => Boolean(item))

  if (!fallbackItems.length) return []
  return [{ title: t('categories.list.fallbackTitle'), items: fallbackItems }]
})

const hasError = computed(() => Boolean(categoriesError.value || rootsError.value))
const isPending = computed(() => categoriesPending.value || rootsPending.value)
</script>

<template>
  <div class="bg-white">
    <section class="mx-auto max-w-[1220px] px-4 pb-16 pt-6">
      <div v-if="hasError" class="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
        {{ t('categories.list.error') }}
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
          {{ t('categories.list.empty') }}
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
              <NuxtLink
                v-for="item in section.items"
                :key="`${section.title}-${item.title}`"
                class="group overflow-hidden rounded-[26px] bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md"
                :to="categoryTo(item.slug)"
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
                    {{ t('categories.list.noImage') }}
                  </div>
                </div>
                <div class="px-4 py-3 text-center">
                  <p class="text-sm font-semibold text-zinc-900">
                    {{ item.title }}
                  </p>
                </div>
              </NuxtLink>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>
