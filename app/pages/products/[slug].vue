<script setup lang="ts">
type ContentBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'image'; src: string; alt?: string }
  | { type: 'video'; src: string }

type SpecModel = {
  name: string
  specs: Array<{ label: string; value: string }>
}

type NavItem = {
  id: string
  label: string
}

type FaqItem = {
  question: string
  answer: string
}

type ProductDetail = {
  slug: string
  title: string
  image?: string
  price?: string
  description?: string
  highlight?: string
  highlightHtml?: string
  summaryHtml?: string
  category?: string
  categoryHref?: string
  cartHref?: string
  heroImage?: string
  heroAlt?: string
  heroEnglish?: string
  heroTitle?: string
  heroTagline?: string
  heroCatalogHref?: string
  heroCatalogLabel?: string
  navItems?: NavItem[]
  moarefiBlocks?: ContentBlock[]
  moshakhasatBlocks?: ContentBlock[]
  videoBlocks?: ContentBlock[]
  specModels?: SpecModel[]
  specDownloadHref?: string
  videoGallery?: string[]
  faqItems?: FaqItem[]
  href: string
}

const route = useRoute()
const slug = computed(() => String(route.params.slug ?? ''))

const { data, pending, error } = await useFetch<ProductDetail>(() => `/api/products/${encodeURIComponent(slug.value)}`, {
  default: () => ({
    slug: slug.value,
    title: slug.value,
    href: ''
  }),
  watch: [slug]
})

const quantity = ref(1)

const cartLink = computed(() => {
  const base = data.value?.cartHref
  if (!base) return data.value?.href ?? ''
  const separator = base.includes('?') ? '&' : '?'
  return `${base}${separator}quantity=${quantity.value}`
})

const heroTitle = computed(() => data.value?.heroTitle || data.value?.title || slug.value)

const fallbackNav: NavItem[] = [
  { id: 'moarefi', label: 'معرفی محصول' },
  { id: 'moshakhasat', label: 'مشخصات فنی' },
  { id: 'video', label: 'ویدیو محصول' },
  { id: 'faq', label: 'سوالات متداول' },
  { id: 'price', label: 'قیمت محصول' }
]

const navItems = computed(() => data.value?.navItems?.length ? data.value.navItems : fallbackNav)

const videoSources = computed(() => {
  const sources = new Set<string>()
  for (const block of data.value?.videoBlocks ?? []) {
    if (block.type === 'video') sources.add(block.src)
  }
  for (const src of data.value?.videoGallery ?? []) {
    sources.add(src)
  }
  return Array.from(sources)
})

const videoIntroBlocks = computed(() =>
  (data.value?.videoBlocks ?? []).filter((block) => block.type !== 'video')
)

function sectionLabel(id: string, fallback: string) {
  return navItems.value.find((item) => item.id === id)?.label ?? fallback
}

function decreaseQuantity() {
  quantity.value = Math.max(1, quantity.value - 1)
}

function increaseQuantity() {
  quantity.value += 1
}

useSeoMeta({
  title: computed(() => data.value?.title ? `${data.value.title} | MBICO` : 'محصولات | MBICO'),
  description: computed(() => data.value?.description ?? data.value?.heroTagline ?? 'جزئیات محصول صنایع پخت مشهد')
})
</script>

<template>
  <div class="bg-white">
    <section class="relative isolate overflow-hidden bg-zinc-900">
      <NuxtImg
        v-if="data?.heroImage"
        :src="data.heroImage"
        :alt="data.heroAlt || data.title"
        class="absolute inset-0 h-full w-full object-cover"
        sizes="100vw"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
      <div class="relative mx-auto max-w-[1220px] px-4 py-16 sm:py-24">
        <div class="max-w-xl text-white">
          <p v-if="data?.heroEnglish" class="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
            {{ data.heroEnglish }}
          </p>
          <h1 class="mt-4 text-3xl font-black sm:text-4xl lg:text-5xl">
            {{ heroTitle }}
          </h1>
          <p v-if="data?.heroTagline" class="mt-4 text-base font-semibold text-white/90 sm:text-lg">
            {{ data.heroTagline }}
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <a
              href="#price"
              class="inline-flex items-center justify-center rounded-full bg-white px-6 py-2 text-sm font-semibold text-zinc-900 shadow transition hover:bg-zinc-100"
            >
              قیمت
            </a>
            <a
              v-if="data?.heroCatalogHref"
              :href="data.heroCatalogHref"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center justify-center rounded-full border border-white/70 px-6 py-2 text-sm font-semibold text-white transition hover:border-white"
            >
              {{ data.heroCatalogLabel || 'کاتالوگ' }}
            </a>
          </div>
        </div>
      </div>
      <div class="absolute inset-x-0 bottom-0">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none" class="h-16 w-full">
          <path
            d="M500 47.0297C184.4 47.0297 -26 100 -26 100H1026C1026 100 815.6 47.0297 500 47.0297ZM1026 -5.94059H-26V-7H1026V-5.94059Z"
            fill="#f89014"
          />
        </svg>
      </div>
    </section>

    <section v-if="navItems.length" class="bg-zinc-900">
      <div class="mx-auto max-w-[1220px] px-4 py-3">
        <div class="flex flex-wrap items-center justify-center gap-3">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            class="rounded-full border border-amber-500/60 px-4 py-1.5 text-xs font-semibold text-white/90 transition hover:border-amber-400 hover:text-white"
          >
            {{ item.label }}
          </a>
        </div>
      </div>
      <div class="h-1 bg-amber-500" />
    </section>

    <section class="relative bg-white">
      <div class="relative mx-auto max-w-[1220px] px-4 pb-12 pt-12">
        <nav class="text-xs uppercase text-zinc-500">
          <NuxtLink to="/" class="hover:text-zinc-700">
            خانه
          </NuxtLink>
          <span class="mx-2 text-zinc-400">/</span>
          <NuxtLink to="/products" class="hover:text-zinc-700">
            محصولات
          </NuxtLink>
          <span class="mx-2 text-zinc-400">/</span>
          <a
            v-if="data?.category && data?.categoryHref"
            :href="data.categoryHref"
            class="text-zinc-700 hover:text-amber-600"
            target="_blank"
            rel="noopener"
          >
            {{ data.category }}
          </a>
          <span v-else class="text-zinc-700">دسته بندی محصول</span>
        </nav>

        <div class="mt-8 grid gap-10 lg:grid-cols-12">
          <div class="lg:col-span-8">
            <h1 v-if="!data?.heroImage" class="text-2xl font-black text-zinc-900 sm:text-3xl">
              {{ heroTitle }}
            </h1>

            <div
              v-if="data?.summaryHtml"
              class="mt-4 text-justify text-sm leading-8 text-zinc-900/80 [&_a]:font-semibold [&_a]:text-amber-600 [&_a]:hover:text-amber-700"
              v-html="data.summaryHtml"
            />
            <p v-else-if="data?.description" class="mt-4 text-justify text-sm leading-8 text-zinc-900/80">
              {{ data.description }}
            </p>
            <p v-else class="mt-4 text-justify text-sm leading-8 text-zinc-500">
              توضیحات این محصول به زودی اضافه می‌شود.
            </p>

            <div v-if="data?.image" class="mt-8 flex justify-center">
              <div class="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.12)]">
                <NuxtImg
                  :src="data.image"
                  :alt="data.title"
                  class="w-full object-contain"
                  sizes="(max-width: 768px) 100vw, 520px"
                />
              </div>
            </div>
          </div>

          <div id="price" class="lg:col-span-4 scroll-mt-24">
            <div class="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
              <div
                v-if="data?.highlightHtml"
                class="text-justify text-sm font-semibold leading-7 text-amber-700"
                v-html="data.highlightHtml"
              />
              <p v-else-if="data?.highlight" class="text-justify text-sm font-semibold leading-7 text-amber-700">
                {{ data.highlight }}
              </p>

              <div class="mt-6 border-t border-zinc-200/80 pt-5">
                <p class="text-xs font-semibold text-zinc-500">قیمت محصول</p>
                <p class="mt-2 text-xl font-black text-zinc-900">
                  {{ data?.price || 'تماس بگیرید' }}
                </p>
              </div>

              <div class="mt-6 flex items-center justify-between">
                <span class="text-xs font-semibold text-zinc-500">تعداد</span>
                <div class="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-2 py-1">
                  <button
                    type="button"
                    class="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                    @click="decreaseQuantity"
                  >
                    -
                  </button>
                  <input
                    v-model.number="quantity"
                    type="number"
                    min="1"
                    class="w-12 border-0 bg-transparent text-center text-sm font-semibold text-zinc-800 focus:outline-none"
                  >
                  <button
                    type="button"
                    class="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                    @click="increaseQuantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <a
                v-if="data?.cartHref || data?.href"
                :href="cartLink"
                target="_blank"
                rel="noopener"
                class="mt-6 inline-flex w-full items-center justify-center rounded-md bg-amber-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(248,144,20,0.35)] transition hover:bg-amber-600"
              >
                افزودن به سبد خرید
              </a>

              <a
                v-if="data?.href"
                :href="data.href"
                target="_blank"
                rel="noopener"
                class="mt-3 inline-flex w-full items-center justify-center rounded-md border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-800 shadow-sm transition hover:bg-zinc-50"
              >
                مشاهده در سایت اصلی
              </a>
            </div>
          </div>
        </div>

        <div v-if="pending" class="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500">
          در حال دریافت اطلاعات محصول...
        </div>

        <div v-if="error" class="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          دریافت اطلاعات محصول با خطا مواجه شد. دوباره تلاش کنید.
        </div>
      </div>
    </section>

    <section v-if="data?.moarefiBlocks?.length" id="moarefi" class="scroll-mt-24 py-12">
      <div class="mx-auto max-w-[1220px] px-4">
        <div class="flex items-center gap-4">
          <div class="h-[2px] flex-1 bg-amber-500"></div>
          <h2 class="text-lg font-black text-amber-600">
            {{ sectionLabel('moarefi', 'معرفی محصول') }}
          </h2>
          <div class="h-[2px] flex-1 bg-amber-500"></div>
        </div>

        <div class="mt-8 space-y-6">
          <template v-for="(block, index) in data.moarefiBlocks" :key="`moarefi-${index}`">
            <h3 v-if="block.type === 'heading'" class="text-lg font-black text-amber-600">
              {{ block.text }}
            </h3>
            <p v-else-if="block.type === 'paragraph'" class="text-sm leading-8 text-zinc-800">
              {{ block.text }}
            </p>
            <ul v-else-if="block.type === 'list'" class="list-disc space-y-2 pr-5 text-sm text-zinc-800">
              <li v-for="(item, itemIndex) in block.items" :key="`moarefi-list-${itemIndex}`">
                {{ item }}
              </li>
            </ul>
            <div v-else-if="block.type === 'image'" class="overflow-hidden rounded-3xl bg-white shadow-[0_18px_50px_rgba(0,0,0,0.12)]">
              <NuxtImg
                :src="block.src"
                :alt="block.alt || heroTitle"
                class="h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, 900px"
              />
            </div>
            <div v-else-if="block.type === 'video'" class="overflow-hidden rounded-3xl bg-black shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
              <video class="h-full w-full" autoplay muted loop playsinline>
                <source :src="block.src" type="video/mp4">
              </video>
            </div>
          </template>
        </div>
      </div>
    </section>

    <section v-if="data?.moshakhasatBlocks?.length || data?.specModels?.length" id="moshakhasat" class="scroll-mt-24 py-12 bg-zinc-50/70">
      <div class="mx-auto max-w-[1220px] px-4">
        <div class="flex items-center gap-4">
          <div class="h-[2px] flex-1 bg-amber-500"></div>
          <h2 class="text-lg font-black text-amber-600">
            {{ sectionLabel('moshakhasat', 'مشخصات فنی') }}
          </h2>
          <div class="h-[2px] flex-1 bg-amber-500"></div>
        </div>

        <div v-if="data?.moshakhasatBlocks?.length" class="mt-8 space-y-6">
          <template v-for="(block, index) in data.moshakhasatBlocks" :key="`moshakhasat-${index}`">
            <h3 v-if="block.type === 'heading'" class="text-lg font-black text-amber-600">
              {{ block.text }}
            </h3>
            <p v-else-if="block.type === 'paragraph'" class="text-sm leading-8 text-zinc-800">
              {{ block.text }}
            </p>
            <ul v-else-if="block.type === 'list'" class="list-disc space-y-2 pr-5 text-sm text-zinc-800">
              <li v-for="(item, itemIndex) in block.items" :key="`moshakhasat-list-${itemIndex}`">
                {{ item }}
              </li>
            </ul>
            <div v-else-if="block.type === 'image'" class="overflow-hidden rounded-3xl bg-white shadow-[0_18px_50px_rgba(0,0,0,0.12)]">
              <NuxtImg
                :src="block.src"
                :alt="block.alt || heroTitle"
                class="h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, 900px"
              />
            </div>
          </template>
        </div>

        <div v-if="data?.specDownloadHref" class="mt-8 flex justify-center">
          <a
            :href="data.specDownloadHref"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-amber-600"
          >
            دانلود کاتالوگ
          </a>
        </div>

        <div v-if="data?.specModels?.length" class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="model in data.specModels"
            :key="model.name"
            class="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow"
          >
            <div class="bg-zinc-700 px-4 py-3 text-center text-sm font-semibold text-white">
              {{ model.name }}
            </div>
            <div class="divide-y divide-zinc-200/80">
              <div
                v-for="(spec, specIndex) in model.specs"
                :key="`${model.name}-${specIndex}`"
                class="flex items-start justify-between gap-4 px-4 py-3 text-xs"
              >
                <span v-if="spec.label" class="text-zinc-500">
                  {{ spec.label }}
                </span>
                <span class="font-semibold text-zinc-900">
                  {{ spec.value }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="videoSources.length || videoIntroBlocks.length" id="video" class="scroll-mt-24 py-12">
      <div class="mx-auto max-w-[1220px] px-4">
        <div class="flex items-center gap-4">
          <div class="h-[2px] flex-1 bg-amber-500"></div>
          <h2 class="text-lg font-black text-amber-600">
            {{ sectionLabel('video', 'ویدیو محصول') }}
          </h2>
          <div class="h-[2px] flex-1 bg-amber-500"></div>
        </div>

        <div v-if="videoIntroBlocks.length" class="mt-8 space-y-6">
          <template v-for="(block, index) in videoIntroBlocks" :key="`video-${index}`">
            <h3 v-if="block.type === 'heading'" class="text-lg font-black text-amber-600">
              {{ block.text }}
            </h3>
            <p v-else-if="block.type === 'paragraph'" class="text-sm leading-8 text-zinc-800">
              {{ block.text }}
            </p>
            <ul v-else-if="block.type === 'list'" class="list-disc space-y-2 pr-5 text-sm text-zinc-800">
              <li v-for="(item, itemIndex) in block.items" :key="`video-list-${itemIndex}`">
                {{ item }}
              </li>
            </ul>
            <div v-else-if="block.type === 'image'" class="overflow-hidden rounded-3xl bg-white shadow-[0_18px_50px_rgba(0,0,0,0.12)]">
              <NuxtImg
                :src="block.src"
                :alt="block.alt || heroTitle"
                class="h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, 900px"
              />
            </div>
          </template>
        </div>

        <div v-if="videoSources.length" class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="src in videoSources"
            :key="src"
            class="overflow-hidden rounded-3xl bg-black shadow-[0_18px_50px_rgba(0,0,0,0.2)]"
          >
            <video class="h-full w-full" controls>
              <source :src="src" type="video/mp4">
            </video>
          </div>
        </div>
      </div>
    </section>

    <section v-if="data?.faqItems?.length" id="faq" class="scroll-mt-24 py-12 bg-zinc-50/70">
      <div class="mx-auto max-w-[1220px] px-4">
        <div class="flex items-center gap-4">
          <div class="h-[2px] flex-1 bg-amber-500"></div>
          <h2 class="text-lg font-black text-amber-600">
            {{ sectionLabel('faq', 'سوالات متداول') }}
          </h2>
          <div class="h-[2px] flex-1 bg-amber-500"></div>
        </div>

        <div class="mt-8 space-y-4">
          <details
            v-for="item in data.faqItems"
            :key="item.question"
            class="group rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-sm"
          >
            <summary class="cursor-pointer text-sm font-semibold text-zinc-900">
              {{ item.question }}
            </summary>
            <p class="mt-3 text-sm leading-7 text-zinc-600">
              {{ item.answer }}
            </p>
          </details>
        </div>
      </div>
    </section>
  </div>
</template>
