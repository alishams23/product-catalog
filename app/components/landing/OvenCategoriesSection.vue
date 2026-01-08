<script setup lang="ts">
const { t, localePath } = useTranslations()

type RootCategory = {
  id: number
  name: string
  slug: string
  image?: string | null
  categories: Array<{
    id: number
    name: string
    slug: string
  }>
}

type CategoryCard = {
  title: string
  href: string
  image?: string | null
  meta?: string
  slug?: string
}

type CategoryDetail = {
  id: number
  title: string
  slug: string
  image?: string | null
  short_description?: string
  description?: string
}

const fallbackCategories = computed<CategoryCard[]>(() => [
  {
    title: t('home.ovenCategories.items.bakery'),
    href: localePath('/categories'),
    image: 'https://mbico.ir/wp-content/uploads/2024/11/ovens-bakery.webp',
    meta: t('home.ovenCategories.counts.bakery')
  },
  {
    title: t('home.ovenCategories.items.lavash'),
    href: localePath('/categories'),
    image: 'https://mbico.ir/wp-content/uploads/2024/05/lavashovens-247x247.webp',
    meta: t('home.ovenCategories.counts.lavash')
  },
  {
    title: t('home.ovenCategories.items.barbari'),
    href: localePath('/categories'),
    image: 'https://mbico.ir/wp-content/uploads/2024/05/barbari-ovens-247x247.webp',
    meta: t('home.ovenCategories.counts.barbari')
  },
  {
    title: t('home.ovenCategories.items.taftoon'),
    href: localePath('/categories'),
    image: 'https://mbico.ir/wp-content/uploads/2024/05/taftoon-ovens-247x247.webp',
    meta: t('home.ovenCategories.counts.taftoon')
  },
  {
    title: t('home.ovenCategories.items.sangak'),
    href: localePath('/categories'),
    image: 'https://mbico.ir/wp-content/uploads/2024/05/sagakovens-1-247x247.webp',
    meta: t('home.ovenCategories.counts.sangak')
  }
])

const { data: rootCategories } = await useFetch<RootCategory[]>('/api/products/root-categories', {
  default: () => []
})

const categorySlugs = computed(() => {
  const roots = rootCategories.value ?? []
  if (!roots.length) return []
  const slugs = new Set<string>()
  for (const root of roots) {
    for (const cat of root.categories ?? []) {
      if (cat.slug) slugs.add(cat.slug)
    }
  }
  return Array.from(slugs)
})

const { data: categoryDetails } = await useAsyncData<CategoryDetail[]>(async () => {
  const slugs = categorySlugs.value
  if (!slugs.length) return []
  const results = await Promise.all(slugs.map(async (slug) => {
    try {
      return await $fetch<CategoryDetail>(`/api/products/categories/${encodeURIComponent(slug)}`)
    } catch {
      return null
    }
  }))
  return results.filter((item): item is CategoryDetail => Boolean(item))
}, {
  watch: [categorySlugs],
  default: () => []
})

const categoryDetailMap = computed(() => {
  const map = new Map<string, CategoryDetail>()
  for (const detail of categoryDetails.value ?? []) {
    if (detail.slug) map.set(detail.slug, detail)
  }
  return map
})

const rootTabs = computed(() => {
  const roots = rootCategories.value ?? []
  if (!roots.length) return []
  return roots
    .map((root) => {
      const slug = root.slug?.trim()
      const href = slug
        ? localePath(`/categories?root_category=${encodeURIComponent(slug)}`)
        : localePath('/categories')
      const categories = (root.categories ?? [])
        .map((cat) => {
          const detail = categoryDetailMap.value.get(cat.slug)
          const title = detail?.title || cat.name || ''
          const image = detail?.image || root.image || null
          const meta = detail?.short_description || detail?.description || ''
          const catHref = cat.slug
            ? localePath(`/categories/${encodeURIComponent(cat.slug)}`)
            : localePath('/categories')
          return {
            title,
            href: catHref,
            image,
            meta,
            slug: cat.slug
          }
        })
        .filter((item) => item.title)
      return {
        key: slug || String(root.id),
        label: root.name?.trim() || slug || t('header.mega.fallbackCategory'),
        href,
        categories
      }
    })
    .filter((tab) => tab.label)
})

const activeRootTab = ref('')

watch(rootTabs, (tabs) => {
  if (!tabs.length) return
  if (!tabs.some((tab) => tab.key === activeRootTab.value)) {
    activeRootTab.value = tabs[0]!.key
  }
}, { immediate: true })

const activeTab = computed(() =>
  rootTabs.value.find((tab) => tab.key === activeRootTab.value) ?? rootTabs.value[0]
)
</script>

<template>
  <section class="py-10">
    <div class="mx-auto max-w-6xl px-4">
      <UiSectionHeading :title="t('home.ovenCategories.heading')" align="center" />

      <div v-if="rootTabs.length" class="mt-6">
        <div class="flex flex-wrap items-center justify-center gap-2">
          <button
            v-for="tab in rootTabs"
            :key="tab.key"
            type="button"
            class="rounded-full border px-4 py-1.5 text-xs font-semibold transition"
            :class="tab.key === activeRootTab ? 'border-amber-500 bg-amber-500 text-white' : 'border-zinc-200 text-zinc-600 hover:border-amber-400 hover:text-amber-700'"
            @click="activeRootTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>

        <div class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <NuxtLink
            v-for="cat in activeTab?.categories ?? []"
            :key="cat.slug || cat.href"
            class="group rounded-2xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden hover:shadow-md transition"
            :to="cat.href"
          >
            <div class="aspect-square w-full overflow-hidden bg-zinc-100">
              <NuxtImg
                v-if="cat.image"
                :src="cat.image"
                :alt="cat.title"
                class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
              />
              <div v-else class="flex h-full w-full items-center justify-center text-xs font-semibold text-zinc-400">
                {{ cat.title }}
              </div>
            </div>
            <div class="bg-white/85 px-3 py-3 text-center">
              <p class="text-sm font-semibold text-zinc-900">
                {{ cat.title }}
              </p>
              <p v-if="cat.meta" class="mt-1 text-xs text-zinc-500">
                {{ cat.meta }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div v-else class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <NuxtLink
          v-for="c in fallbackCategories"
          :key="c.href"
          class="group rounded-2xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden hover:shadow-md transition"
          :to="c.href"
        >
          <div class="aspect-square w-full overflow-hidden bg-zinc-100">
            <NuxtImg :src="c.image" :alt="c.title" class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
          </div>
          <div class="bg-white/85 px-3 py-3 text-center">
            <p class="text-sm font-semibold text-zinc-900">
              {{ c.title }}
            </p>
            <p v-if="c.meta" class="mt-1 text-xs text-zinc-500">
              {{ c.meta }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
