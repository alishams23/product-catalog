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

useSeoMeta({
  title: 'محصولات | MBICO',
  description: 'لیست محصولات صنایع پخت مشهد'
})

const banner = {
  src: 'https://mbico.ir/wp-content/uploads/2024/05/5839357829638526104.webp',
  alt: 'بنر محصولات صنایع پخت مشهد',
  href: 'https://mbico.ir/%D8%AF%D8%B3%D8%AA%DA%AF%D8%A7%D9%87-%D9%87%D8%A7%DB%8C-%D9%86%D8%A7%D9%86%D9%88%D8%A7%DB%8C%DB%8C/'
}

const headerCards = [
  {
    src: 'https://mbico.ir/wp-content/uploads/2024/05/Mobile-bread-baking-machines.webp',
    alt: 'معرفی ماشین آلات پخت سیار نان و غذا',
    href: 'https://mbico.ir/%D9%85%D8%A7%D8%B4%DB%8C%D9%86-%D8%A2%D9%84%D8%A7%D8%AA-%D9%BE%D8%AE%D8%AA-%D8%B3%DB%8C%D8%A7%D8%B1/'
  },
  {
    src: 'https://mbico.ir/wp-content/uploads/2025/08/bakingOvens.webp',
    alt: 'انواع فرهای پخت صنعتی',
    href: 'https://mbico.ir/%D9%81%D8%B1%D9%87%D8%A7%DB%8C-%D9%BE%D8%AE%D8%AA/'
  },
  {
    src: 'https://mbico.ir/wp-content/uploads/2024/05/Baking-equipment.webp',
    alt: 'تجهیزات پخت نان و شیرینی',
    href: 'https://mbico.ir/%D8%AA%D8%AC%D9%87%DB%8C%D8%B2%D8%A7%D8%AA-%D9%BE%D8%AE%D8%AA/'
  }
]

const preferredSectionOrder = [
  'فرهای پخت',
  'دستگاه های پخت نان',
  'دستگاه های اتوماتیک پخت نان',
  'تجهیزات آماده سازی خمیر و مواد اولیه',
  'تجهیزات فرم دهی خمیر و سیستم های تخمیر',
  'سیستم های خنک کننده',
  'تجهیزات جانبی'
]

const { data, pending, error } = await useFetch<ProductsResponse>('/api/products', {
  default: () => ({ page: 1, items: [], hasNext: false, sections: [] })
})

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
    <section class="bg-white pt-6 sm:pt-8">
      <div class="mx-auto max-w-[1220px] px-4">
        <div class="overflow-hidden rounded-[32px] shadow-[0_30px_80px_rgba(0,0,0,0.18)] ring-1 ring-black/5 sm:rounded-[56px]">
          <a :href="banner.href" target="_blank" rel="noopener" class="block">
            <NuxtImg
              :src="banner.src"
              :alt="banner.alt"
              class="h-full w-full object-cover"
              sizes="(max-width: 768px) 100vw, 1220px"
            />
          </a>
        </div>
      </div>
    </section>

    <section class="bg-white pb-2 pt-6">
      <div class="mx-auto max-w-[1220px] px-4">
        <div class="grid gap-4 sm:grid-cols-3">
          <a
            v-for="card in headerCards"
            :key="card.href"
            :href="card.href"
            target="_blank"
            rel="noopener"
            class="group overflow-hidden rounded-[26px] bg-[#f79a21] shadow-[0_18px_40px_rgba(248,144,20,0.3)]"
          >
            <NuxtImg
              :src="card.src"
              :alt="card.alt"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 380px"
            />
          </a>
        </div>
      </div>
    </section>

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
                <a
                  :href="p.href"
                  target="_blank"
                  rel="noopener"
                  class="flex aspect-square items-center justify-center overflow-hidden rounded-[20px]"
                >
                  <NuxtImg :src="p.image" :alt="p.title" class="h-full w-full object-contain transition duration-500 group-hover:scale-[1.04]" />
                </a>

                <div class="mt-4 flex flex-1 flex-col items-center text-center text-white">
                  <a :href="p.href" target="_blank" rel="noopener" class="text-sm font-semibold leading-7 text-white/90 hover:text-white">
                    {{ p.title }}
                  </a>
                  <p class="mt-2 text-sm font-semibold text-white">
                    {{ p.price || 'تماس بگیرید' }}
                  </p>

                  <a
                    v-if="p.cartHref || p.href"
                    :href="p.cartHref || p.href"
                    target="_blank"
                    rel="noopener"
                    class="mt-4 inline-flex items-center justify-center rounded-md bg-amber-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_10px_20px_rgba(248,144,20,0.35)] transition hover:bg-amber-600"
                  >
                    افزودن به سبد خرید
                  </a>
                </div>
              </article>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>
