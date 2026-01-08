<script setup lang="ts">
const { t } = useTranslations()

const items = computed(() => [
  { title: t('home.certificates.items.ce'), image: 'https://mbico.ir/wp-content/uploads/2024/10/CEStandard-280x280.webp', variant: 'icon' as const },
  { title: t('home.certificates.items.gost'), image: 'https://mbico.ir/wp-content/uploads/2024/10/GostStandard-280x280.webp', variant: 'icon' as const },
  { title: t('home.certificates.items.csa'), image: 'https://mbico.ir/wp-content/uploads/2024/10/CSAStandard-280x280.webp', variant: 'icon' as const },
  { title: t('home.certificates.items.eco'), image: 'https://mbico.ir/wp-content/uploads/2024/11/EcoEnergy.webp', variant: 'certificate' as const },
  { title: t('home.certificates.items.ul'), image: 'https://mbico.ir/wp-content/uploads/2024/10/ULStandard-280x280.webp', variant: 'icon' as const },
  { title: t('home.certificates.items.iso'), image: 'https://mbico.ir/wp-content/uploads/2024/10/ISOStandard-280x280.webp', variant: 'icon' as const },
  { title: t('home.certificates.items.iran'), image: 'https://mbico.ir/wp-content/uploads/2024/10/IranStandard-280x280.webp', variant: 'icon' as const }
])

const certificateItem = computed(() => items.value.find((item) => item.variant === 'certificate'))
const iconItems = computed(() => items.value.filter((item) => item.variant === 'icon'))
</script>

<template>
  <section class="py-12 bg-zinc-50/70">
    <div class="mx-auto w-full max-w-7xl px-4">
      <div class="relative overflow-hidden rounded-3xl bg-white px-6 py-10 text-center shadow-[0_18px_60px_rgba(15,23,42,0.12)] ring-1 ring-black/5 sm:px-10">
        <div class="absolute inset-x-0 top-0 h-1 bg-amber-500" />
        <h2 class="text-2xl font-black tracking-tight text-zinc-900 sm:text-3xl">
          {{ t('home.certificates.title') }}
        </h2>
        <p class="mt-3 text-sm font-semibold tracking-[0.16em] text-zinc-500 sm:text-base">
          {{ t('home.certificates.subtitle') }}
        </p>
        <div class="mx-auto mt-5 h-1 w-14 rounded-full bg-amber-500/80" />
      </div>

      <div class="mt-10 rounded-3xl bg-white/85 px-4 py-10 shadow-[0_24px_70px_rgba(0,0,0,0.08)] ring-1 ring-black/5 sm:px-10 sm:py-12">
        <p class="mx-auto max-w-4xl text-center text-sm leading-8 text-zinc-700 hidden sm:block">
          {{ t('home.certificates.description') }}
        </p>

        <div class="mt-10 sm:hidden">
          <div v-if="certificateItem" class="flex flex-col items-center text-center">
            <div class="w-full max-w-[320px] rounded-xl border border-zinc-200/80 bg-white p-2">
              <NuxtImg
                :src="certificateItem.image"
                :alt="certificateItem.title"
                class="h-[170px] w-full object-contain"
              />
            </div>
            <p class="mt-5 text-base font-black text-zinc-900">
              {{ certificateItem.title }}
            </p>
          </div>

          <div class="mt-8 grid grid-cols-3 gap-x-8 gap-y-10">
            <div v-for="item in iconItems" :key="item.title" class="flex flex-col items-center text-center">
              <div class="flex h-16 w-16 items-center justify-center">
                <NuxtImg
                  :src="item.image"
                  :alt="item.title"
                  class="h-full w-full object-contain opacity-80 grayscale"
                />
              </div>
              <p class="mt-3 text-xs font-semibold text-zinc-700">
                {{ item.title }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="mt-12 hidden grid-cols-2 items-end justify-items-center gap-x-10 gap-y-12 sm:grid sm:grid-cols-3 lg:grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.8fr)_repeat(3,minmax(0,1fr))] lg:gap-x-14"
        >
          <div
            v-for="item in items"
            :key="item.title"
            class="flex flex-col items-center justify-center text-center"
            :class="item.variant === 'certificate' ? 'col-span-2 sm:col-span-3 lg:col-span-1' : ''"
          >
            <div
              class="flex items-center justify-center"
              :class="item.variant === 'certificate' ? 'h-64 w-full sm:h-72 lg:h-40' : 'h-64 w-32 sm:h-72 lg:h-40'"
            >
              <NuxtImg
                :src="item.image"
                :alt="item.title"
                class="select-none object-contain flex justify-center items-center"
                :class="
                  item.variant === 'certificate'
                    ? 'h-full w-auto  max-w-60 rounded-lg '
                    : 'h-full w-32 max-w-30 opacity-80 grayscale'
                "
              />
            </div>

            <p
              class="mt-6 text-sm font-semibold text-zinc-900"
              :class="item.variant === 'certificate' ? 'text-lg font-black' : ''"
            >
              {{ item.title }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
