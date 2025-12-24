<script setup lang="ts">
useSeoMeta({
  title: 'وبلاگ',
  description: 'مقالات و اخبار'
})

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

function toBlogRoute(href: string): string {
  const slugEncoded = /https:\/\/mbico\.ir\/blog\/([^/?#]+)(?:\/|$)/.exec(href)?.[1]
  if (!slugEncoded) return '/blog'

  let slug = slugEncoded
  try {
    slug = decodeURIComponent(slugEncoded)
  } catch {
    slug = slugEncoded
  }

  return `/blog/${encodeURIComponent(slug)}`
}
</script>

<template>
  <div>
    <header class="bg-[linear-gradient(180deg,#c8a35f_0%,#b48a47_55%,#9a6c2d_100%)]">
      <div class="mx-auto max-w-6xl px-4 py-10 text-center">
        <h1 class="text-3xl font-black tracking-tight text-zinc-900 [text-shadow:0_2px_0_rgba(0,0,0,0.12)] sm:text-4xl">
          وبلاگ
        </h1>
      </div>
    </header>

    <div class="h-2 w-full bg-[#f89014]" />

    <section class="bg-[radial-gradient(circle_at_top,#f5f5f5_0%,#e3e3e3_48%,#d2d2d2_100%)] shadow-[inset_0_40px_80px_rgba(0,0,0,0.12)]">
      <div class="mx-auto max-w-6xl px-4 py-10">
        <div class="grid gap-5 md:grid-cols-2">
          <NuxtLink
            v-for="p in posts"
            :key="p.href"
            class="group flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md sm:flex-row"
            :to="toBlogRoute(p.href)"
          >
            <div class="relative sm:w-[52%]">
              <NuxtImg :src="p.image" :alt="p.title" class="h-48 w-full object-cover sm:h-full" />
              <div class="absolute top-3 right-3 rounded-xl border border-zinc-200 bg-white/95 px-3 py-2 text-center">
                <p class="text-sm font-bold text-zinc-900 leading-none">{{ p.day }}</p>
                <p class="mt-1 text-[0.65rem] text-zinc-600">{{ p.month }}</p>
              </div>
            </div>

            <div class="flex flex-1 flex-col justify-center p-5 text-right sm:w-[48%] sm:border-s sm:border-zinc-200 sm:p-6">
              <h3 class="text-sm font-semibold leading-7 text-zinc-900 group-hover:text-amber-700">
                {{ p.title }}
              </h3>
              <div class="mt-3 h-px w-16 bg-zinc-200" />
              <p class="mt-3 text-sm leading-7 text-zinc-600">
                {{ p.excerpt }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

