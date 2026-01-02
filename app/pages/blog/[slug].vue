<script setup lang="ts">
type BlogPostDetail = {
  slug: string
  title: string
  image?: string
  description?: string
  contentHtml?: string
  author?: string
  publishedAt?: string
  href: string
}

const route = useRoute()
const slug = computed(() => String(route.params.slug ?? ''))

const { data, pending, error } = await useFetch<BlogPostDetail>(() => `/api/blog/${encodeURIComponent(slug.value)}`, {
  default: () => ({
    slug: slug.value,
    title: slug.value,
    href: ''
  })
})

const dateFormatter = new Intl.DateTimeFormat('fa-IR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric'
})

const formattedDate = computed(() => {
  const value = data.value?.publishedAt
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return dateFormatter.format(date)
})

const metaLine = computed(() => {
  const dateLabel = formattedDate.value
  const author = data.value?.author?.trim()
  if (!dateLabel && !author) return ''
  const datePart = dateLabel ? `نوشته شده در تاریخ ${dateLabel}` : ''
  const authorPart = author ? `توسط ${author}` : ''
  return [datePart, authorPart].filter(Boolean).join(' ')
})

useSeoMeta({
  title: computed(() => data.value?.title ? `${data.value.title} | وبلاگ` : 'وبلاگ'),
  description: computed(() => data.value?.description ?? 'مقاله')
})
</script>

<template>
  <div>
    <header class="bg-[linear-gradient(180deg,#c8a35f_0%,#b48a47_55%,#9a6c2d_100%)]">
      <div class="mx-auto max-w-6xl px-4 py-10">
        <NuxtLink to="/blog" class="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900/80 hover:text-zinc-900">
          <span>بازگشت</span>
          <span class="text-zinc-700">←</span>
        </NuxtLink>
        <h1 class="mt-4 text-2xl font-black tracking-tight text-zinc-900 sm:text-3xl">
          {{ data?.title }}
        </h1>
      </div>
    </header>

    <div class="h-2 w-full bg-[#f89014]" />

    <section class="bg-[radial-gradient(circle_at_top,#f5f5f5_0%,#e3e3e3_48%,#d2d2d2_100%)] shadow-[inset_0_40px_80px_rgba(0,0,0,0.12)]">
      <div class="mx-auto max-w-6xl px-4 py-10">
        <div v-if="error" class="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          دریافت مقاله با خطا مواجه شد.
        </div>

        <div v-else class="grid gap-8 lg:grid-cols-2">
          <div class="overflow-hidden rounded-3xl bg-white ring-1 ring-black/5">
            <div v-if="pending" class="aspect-square w-full animate-pulse bg-zinc-100" />
            <NuxtImg v-else-if="data?.image" :src="data.image" :alt="data.title" class="aspect-square w-full object-cover" />
            <div v-else class="aspect-square w-full bg-zinc-100" />
          </div>

          <div class="rounded-3xl bg-white p-6 ring-1 ring-black/5">
            <h2 class="text-sm font-black text-zinc-900">
              خلاصه
            </h2>
            <p class="mt-3 text-sm leading-8 text-zinc-700">
              {{ data?.description || 'برای مشاهده متن کامل، روی دکمه زیر کلیک کنید.' }}
            </p>

            <div class="mt-6 flex flex-wrap items-center gap-3">
              <a
                v-if="data?.href"
                class="rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-amber-600"
                :href="data.href"
                target="_blank"
                rel="noopener"
              >
                مشاهده متن کامل
              </a>
              <NuxtLink
                class="rounded-full border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-800 shadow-sm hover:bg-zinc-50"
                to="/blog"
              >
                بازگشت به وبلاگ
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
