<script setup lang="ts">
definePageMeta({
  hideHeaderAtTop: true
})

type CategoryDetail = {
  id: number
  title: string
  slug: string
  image?: string | null
  short_description?: string
  description?: string
}

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

const route = useRoute()
const routeSlug = computed(() => {
  const param = route.params.slug
  return Array.isArray(param) ? param[0] ?? '' : String(param ?? '')
})

const { data: categoryData, pending: categoryPending, error: categoryError } = await useFetch<CategoryDetail>(() => `/api/products/categories/${encodeURIComponent(routeSlug.value)}`, {
  default: () => ({
    id: 0,
    title: routeSlug.value,
    slug: routeSlug.value
  })
})

const productsQuery = computed(() => ({
  category: routeSlug.value,
  page_size: 200
}))

const { data: productsData, pending: productsPending, error: productsError } = await useFetch<ProductsResponse>('/api/products', {
  query: productsQuery,
  watch: [productsQuery],
  default: () => ({ page: 1, items: [], hasNext: false, sections: [] })
})

const { data: rootCategories } = await useFetch<RootCategory[]>('/api/products/root-categories', {
  default: () => []
})

const categoryTitle = computed(() => categoryData.value?.title || routeSlug.value)
const categoryDescription = computed(() => categoryData.value?.description || categoryData.value?.short_description || '')
const categoryImage = computed(() => (typeof categoryData.value?.image === 'string' ? categoryData.value.image : ''))
const products = computed(() => productsData.value?.items ?? [])

const rootCategory = computed(() => {
  const slugValue = routeSlug.value
  if (!slugValue) return null
  return rootCategories.value.find((root) =>
    root.categories?.some((item) => item.slug === slugValue)
  ) ?? null
})

const rootCategoryLabel = computed(() => rootCategory.value?.name || '')
const rootCategoryHref = computed(() =>
  rootCategory.value?.slug ? `/categories?root_category=${encodeURIComponent(rootCategory.value.slug)}` : ''
)
const productsIndexHref = computed(() =>
  routeSlug.value ? `/products?category=${encodeURIComponent(routeSlug.value)}` : '/products'
)

useSeoMeta(() => ({
  title: categoryTitle.value ? `${categoryTitle.value} | MBICO` : 'Category | MBICO',
  description: categoryDescription.value || 'Browse products in this category.'
}))

function productTo(slug: string) {
  return slug ? `/products/${encodeURIComponent(slug)}` : '/products'
}
</script>

<template>
  <div class="bg-white">
    <section class="relative overflow-hidden bg-[#0f1115] text-white">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(248,178,70,0.25)_0%,rgba(15,17,21,0)_55%)]" />
      <div class="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_45%)]" />

      <div class="relative mx-auto max-w-[1220px] px-4 py-12 sm:py-16">
        <nav class="text-xs uppercase text-white/60">
          <NuxtLink to="/" class="hover:text-white">
            Home
          </NuxtLink>
          <span class="mx-2 text-white/40">/</span>
          <NuxtLink to="/categories" class="hover:text-white">
            Categories
          </NuxtLink>
          <template v-if="rootCategoryLabel">
            <span class="mx-2 text-white/40">/</span>
            <NuxtLink
              v-if="rootCategoryHref"
              :to="rootCategoryHref"
              class="hover:text-white"
            >
              {{ rootCategoryLabel }}
            </NuxtLink>
            <span v-else class="text-white/70">{{ rootCategoryLabel }}</span>
          </template>
          <span class="mx-2 text-white/40">/</span>
          <span class="text-white/90">
            {{ categoryTitle || 'Category' }}
          </span>
        </nav>

        <div class="mt-8 grid gap-10 lg:grid-cols-12">
          <div class="lg:col-span-7">
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
              Category
            </p>
            <h1 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              {{ categoryTitle || 'Category' }}
            </h1>
            <div v-if="categoryDescription" class="mt-4">
              <div class="ql-container ql-snow" dir="rtl">
                <div class="ql-editor" v-html="categoryDescription" />
              </div>
            </div>
            <p v-else class="mt-4 text-sm leading-8 text-white/60">
              Details for this category will be available soon.
            </p>

            <div class="mt-6 flex flex-wrap gap-3">
              <NuxtLink
                :to="productsIndexHref"
                class="inline-flex items-center justify-center rounded-full bg-amber-500 px-5 py-2 text-xs font-semibold text-white shadow-[0_12px_26px_rgba(248,170,40,0.35)] transition hover:bg-amber-600"
              >
                View products
              </NuxtLink>
              <NuxtLink
                to="/categories"
                class="inline-flex items-center justify-center rounded-full border border-white/40 px-5 py-2 text-xs font-semibold text-white/90 transition hover:border-white/70 hover:text-white"
              >
                All categories
              </NuxtLink>
            </div>

            <div v-if="categoryError" class="mt-6 rounded-2xl border border-red-200/30 bg-red-500/10 p-4 text-xs text-red-100">
              We could not load the category details. Showing the products list instead.
            </div>
            <div v-else-if="categoryPending" class="mt-6 text-xs text-white/50">
              Loading category details...
            </div>
          </div>

          <div class="lg:col-span-5">
            <div class="rounded-[28px] bg-white/10 p-4 ring-1 ring-white/15">
              <div class="aspect-[4/3] overflow-hidden rounded-2xl bg-white/10">
                <NuxtImg
                  v-if="categoryImage"
                  :src="categoryImage"
                  :alt="categoryTitle || 'Category'"
                  class="h-full w-full object-cover"
                  sizes="(max-width: 768px) 90vw, 420px"
                />
                <div v-else class="flex h-full w-full items-center justify-center text-xs text-white/60">
                  No image available
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-[1220px] px-4 py-12">
      <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 class="text-lg font-black text-zinc-900">
          Products in this category
        </h2>
        <span v-if="products.length" class="text-xs text-zinc-500">
          {{ products.length }} items
        </span>
      </div>

      <div v-if="productsError" class="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
        We could not load the products right now. Please try again later.
      </div>

      <div v-else>
        <div v-if="productsPending" class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          <div v-for="i in 10" :key="i" class="animate-pulse rounded-[26px] bg-zinc-100 p-3">
            <div class="aspect-square rounded-[20px] bg-white" />
            <div class="mt-4 h-4 rounded bg-zinc-200" />
            <div class="mt-3 h-3 w-2/3 rounded bg-zinc-200" />
            <div class="mt-4 h-8 rounded-full bg-zinc-200" />
          </div>
        </div>

        <div v-else-if="products.length === 0" class="text-center text-sm text-zinc-600">
          There are no products in this category yet.
        </div>

        <div v-else class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          <article
            v-for="p in products"
            :key="p.slug"
            class="group flex h-full flex-col overflow-hidden rounded-[26px] bg-[linear-gradient(180deg,#7a7a7a_0%,#1f1f1f_100%)] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
          >
            <NuxtLink
              :to="productTo(p.slug)"
              class="flex aspect-square items-center justify-center overflow-hidden rounded-[20px] bg-white/90"
            >
              <NuxtImg
                v-if="p.image"
                :src="p.image"
                :alt="p.title"
                class="h-full w-full object-contain transition duration-500 group-hover:scale-[1.04]"
              />
              <div v-else class="text-xs text-zinc-500">
                No image
              </div>
            </NuxtLink>

            <div class="mt-4 flex flex-1 flex-col items-center text-center text-white">
              <NuxtLink :to="productTo(p.slug)" class="text-sm font-semibold leading-7 text-white/90 hover:text-white">
                {{ p.title }}
              </NuxtLink>
              <p class="mt-2 text-sm font-semibold text-white">
                {{ p.price || 'Price on request' }}
              </p>

              <NuxtLink
                v-if="p.slug"
                :to="productTo(p.slug)"
                class="mt-4 inline-flex items-center justify-center rounded-md bg-amber-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_10px_20px_rgba(248,144,20,0.35)] transition hover:bg-amber-600"
              >
                View details
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
:deep(.ql-container) {
  border: 0;
  font-family: inherit;
  background: transparent;
}

:deep(.ql-editor) {
  padding: 0;
  font-size: 0.875rem;
  line-height: 2;
  color: rgba(255, 255, 255, 0.8);
  text-align: justify;
  direction: rtl;
}

:deep(.ql-editor > *:first-child) {
  margin-top: 0;
}

:deep(.ql-editor p) {
  margin-top: 0.75rem;
}

:deep(.ql-editor a) {
  color: #fbbf24;
  font-weight: 600;
}

:deep(.ql-editor ul),
:deep(.ql-editor ol) {
  margin-top: 0.75rem;
  padding-right: 1.25rem;
}

:deep(.ql-editor ul) {
  list-style: disc;
}

:deep(.ql-editor ol) {
  list-style: decimal;
}

:deep(.ql-editor li) {
  margin-top: 0.35rem;
}

:deep(.ql-editor .ql-align-center) {
  text-align: center;
}

:deep(.ql-editor .ql-align-right) {
  text-align: right;
}

:deep(.ql-editor .ql-align-left) {
  text-align: left;
}

:deep(.ql-editor .ql-align-justify) {
  text-align: justify;
}

:deep(.ql-editor .ql-direction-rtl) {
  direction: rtl;
}
</style>
