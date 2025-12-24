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
const siteUrl = useRequestURL().origin
const defaultOgImage = `${siteUrl}/images/Mbico-Hompageww.webp`

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: siteUrl,
  ogImage: defaultOgImage,
  twitterImage: defaultOgImage,
  twitterCard: 'summary_large_image'
})

const route = useRoute()
const mainOffsetClass = computed(() => (route.path === '/' ? '' : 'pt-16'))
</script>

<template>
  <div class="min-h-dvh bg-white text-zinc-900">
    <SiteHeader />
    <main :class="mainOffsetClass">
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
</template>
