<script setup lang="ts">
type Product = {
  title: string
  href: string
  image: string
  price?: string
  slug: string
}

type ProductsResponse = {
  page: number
  items: Product[]
  hasNext: boolean
}

useSeoMeta({
  title: 'محصولات | MBICO',
  description: 'لیست محصولات صنایع پخت مشهد'
})

const page = ref(1)
const search = ref('')

const { data, pending, error } = await useFetch<ProductsResponse>('/api/products', {
  query: computed(() => ({ page: page.value })),
  default: () => ({ page: 1, items: [], hasNext: false })
})

const items = computed(() => data.value?.items ?? [])
const hasNext = computed(() => Boolean(data.value?.hasNext))

const filteredItems = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return items.value
  return items.value.filter(p => p.title.toLowerCase().includes(q))
})

function productTo(toSlug: string) {
  return `/products/${encodeURIComponent(toSlug)}`
}

watch(page, () => {
  if (!import.meta.client) return
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<template>
  <div>
    <header class="bg-[linear-gradient(180deg,#c8a35f_0%,#b48a47_55%,#9a6c2d_100%)]">
      <div class="mx-auto max-w-6xl px-4 py-10 text-center">
        <h1 class="text-3xl font-black tracking-tight text-zinc-900 [text-shadow:0_2px_0_rgba(0,0,0,0.12)] sm:text-4xl">
          محصولات
        </h1>
        <p class="mt-3 text-2xl font-medium tracking-[0.08em] text-black/70 [text-shadow:0_1px_0_rgba(255,255,255,0.35)] sm:text-3xl">
          Products
        </p>
      </div>
    </header>

    <div class="h-2 w-full bg-[#f89014]" />

    <section class="bg-[radial-gradient(circle_at_top,#f5f5f5_0%,#e3e3e3_48%,#d2d2d2_100%)] shadow-[inset_0_40px_80px_rgba(0,0,0,0.12)]">
      <div class="mx-auto max-w-6xl px-4 py-10">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-sm text-zinc-700">
              داده‌ها از صفحه محصولات سایت MBICO خوانده می‌شود.
            </p>
            <p v-if="!pending && !error" class="mt-2 text-xs text-zinc-600">
              نمایش {{ filteredItems.length }} محصول
            </p>
          </div>

          <div class="w-full sm:w-[360px]">
            <label class="sr-only" for="products-search">جستجو</label>
            <input
              id="products-search"
              v-model="search"
              type="search"
              placeholder="جستجو در محصولات…"
              class="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none ring-amber-500/20 placeholder:text-zinc-400 focus:ring-4"
            >
          </div>
        </div>

        <div v-if="error" class="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          دریافت محصولات با خطا مواجه شد. لطفاً دوباره تلاش کنید.
        </div>

        <div v-else class="mt-8">
          <div v-if="pending" class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            <div v-for="i in 8" :key="i" class="animate-pulse overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
              <div class="aspect-square bg-zinc-100" />
              <div class="p-4">
                <div class="h-4 w-3/4 rounded bg-zinc-100" />
                <div class="mt-3 h-3 w-2/5 rounded bg-zinc-100" />
              </div>
            </div>
          </div>

          <div v-else class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            <NuxtLink
              v-for="p in filteredItems"
              :key="p.href"
              class="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
              :to="productTo(p.slug)"
            >
              <div class="aspect-square w-full overflow-hidden bg-zinc-100">
                <NuxtImg :src="p.image" :alt="p.title" class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
              </div>
              <div class="p-4">
                <p class="text-sm font-semibold leading-7 text-zinc-900">
                  {{ p.title }}
                </p>
                <p v-if="p.price" class="mt-1 text-xs font-semibold text-amber-700">
                  {{ p.price }}
                </p>
                <p v-else class="mt-1 text-xs text-zinc-500">
                  مشاهده جزئیات
                </p>
              </div>
            </NuxtLink>
          </div>

          <div class="mt-10 flex items-center justify-center gap-3">
            <button
              type="button"
              class="rounded-full border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-800 shadow-sm hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="page <= 1 || pending"
              @click="page -= 1"
            >
              صفحه قبل
            </button>
            <span class="text-sm text-zinc-600">
              صفحه {{ page }}
            </span>
            <button
              type="button"
              class="rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="!hasNext || pending"
              @click="page += 1"
            >
              صفحه بعد
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
