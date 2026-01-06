<script setup lang="ts">
type BlogPostDetail = {
  slug: string
  title: string
  image?: string
  description?: string
  contentHtml?: string
  author?: string
  publishedAt?: string
  categories?: BlogCategory[]
  href: string
}

type BlogCategory = {
  id: number
  name: string
  slug: string
}

const { t, locale, localePath, isRtl } = useTranslations()

const route = useRoute()
const slug = computed(() => String(route.params.slug ?? ''))

const { data, pending, error } = await useFetch<BlogPostDetail>(() => `/api/blog/${encodeURIComponent(slug.value)}`, {
  default: () => ({
    slug: slug.value,
    title: slug.value,
    href: ''
  })
})

const dateLocale = computed(() => (locale.value === 'ru' ? 'ru-RU' : locale.value === 'en' ? 'en-US' : 'fa-IR'))
const dateFormatter = computed(() => new Intl.DateTimeFormat(dateLocale.value, {
  day: '2-digit',
  month: 'long',
  year: 'numeric'
}))

const formattedDate = computed(() => {
  const value = data.value?.publishedAt
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return dateFormatter.value.format(date)
})

const metaLine = computed(() => {
  const dateLabel = formattedDate.value
  const author = data.value?.author?.trim()
  if (!dateLabel && !author) return ''
  const datePart = dateLabel ? t('blog.detail.metaDate', { date: dateLabel }) : ''
  const authorPart = author ? t('blog.detail.metaAuthor', { author }) : ''
  return [datePart, authorPart].filter(Boolean).join(' ')
})

useSeoMeta({
  title: computed(() => data.value?.title ? `${data.value.title} | ${t('seo.blogPost.titleFallback')}` : t('seo.blogPost.titleFallback')),
  description: computed(() => data.value?.description ?? t('seo.blogPost.descriptionFallback'))
})
</script>

<template>
  <div>
    <header class="bg-white">
      <div class="mx-auto max-w-5xl px-4 pb-8 pt-12 text-right">
        <div class="flex items-center justify-end">
          <NuxtLink :to="localePath('/blog')" class="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-zinc-700">
            <span>{{ t('blog.detail.back') }}</span>
            <span class="text-zinc-400">←</span>
          </NuxtLink>
        </div>
        <h1 class="mt-6 text-2xl font-black tracking-tight text-amber-600 sm:text-3xl lg:text-4xl">
          {{ data?.title }}
        </h1>
        <div class="mt-4 h-1 w-12 rounded-full bg-amber-500/80 ml-auto" />
        <p v-if="metaLine" class="mt-4 text-xs text-zinc-500">
          {{ metaLine }}
        </p>
        <div v-if="data?.categories?.length" class="mt-4 flex flex-wrap justify-end gap-2 text-xs text-zinc-500">
          <span
            v-for="cat in data.categories"
            :key="cat.id"
            class="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1"
          >
            {{ cat.name }}
          </span>
        </div>
      </div>
    </header>

    <section class="bg-white">
      <div class="mx-auto max-w-5xl px-4">
        <div class="overflow-hidden rounded-3xl bg-zinc-100 shadow-[0_12px_32px_rgba(0,0,0,0.08)] ring-1 ring-zinc-200/80">
          <div v-if="pending" class="aspect-[16/9] w-full animate-pulse bg-zinc-200/70" />
          <NuxtImg
            v-else-if="data?.image"
            :src="data.image"
            :alt="data.title"
            class="aspect-[16/9] w-full object-cover"
            sizes="(max-width: 768px) 100vw, 1000px"
          />
          <div v-else class="aspect-[16/9] w-full bg-zinc-100" />
        </div>
      </div>
    </section>

    <section class="bg-white">
      <div class="mx-auto max-w-3xl px-4 py-10">
        <div v-if="error" class="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          {{ t('blog.detail.error') }}
        </div>

        <div v-else>
          <p v-if="data?.description && !data?.contentHtml" class="text-sm leading-8 text-zinc-700">
            {{ data.description }}
          </p>
          <div v-if="data?.contentHtml" class="mt-8">
            <div class="ql-container ql-snow" :dir="isRtl ? 'rtl' : 'ltr'">
              <div class="ql-editor" v-html="data.contentHtml" />
            </div>
          </div>

          <div class="mt-10 flex justify-center">
            <NuxtLink
              class="rounded-full border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-800 shadow-sm hover:bg-zinc-50"
              :to="localePath('/blog')"
            >
              {{ t('blog.detail.backToBlog') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
:deep(.ql-container) {
  border: 0;
  font-family: inherit;
  background: transparent;
}

:deep(.ql-editor) {
  padding: 0;
  font-size: 0.95rem;
  line-height: 2;
  color: #3f3f46;
  text-align: justify;
  direction: inherit;
}

:deep(.ql-editor > *:first-child) {
  margin-top: 0;
}

:deep(.ql-editor p) {
  margin-top: 1rem;
  text-align: justify;
}

:deep(.ql-editor h2) {
  margin-top: 2rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: #18181b;
}

:deep(.ql-editor h3) {
  margin-top: 1.75rem;
  font-size: 1rem;
  font-weight: 600;
  color: #27272a;
}

:deep(.ql-editor a) {
  color: #d97706;
  font-weight: 600;
}

:deep(.ql-editor ul),
:deep(.ql-editor ol) {
  margin-top: 1rem;
  padding-right: 1.5rem;
}

:deep(.ql-editor ul) {
  list-style: disc;
}

:deep(.ql-editor ol) {
  list-style: decimal;
}

:deep(.ql-editor li) {
  margin-top: 0.5rem;
}

:deep(.ql-editor blockquote) {
  margin-top: 1.5rem;
  border-right: 3px solid #f59e0b;
  padding-right: 1rem;
  color: #52525b;
}

:deep(.ql-editor img) {
  margin: 1.5rem auto;
  width: 100%;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

:deep(.ql-editor .ql-align-center) {
  text-align: center;
}

:deep(.ql-editor .ql-align-right) {
  text-align: right;
}

:deep(.ql-editor .ql-align-left) {
  text-align: left;
}

:deep(.ql-editor .ql-align-justify) {
  text-align: justify;
}

:deep(.ql-editor .ql-direction-rtl) {
  direction: rtl;
}
</style>
