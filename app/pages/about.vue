<script setup lang="ts">
const { t, localePath, isRtl } = useTranslations()

useSeoMeta({
  title: computed(() => t('seo.about.title')),
  description: computed(() => t('seo.about.description'))
})

const heroImage = 'https://mbico.ir/wp-content/uploads/2025/01/about-Mbico.webp'
const policyImage = 'https://mbico.ir/wp-content/uploads/2024/07/about-us5-1.jpg'

const navItems = computed(() => [
  { id: 'company', label: t('pages.about.nav.company') },
  { id: 'history', label: t('pages.about.nav.history') },
  { id: 'honors', label: t('pages.about.nav.honors') },
  { id: 'gallery', label: t('pages.about.nav.gallery') }
])

const introParagraphs = computed(() => ([
  t('pages.about.intro.paragraph1'),
  t('pages.about.intro.paragraph2'),
  t('pages.about.intro.paragraph3'),
  t('pages.about.intro.paragraph4'),
  t('pages.about.intro.paragraph5')
]))

const featureSections = computed(() => ([
  {
    id: 'people',
    title: t('pages.about.features.people.title'),
    body: t('pages.about.features.people.body'),
    image: 'https://mbico.ir/wp-content/uploads/2024/07/449-340.jpg',
    alt: t('pages.about.features.people.imageAlt'),
    reverse: false
  },
  {
    id: 'space',
    title: t('pages.about.features.space.title'),
    body: t('pages.about.features.space.body'),
    image: 'https://mbico.ir/wp-content/uploads/2024/07/about-us3.jpg',
    alt: t('pages.about.features.space.imageAlt'),
    reverse: true
  },
  {
    id: 'tech',
    title: t('pages.about.features.tech.title'),
    body: t('pages.about.features.tech.body'),
    image: 'https://mbico.ir/wp-content/uploads/2024/07/about-us4.jpg',
    alt: t('pages.about.features.tech.imageAlt'),
    reverse: false
  }
]))

const policyLeaders = computed(() => ([
  {
    name: t('pages.about.policy.leaders.ceo.name'),
    role: t('pages.about.policy.leaders.ceo.role')
  },
  {
    name: t('pages.about.policy.leaders.plant.name'),
    role: t('pages.about.policy.leaders.plant.role')
  },
  {
    name: t('pages.about.policy.leaders.rnd.name'),
    role: t('pages.about.policy.leaders.rnd.role')
  }
]))

const bodyAlignWide = computed(() => (isRtl.value ? 'lg:text-right' : 'lg:text-left'))
</script>

<template>
  <div class="bg-white">
    <section class="relative">
      <div class="relative h-[220px] sm:h-[280px] lg:h-[600px]">
        <NuxtImg
          :src="heroImage"
          :alt="t('pages.about.heroAlt')"
          class="h-full w-full object-cover object-[0_0]"
        />
      </div>
    </section>

    <section class="relative -mt-6 sm:-mt-10 lg:-mt-12">
      <div class="mx-auto max-w-4xl px-4">
        <div class="rounded-full border-x-4 border-y-2 border-amber-400 bg-white/95 shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
          <nav class="grid grid-cols-4 text-center text-[11px] font-semibold leading-none text-zinc-900 sm:text-sm">
            <a
              v-for="item in navItems"
              :key="item.id"
              :href="`#${item.id}`"
              class="px-2 py-3 transition hover:text-amber-600 sm:py-4"
            >
              {{ item.label }}
            </a>
          </nav>
        </div>
      </div>
    </section>

    <section id="company" class="scroll-mt-28">
      <div class="mx-auto max-w-5xl px-4 pb-8 pt-10 lg:pt-14">
        <div class="space-y-3">
          <h1 class="text-base font-semibold text-zinc-900 sm:text-lg">
            {{ t('pages.about.intro.title') }}
          </h1>
          <div class="h-[2px] w-16 bg-amber-400" />
        </div>
        <div class="mt-6 space-y-6 text-sm leading-8 text-zinc-800 text-justify">
          <p v-for="(paragraph, index) in introParagraphs" :key="index">
            {{ paragraph }}
          </p>
        </div>
      </div>
    </section>

    <section id="history" class="scroll-mt-28 bg-[#273647] py-10 sm:py-12">
      <div class="mx-auto max-w-6xl px-4">
        <div class="rounded-2xl bg-white p-6 shadow-[0_18px_40px_rgba(0,0,0,0.2)] sm:p-10">
          <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <p class="text-center text-base leading-8 text-zinc-800 sm:text-lg" :class="bodyAlignWide">
              {{ t('pages.about.highlight.body') }}
            </p>
            <NuxtLink
              :to="localePath('/products')"
              class="inline-flex items-center justify-center rounded-lg border-2 border-amber-400 px-6 py-2 text-sm font-semibold text-amber-600 transition hover:bg-amber-500 hover:text-white"
            >
              {{ t('pages.about.highlight.cta') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section id="honors" class="scroll-mt-28">
      <div class="mx-auto max-w-6xl px-4 py-12">
        <div class="space-y-14">
          <div v-for="section in featureSections" :key="section.id" class="grid items-center gap-8 md:grid-cols-2">
            <div :class="section.reverse ? 'md:order-2' : ''">
              <div class="space-y-3">
                <h2 class="text-base font-semibold text-zinc-900 sm:text-lg">
                  {{ section.title }}
                </h2>
                <div class="h-[2px] w-16 bg-amber-400" />
              </div>
              <p class="mt-5 text-sm leading-8 text-zinc-800 text-justify">
                {{ section.body }}
              </p>
            </div>
            <div :class="section.reverse ? 'md:order-1' : ''" class="flex justify-center">
              <NuxtImg
                :src="section.image"
                :alt="section.alt"
                class="w-full max-w-md rounded-2xl object-cover shadow-[0_18px_40px_rgba(0,0,0,0.18)] md:max-w-none md:w-11/12"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="gallery" class="scroll-mt-28">
      <div class="relative hidden md:block">
        <NuxtImg
          :src="policyImage"
          :alt="t('pages.about.policy.title')"
          class="h-[520px] w-full object-cover"
        />
        <div class="absolute inset-0 bg-black/40" />
        <div class="absolute inset-0 flex items-start justify-center px-4 py-10">
          <div class="w-full max-w-4xl rounded-2xl bg-white/85 p-8 text-zinc-900 shadow-[0_25px_60px_rgba(0,0,0,0.35)] backdrop-blur">
            <div class="space-y-3">
              <h2 class="text-lg font-semibold">
                {{ t('pages.about.policy.title') }}
              </h2>
              <div class="h-[2px] w-16 bg-amber-400" />
            </div>
            <p class="mt-5 text-sm leading-7 text-justify">
              {{ t('pages.about.policy.body') }}
            </p>
            <div class="mt-8 grid grid-cols-3 gap-4 border-t border-amber-300 pt-6 text-center text-sm font-semibold text-amber-600">
              <div v-for="leader in policyLeaders" :key="leader.name">
                <p>{{ leader.name }}</p>
                <p>{{ leader.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-black/5 md:hidden">
        <div class="mx-auto max-w-5xl px-4 py-8">
          <div class="space-y-3">
            <h2 class="text-base font-semibold text-zinc-900">
              {{ t('pages.about.policy.title') }}
            </h2>
            <div class="h-[2px] w-16 bg-amber-400" />
          </div>
          <p class="mt-5 text-sm leading-7 text-zinc-800 text-justify">
            {{ t('pages.about.policy.body') }}
          </p>
          <div class="mt-6 grid grid-cols-3 gap-3 text-center text-xs font-semibold text-amber-600">
            <div v-for="leader in policyLeaders" :key="leader.name">
              <p>{{ leader.name }}</p>
              <p>{{ leader.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
