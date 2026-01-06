
<script setup lang="ts">
const { t } = useTranslations()
</script>

<template>
  <section class="bg-slate-900 py-14 text-white">
    <div class="mx-auto max-w-7xl px-4">
      <div class="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 class="text-2xl font-extrabold">{{ t('home.services.title') }}</h2>
          <p class="mt-4 text-sm leading-7 text-white/85">
            {{ t('home.services.text') }}
          </p>

          <div class="mt-6 flex flex-wrap gap-3">
            <div class="rounded-2xl bg-white/10 px-4 py-3">
              <div class="text-xl font-extrabold">B2B</div>
              <div class="text-xs text-white/80">{{ t('home.services.stats.b2b') }}</div>
            </div>
            <div class="rounded-2xl bg-white/10 px-4 py-3">
              <div class="text-xl font-extrabold">QC</div>
              <div class="text-xs text-white/80">{{ t('home.services.stats.qc') }}</div>
            </div>
            <div class="rounded-2xl bg-white/10 px-4 py-3">
              <div class="text-xl font-extrabold">SLA</div>
              <div class="text-xs text-white/80">{{ t('home.services.stats.sla') }}</div>
            </div>
          </div>
        </div>

        <div class="overflow-hidden rounded-3xl bg-white/5 p-4">
          <img
            src="https://mbico.ir/wp-content/uploads/2024/10/Expotr-Mbico.webp"
            :alt="t('home.services.imageAlt')"
            class="w-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>
