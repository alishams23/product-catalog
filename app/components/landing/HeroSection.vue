<template>
  <section class="relative overflow-hidden">
    <img
      src="/images/Mbico-Hompageww.webp"
      alt="شرکت بین المللی صنایع پخت مشهد"
      class="h-[520px] w-full object-cover sm:h-[640px] lg:h-[720px]"
      loading="eager"
      decoding="async"
    >
    <div class="absolute inset-0 bg-black/10" />

    <div class="absolute inset-0">
      <div class="mx-auto flex h-full max-w-6xl items-end px-4 pb-8 sm:pb-10">
        <div class="w-full sm:w-2/3 lg:w-1/2">
          <div class="flex flex-wrap items-center gap-3">
            <NuxtLink
              to="/products"
              class="rounded-full bg-white px-7 py-2 text-sm font-semibold text-zinc-900 shadow hover:bg-zinc-50"
            >
              محصولات
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="rounded-full border border-white/80 bg-white/0 px-7 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur hover:bg-white/10"
            >
              درباره ما
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
