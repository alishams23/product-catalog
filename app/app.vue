<script setup lang="ts">
const { t, locale, dir } = useTranslations()

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: locale,
    dir
  }
})

const title = computed(() => t('seo.site.title'))
const description = computed(() => t('seo.site.description'))
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
