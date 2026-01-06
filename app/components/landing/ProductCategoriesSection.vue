<script setup lang="ts">
const { t, localePath } = useTranslations()

const categories = computed(() => [
  {
    title: t('home.productCategories.items.ovens'),
    href: localePath('/categories'),
    image: 'https://mbico.ir/wp-content/uploads/2024/10/Oven-Group.webp'
  },
  {
    title: t('home.productCategories.items.equipment'),
    href: localePath('/categories'),
    image: 'https://mbico.ir/wp-content/uploads/2024/10/Equipment-Group.webp'
  },
  {
    title: t('home.productCategories.items.mobile'),
    href: localePath('/categories'),
    image: 'https://mbico.ir/wp-content/uploads/2024/10/Mobile-Group.webp'
  }
])
</script>

<template>
  <section class="py-10">
    <div class="mx-auto max-w-6xl px-4">
      <UiSectionHeading :title="t('home.productCategories.heading')" align="center" />

      <div class="mt-6 grid gap-5 md:grid-cols-3">
        <NuxtLink
          v-for="c in categories"
          :key="c.href"
          class="group relative overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5"
          :to="c.href"
        >
          <NuxtImg :src="c.image" :alt="c.title" class="h-52 w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition" />
          <div class="absolute inset-x-0 bottom-0 bg-white/55 backdrop-blur px-4 py-3 text-center">
            <h3 class="text-sm font-semibold text-zinc-900">
              {{ c.title }}
            </h3>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
