<script setup lang="ts">
type BlogCategory = {
  id: number
  name: string
  slug: string
}

type BlogListItem = {
  id: number
  title: string
  slug: string
  excerpt?: string
  image?: string | null
  categories?: BlogCategory[]
  published_at?: string | null
}

const { t, locale, localePath } = useTranslations()

useSeoMeta({
  title: computed(() => t('seo.blog.title')),
  description: computed(() => t('seo.blog.description'))
})

const { data, pending, error } = await useFetch<BlogListItem[]>('/api/blogs', {
  default: () => []
})

const dateLocale = computed(() => (locale.value === 'ru' ? 'ru-RU' : locale.value === 'en' ? 'en-US' : 'fa-IR'))
const dateFormatter = computed(() => new Intl.DateTimeFormat(dateLocale.value, { day: '2-digit', month: 'long' }))

function formatDateParts(value?: string | null) {
  if (!value) return { day: '', month: '' }
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return { day: '', month: '' }
  const parts = dateFormatter.value.formatToParts(date)
  return {
    day: parts.find((part) => part.type === 'day')?.value ?? '',
    month: parts.find((part) => part.type === 'month')?.value ?? ''
  }
}

function toBlogRoute(slug: string): string {
  const safeSlug = slug ? encodeURIComponent(slug) : ''
  return safeSlug ? localePath(`/blog/${safeSlug}`) : localePath('/blog')
}

const posts = computed(() =>
  (data.value ?? []).map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    image: post.image ?? '',
    categories: post.categories ?? [],
    ...formatDateParts(post.published_at)
  }))
)
</script>

<template>
  <div>
    <header class="relative overflow-hidden bg-[#f3f4f4]">
      <div class="absolute inset-0">
        <NuxtImg
          src="/images/mbico-blog-hero.webp"
          alt=""
          aria-hidden="true"
          class="h-full w-full object-cover object-[35%_center]"
        />
      </div>
      <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.55)_48%,rgba(255,255,255,0.95)_100%)]" />
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_55%)]" />
      <div class="relative mx-auto max-w-6xl px-4 py-[9.6rem] sm:py-[14.4rem] lg:py-[16.8rem]">
        <div class="max-w-xl text-right">
          <p class="text-xs font-semibold tracking-[0.35em] text-zinc-600">
            {{ t('blog.list.heroLabel') }}
          </p>
          <h1 class="mt-4 text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
            {{ t('blog.list.heroTitle') }}
          </h1>
          <p class="mt-4 text-sm leading-7 text-zinc-700 sm:text-base">
            {{ t('blog.list.heroSubtitle') }}
          </p>
        </div>
      </div>
    </header>

    <section class="bg-white">
      <div class="mx-auto max-w-4xl px-4 py-12 text-center sm:py-16">
        <h2 class="text-2xl font-black text-zinc-800 sm:text-3xl">
          {{ t('blog.list.introTitle') }}
        </h2>
        <p class="mt-5 text-sm leading-8 text-zinc-600 sm:text-base">
          {{ t('blog.list.introParagraph1') }}
        </p>
        <p class="mt-4 text-sm leading-8 text-zinc-600 sm:text-base">
          {{ t('blog.list.introParagraph2') }}
        </p>
        <p class="mt-6 text-base font-semibold text-emerald-700">
          {{ t('blog.list.introNote') }}
        </p>
      </div>
    </section>

    <section class="bg-white">
      <div class="mx-auto max-w-6xl px-4 py-10">
        <div class="mb-8 flex items-center gap-4">
          <div class="h-px flex-1 bg-zinc-200" />
          <h3 class="text-lg font-semibold text-zinc-800">{{ t('blog.list.relatedTitle') }}</h3>
          <div class="h-px flex-1 bg-zinc-200" />
        </div>
        <div v-if="error" class="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          {{ t('blog.list.error') }}
        </div>

        <div v-else>
          <div v-if="pending" class="grid gap-5 md:grid-cols-2">
            <div v-for="i in 4" :key="i" class="flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm sm:flex-row">
              <div class="h-48 w-full animate-pulse bg-zinc-100 sm:h-auto sm:w-[52%]" />
              <div class="flex flex-1 flex-col justify-center p-5 sm:w-[48%] sm:border-s sm:border-zinc-200 sm:p-6">
                <div class="h-4 w-2/3 rounded bg-zinc-200" />
                <div class="mt-3 h-3 w-24 rounded bg-zinc-200" />
                <div class="mt-3 h-3 w-full rounded bg-zinc-200" />
                <div class="mt-2 h-3 w-5/6 rounded bg-zinc-200" />
              </div>
            </div>
          </div>

          <div v-else-if="posts.length === 0" class="text-center text-sm text-zinc-600">
            {{ t('blog.list.empty') }}
          </div>

          <div v-else class="grid gap-5 md:grid-cols-2">
            <NuxtLink
              v-for="p in posts"
              :key="p.id"
              class="group flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md sm:flex-row"
              :to="toBlogRoute(p.slug)"
            >
              <div class="relative sm:w-[52%]">
                <NuxtImg
                  v-if="p.image"
                  :src="p.image"
                  :alt="p.title"
                  class="h-48 w-full object-cover sm:h-full"
                />
                <div v-else class="h-48 w-full bg-zinc-100 sm:h-full" />
                <div
                  v-if="p.day || p.month"
                  class="absolute top-3 right-3 rounded-xl border border-zinc-200 bg-white/95 px-3 py-2 text-center"
                >
                  <p class="text-sm font-bold text-zinc-900 leading-none">{{ p.day }}</p>
                  <p class="mt-1 text-[0.65rem] text-zinc-600">{{ p.month }}</p>
                </div>
              </div>

              <div class="flex flex-1 flex-col justify-center p-5 text-right sm:w-[48%] sm:border-s sm:border-zinc-200 sm:p-6">
                <h3 class="text-sm font-semibold leading-7 text-zinc-900 group-hover:text-amber-700">
                  {{ p.title }}
                </h3>
                <div class="mt-3 h-px w-16 bg-zinc-200" />
                <p v-if="p.excerpt" class="mt-3 text-sm leading-7 text-zinc-600">
                  {{ p.excerpt }}
                </p>
                <div v-if="p.categories.length" class="mt-4 flex flex-wrap gap-2 text-xs text-zinc-500">
                  <span
                    v-for="cat in p.categories"
                    :key="cat.id"
                    class="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-1"
                  >
                    {{ cat.name }}
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
