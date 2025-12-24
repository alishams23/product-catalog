<script setup lang="ts">
type ProductDetail = {
  slug: string
  title: string
  image?: string
  price?: string
  description?: string
  href: string
}

const route = useRoute()
const slug = computed(() => String(route.params.slug ?? ''))

const { data, pending, error } = await useFetch<ProductDetail>(() => `/api/products/${encodeURIComponent(slug.value)}`, {
  default: () => ({
    slug: slug.value,
    title: slug.value,
    href: ''
  })
})

useSeoMeta({
  title: computed(() => data.value?.title ? `${data.value.title} | MBICO` : 'محصول | MBICO'),
  description: computed(() => data.value?.description ?? 'جزئیات محصول')
})
</script>

<template>
  <div>
    <header class="bg-[linear-gradient(180deg,#c8a35f_0%,#b48a47_55%,#9a6c2d_100%)]">
      <div class="mx-auto max-w-6xl px-4 py-10">
        <NuxtLink to="/products" class="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900/80 hover:text-zinc-900">
          <span>بازگشت</span>
          <span class="text-zinc-700">←</span>
        </NuxtLink>
        <h1 class="mt-4 text-2xl font-black tracking-tight text-zinc-900 sm:text-3xl">
          {{ data?.title }}
        </h1>
        <p v-if="data?.price" class="mt-2 text-sm font-semibold text-amber-800">
          {{ data.price }}
        </p>
      </div>
    </header>

    <div class="h-2 w-full bg-[#f89014]" />

    <section class="bg-[radial-gradient(circle_at_top,#f5f5f5_0%,#e3e3e3_48%,#d2d2d2_100%)] shadow-[inset_0_40px_80px_rgba(0,0,0,0.12)]">
      <div class="mx-auto max-w-6xl px-4 py-10">
        <div v-if="error" class="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          دریافت اطلاعات محصول با خطا مواجه شد.
        </div>

        <div v-else class="grid gap-8 lg:grid-cols-2">
          <div class="overflow-hidden rounded-3xl bg-white ring-1 ring-black/5">
            <div v-if="pending" class="aspect-square w-full animate-pulse bg-zinc-100" />
            <NuxtImg v-else-if="data?.image" :src="data.image" :alt="data.title" class="aspect-square w-full object-cover" />
            <div v-else class="aspect-square w-full bg-zinc-100" />
          </div>

          <div class="rounded-3xl bg-white p-6 ring-1 ring-black/5">
            <h2 class="text-sm font-black text-zinc-900">
              توضیحات
            </h2>
            <p class="mt-3 text-sm leading-8 text-zinc-700">
              {{ data?.description || 'برای مشاهده اطلاعات کامل، به صفحه اصلی محصول مراجعه کنید.' }}
            </p>

            <div class="mt-6 flex flex-wrap items-center gap-3">
              <a
                v-if="data?.href"
                class="rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-amber-600"
                :href="data.href"
                target="_blank"
                rel="noopener"
              >
                مشاهده در سایت اصلی
              </a>
              <NuxtLink
                class="rounded-full border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-800 shadow-sm hover:bg-zinc-50"
                to="/products"
              >
                مشاهده سایر محصولات
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

