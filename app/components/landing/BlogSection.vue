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

const intro = {
  title: '???????? ????? ? ??????',
  text: '?????? ?? ????? ????? ????? ? ????????? ??? ?? ?????. ?? ?? ?????? ??????!',
  href: '/blog'
}

const { data, pending, error } = await useFetch<BlogListItem[]>('/api/blogs', {
  default: () => []
})

const dateFormatter = new Intl.DateTimeFormat('fa-IR', { day: '2-digit', month: 'long' })

function formatDateParts(value?: string | null) {
  if (!value) return { day: '', month: '' }
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return { day: '', month: '' }
  const parts = dateFormatter.formatToParts(date)
  return {
    day: parts.find((part) => part.type === 'day')?.value ?? '',
    month: parts.find((part) => part.type === 'month')?.value ?? ''
  }
}

function toBlogRoute(slug: string): string {
  const safeSlug = slug ? encodeURIComponent(slug) : ''
  return safeSlug ? `/blog/${safeSlug}` : '/blog'
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
  <section class="py-10">
    <div class="mx-auto max-w-6xl px-4">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <UiSectionHeading :title="intro.title" :subtitle="intro.text" align="right" />
        <NuxtLink class="inline-flex h-11 items-center justify-center rounded-lg bg-amber-500 px-6 text-sm font-semibold text-white shadow hover:bg-amber-600" :to="intro.href">
          ????? ??
        </NuxtLink>
      </div>

      <div class="mt-6">
        <div v-if="error" class="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          ?????? ?????? ????? ?? ??? ????? ??.
        </div>
        <div v-else-if="pending" class="grid gap-5 md:grid-cols-2">
          <div v-for="i in 2" :key="i" class="flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm sm:flex-row">
            <div class="h-48 w-full animate-pulse bg-zinc-100 sm:h-auto sm:w-[52%]" />
            <div class="flex flex-1 flex-col justify-center p-5 sm:w-[48%] sm:border-s sm:border-zinc-200 sm:p-6">
              <div class="h-4 w-2/3 rounded bg-zinc-200" />
              <div class="mt-3 h-3 w-24 rounded bg-zinc-200" />
              <div class="mt-3 h-3 w-full rounded bg-zinc-200" />
            </div>
          </div>
        </div>
        <div v-else-if="posts.length === 0" class="text-center text-sm text-zinc-600">
          ????? ???? ????? ???? ?????.
        </div>
        <div v-else class="grid gap-5 md:grid-cols-2">
          <NuxtLink
            v-for="p in posts"
            :key="p.id"
            class="group flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md sm:flex-row"
            :to="toBlogRoute(p.slug)"
          >
            <div class="relative sm:w-[52%]">
              <NuxtImg v-if="p.image" :src="p.image" :alt="p.title" class="h-48 w-full object-cover sm:h-full" />
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
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
