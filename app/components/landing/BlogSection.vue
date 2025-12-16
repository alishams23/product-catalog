<script setup lang="ts">
const intro = {
  title: 'جدیدترین اخبار و مقالات',
  text: 'همواره در جریان آخرین اخبار و رویدادهای مهم ما باشید. با ما به‌روز بمانید!',
  href: 'https://mbico.ir/blog/'
}

const posts = [
  {
    title: 'تکنیک طلایی رومال نان بربری برای نانی براق و خوش‌رنگ',
    href: 'https://mbico.ir/blog/%d8%b1%d9%88%d9%85%d8%a7%d9%84-%d9%86%d8%a7%d9%86-%d8%a8%d8%b1%d8%a8%d8%b1%db%8c/',
    image: 'https://mbico.ir/wp-content/uploads/2025/06/barbari-bread-napkin-768x400.webp',
    day: '۱۳',
    month: 'آبان',
    excerpt: 'رومال نان بربری مایعی است که قبل از قرار گرفتن نان در دستگاه پخت روی ...'
  },
  {
    title: 'حضور شرکت صنایع پخت مشهد در بیست و پنجمین نمایشگاه تخصصی صنایع غذایی',
    href: 'https://mbico.ir/blog/the-6th-mashhad-chocolate-sweets-exhibition/',
    image: 'https://mbico.ir/wp-content/uploads/2025/10/the-6th-mashhad-chocolate-sweets-exhibition-1-768x242.webp',
    day: '۲۹',
    month: 'مهر',
    excerpt: 'گزارشی از حضور و معرفی محصولات و ماشین‌آلات و تجهیزات وابسته در نمایشگاه ...'
  }
]
</script>

<template>
  <section class="py-10">
    <div class="mx-auto max-w-6xl px-4">
      <div class="grid gap-6 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <div class="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 class="text-[1rem] font-semibold text-zinc-900">
              {{ intro.title }}
            </h2>
            <div class="mt-3 h-px w-full bg-zinc-200" />
            <p class="mt-4 text-sm leading-8 text-zinc-600">
              {{ intro.text }}
            </p>
            <a
              class="mt-5 inline-flex rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-amber-600"
              :href="intro.href"
              target="_blank"
              rel="noopener"
            >
              وبلاگ ما
            </a>
          </div>
        </div>

        <div class="lg:col-span-8">
          <div class="grid gap-5 sm:grid-cols-2">
            <a
              v-for="p in posts"
              :key="p.href"
              class="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition"
              :href="p.href"
              target="_blank"
              rel="noopener"
            >
              <div class="relative">
                <NuxtImg :src="p.image" :alt="p.title" class="h-44 w-full object-cover" />
                <div class="absolute top-3 right-3 rounded-xl border border-zinc-200 bg-white/95 px-3 py-2 text-center">
                  <p class="text-sm font-bold text-zinc-900 leading-none">{{ p.day }}</p>
                  <p class="mt-1 text-[0.65rem] text-zinc-600">{{ p.month }}</p>
                </div>
              </div>

              <div class="p-5 text-right">
                <h3 class="text-sm font-semibold leading-7 text-zinc-900 group-hover:text-amber-700">
                  {{ p.title }}
                </h3>
                <div class="mt-3 h-px w-16 bg-zinc-200" />
                <p class="mt-3 text-sm leading-7 text-zinc-600">
                  {{ p.excerpt }}
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

