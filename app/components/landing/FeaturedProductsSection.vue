<script setup lang="ts">
const products = [
  {
    title: 'دستگاه نانوایی دوار پرتابل',
    href: 'https://mbico.ir/products/%d8%af%d8%b3%d8%aa%da%af%d8%a7%d9%87-%d9%86%d8%a7%d9%86%d9%88%d8%a7%db%8c%db%8c-%d8%af%d9%88%d8%a7%d8%b1-%d9%be%d8%b1%d8%aa%d8%a7%d8%a8%d9%84/',
    image: 'https://mbico.ir/wp-content/uploads/2023/11/Portable-Oven-280x280.webp'
  },
  {
    title: 'دستگاه نانوایی سنگک اتومات پرتابل',
    href: 'https://mbico.ir/products/%d8%af%d8%b3%d8%aa%da%af%d8%a7%d9%87-%d9%86%d8%a7%d9%86%d9%88%d8%a7%db%8c%db%8c-%d8%b3%d9%86%da%af%da%a9-%d8%a7%d8%aa%d9%88%d9%85%d8%a7%d8%aa-%d9%be%d8%b1%d8%aa%d8%a7%d8%a8%d9%84/',
    image: 'https://mbico.ir/wp-content/uploads/2023/11/Sangak-Oven-Auto-280x280.webp'
  },
  {
    title: 'دستگاه نانوایی تونلی',
    href: 'https://mbico.ir/products/%d8%af%d8%b3%d8%aa%da%af%d8%a7%d9%87-%d9%86%d8%a7%d9%86%d9%88%d8%a7%db%8c%db%8c-%d8%aa%d9%88%d9%86%d9%84%db%8c/',
    image: 'https://mbico.ir/wp-content/uploads/2023/11/Tunnel-Oven-280x280.webp'
  },
  {
    title: 'فر گردان قنادی و فانتزی',
    href: 'https://mbico.ir/products/%d9%81%d8%b1-%da%af%d8%b1%d8%af%d8%a7%d9%86-%d9%82%d9%86%d8%a7%d8%af%db%8c/',
    image: 'https://mbico.ir/wp-content/uploads/2023/11/Rotary-Pastry-Oven-280x280.webp'
  }
]
</script>

<template>
  <section class="py-10">
    <div class="mx-auto max-w-6xl px-4">
      <UiSectionHeading title="محصولات منتخب؛ راهکاری حرفه‌ای برای نیازهای شما" align="center" />

      <div class="mt-6 rounded-[28px] bg-zinc-100 p-5 sm:p-6">
        <div class="flex gap-4 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
          <a
            v-for="p in products"
            :key="p.href"
            class="min-w-55 max-w-55 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 hover:shadow-md transition"
            :href="p.href"
            target="_blank"
            rel="noopener"
          >
            <div class="p-4">
              <div class="overflow-hidden rounded-[18%] bg-zinc-50">
                <NuxtImg :src="p.image" :alt="p.title" class="h-44 w-full object-cover" />
              </div>
            </div>
            <div class="bg-[#2a2a2b] px-4 py-4 text-center">
              <p class="text-sm font-semibold text-white leading-6">
                {{ p.title }}
              </p>
              <div class="mt-3">
                <span class="inline-flex rounded-full bg-amber-500 px-4 py-2 text-xs font-semibold text-white">
                  افزودن به سبد خرید
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
