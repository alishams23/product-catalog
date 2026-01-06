<script setup lang="ts">
const { t, localePath } = useTranslations()

const categories = computed(() => [
  {
    title: t('home.ovenCategories.items.bakery'),
    href: localePath('/categories'),
    image: 'https://mbico.ir/wp-content/uploads/2024/11/ovens-bakery.webp',
    count: t('home.ovenCategories.counts.bakery')
  },
  {
    title: t('home.ovenCategories.items.lavash'),
    href: localePath('/categories'),
    image: 'https://mbico.ir/wp-content/uploads/2024/05/lavashovens-247x247.webp',
    count: t('home.ovenCategories.counts.lavash')
  },
  {
    title: t('home.ovenCategories.items.barbari'),
    href: localePath('/categories'),
    image: 'https://mbico.ir/wp-content/uploads/2024/05/barbari-ovens-247x247.webp',
    count: t('home.ovenCategories.counts.barbari')
  },
  {
    title: t('home.ovenCategories.items.taftoon'),
    href: localePath('/categories'),
    image: 'https://mbico.ir/wp-content/uploads/2024/05/taftoon-ovens-247x247.webp',
    count: t('home.ovenCategories.counts.taftoon')
  },
  {
    title: t('home.ovenCategories.items.sangak'),
    href: localePath('/categories'),
    image: 'https://mbico.ir/wp-content/uploads/2024/05/sagakovens-1-247x247.webp',
    count: t('home.ovenCategories.counts.sangak')
  }
])
</script>

<template>
  <section class="py-10">
    <div class="mx-auto max-w-6xl px-4">
      <UiSectionHeading :title="t('home.ovenCategories.heading')" align="center" />

      <div class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <NuxtLink
          v-for="c in categories"
          :key="c.href"
          class="group rounded-2xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden hover:shadow-md transition"
          :to="c.href"
        >
          <div class="aspect-square w-full overflow-hidden bg-zinc-100">
            <NuxtImg :src="c.image" :alt="c.title" class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
          </div>
          <div class="bg-white/85 px-3 py-3 text-center">
            <p class="text-sm font-semibold text-zinc-900">
              {{ c.title }}
            </p>
            <p class="mt-1 text-xs text-zinc-500">
              {{ c.count }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
