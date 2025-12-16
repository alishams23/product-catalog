<script setup lang="ts">
const categories = [
  {
    title: 'دستگاه نانوایی',
    href: 'https://mbico.ir/%d8%af%d8%b3%d8%aa%da%af%d8%a7%d9%87-%d9%87%d8%a7%db%8c-%d9%86%d8%a7%d9%86%d9%88%d8%a7%db%8c%db%8c/',
    image: 'https://mbico.ir/wp-content/uploads/2024/11/ovens-bakery.webp',
    count: '۹ محصول'
  },
  {
    title: 'دستگاه لواش',
    href: 'https://mbico.ir/%d8%af%d8%b3%d8%aa%da%af%d8%a7%d9%87-%d9%84%d9%88%d8%a7%d8%b4/',
    image: 'https://mbico.ir/wp-content/uploads/2024/05/lavashovens-247x247.webp',
    count: '۷ محصول'
  },
  {
    title: 'دستگاه بربری',
    href: 'https://mbico.ir/%d8%af%d8%b3%d8%aa%da%af%d8%a7%d9%87-%d8%a8%d8%b1%d8%a8%d8%b1%db%8c/',
    image: 'https://mbico.ir/wp-content/uploads/2024/05/barbari-ovens-247x247.webp',
    count: '۶ محصول'
  },
  {
    title: 'دستگاه تافتون',
    href: 'https://mbico.ir/%d8%af%d8%b3%d8%aa%da%af%d8%a7%d9%87-%d8%aa%d8%a7%d9%81%d8%aa%d9%88%d9%86/',
    image: 'https://mbico.ir/wp-content/uploads/2024/05/taftoon-ovens-247x247.webp',
    count: '۶ محصول'
  },
  {
    title: 'دستگاه سنگک',
    href: 'https://mbico.ir/%d8%af%d8%b3%d8%aa%da%af%d8%a7%d9%87-%d8%b3%d9%86%da%af%da%a9/',
    image: 'https://mbico.ir/wp-content/uploads/2024/05/sagakovens-1-247x247.webp',
    count: '۹ محصول'
  }
]
</script>

<template>
  <section class="py-10">
    <div class="mx-auto max-w-6xl px-4">
      <UiSectionHeading title="دسته بندی فرهای پخت" align="center" />

      <div class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <a
          v-for="c in categories"
          :key="c.href"
          class="group rounded-2xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden hover:shadow-md transition"
          :href="c.href"
          target="_blank"
          rel="noopener"
        >
          <div class="aspect-square w-full overflow-hidden bg-zinc-100">
            <NuxtImg :src="c.image" :alt="c.title" class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
          </div>
          <div class="bg-white/85 px-3 py-3 text-center">
            <p class="text-sm font-semibold text-zinc-900">
              {{ c.title }}
            </p>
            <p class="mt-1 text-xs text-zinc-500">
              {{ c.count }}
            </p>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
