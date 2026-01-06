<script setup lang="ts">
const { t } = useTranslations()

useSeoMeta({
  title: computed(() => t('seo.contact.title')),
  description: computed(() => t('seo.contact.description'))
})
</script>

<template>
  <div>
    <header class="bg-[linear-gradient(180deg,#c8a35f_0%,#b48a47_55%,#9a6c2d_100%)]">
      <div class="mx-auto max-w-6xl px-4 py-10 text-center">
        <h1 class="text-3xl font-black tracking-tight text-zinc-900 [text-shadow:0_2px_0_rgba(0,0,0,0.12)] sm:text-4xl">
          {{ t('pages.contact.heading') }}
        </h1>
      </div>
    </header>

    <div class="h-2 w-full bg-[#f89014]" />

    <section class="bg-[radial-gradient(circle_at_top,#f5f5f5_0%,#e3e3e3_48%,#d2d2d2_100%)] shadow-[inset_0_40px_80px_rgba(0,0,0,0.12)]">
      <div class="mx-auto max-w-6xl px-4 py-10">
        <div class="grid gap-4 lg:grid-cols-2">
          <div class="rounded-3xl bg-white p-6 ring-1 ring-black/5">
            <h2 class="text-sm font-black text-zinc-900">
              {{ t('pages.contact.infoHeading') }}
            </h2>
            <div class="mt-4 space-y-3 text-sm text-zinc-700">
              <p>{{ t('pages.contact.phoneLabel') }}: <a class="font-semibold text-amber-700 hover:text-amber-800" href="tel:+985132464090">{{ t('shared.phoneDisplay') }}</a></p>
              <p>{{ t('pages.contact.emailLabel') }}: <a class="font-semibold text-amber-700 hover:text-amber-800" href="mailto:info@mbico.ir">info@mbico.ir</a></p>
            </div>
          </div>
          <div class="rounded-3xl bg-white p-6 ring-1 ring-black/5">
            <h2 class="text-sm font-black text-zinc-900">
              {{ t('pages.contact.descriptionHeading') }}
            </h2>
            <p class="mt-4 text-sm leading-8 text-zinc-700">
              {{ t('pages.contact.description') }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
