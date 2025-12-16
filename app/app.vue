<script setup lang="ts">
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'fa',
    dir: 'rtl'
  }
})

const title = 'صنایع پخت مشهد | MBICO'
const description = 'بزرگترین سازنده دستگاه‌های نانوایی، قنادی و ماشین‌آلات پخت'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://mbico.ir/wp-content/uploads/2024/10/MBI-Short-Tizer296.png',
  twitterImage: 'https://mbico.ir/wp-content/uploads/2024/10/MBI-Short-Tizer296.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div class="min-h-dvh bg-white text-zinc-900">
    <SiteHeader />
    <main>
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
</template>
