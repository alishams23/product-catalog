<script setup lang="ts">
const items = [
  { title: 'CE اروپا', image: 'https://mbico.ir/wp-content/uploads/2024/10/CEStandard-280x280.webp', variant: 'icon' as const },
  { title: 'گاست روسیه', image: 'https://mbico.ir/wp-content/uploads/2024/10/GostStandard-280x280.webp', variant: 'icon' as const },
  { title: 'CSA کانادا', image: 'https://mbico.ir/wp-content/uploads/2024/10/CSAStandard-280x280.webp', variant: 'icon' as const },
  { title: 'نشان اکو انرژی', image: 'https://mbico.ir/wp-content/uploads/2024/11/EcoEnergy.webp', variant: 'certificate' as const },
  { title: 'UL کانادا', image: 'https://mbico.ir/wp-content/uploads/2024/10/ULStandard-280x280.webp', variant: 'icon' as const },
  { title: 'ایزو 9001', image: 'https://mbico.ir/wp-content/uploads/2024/10/ISOStandard-280x280.webp', variant: 'icon' as const },
  { title: 'استاندارد ملی ایران', image: 'https://mbico.ir/wp-content/uploads/2024/10/IranStandard-280x280.webp', variant: 'icon' as const }
]
</script>

<template>
  <section class="pt-0">
    <header class="bg-[linear-gradient(180deg,#c8a35f_0%,#b48a47_55%,#9a6c2d_100%)]">
      <div class="mx-auto max-w-6xl px-4 py-10 text-center">
        <h2 class="text-3xl font-black tracking-tight text-zinc-900 [text-shadow:0_2px_0_rgba(0,0,0,0.12)] sm:text-4xl">
          گواهینامه ها و استانداردها
        </h2>
        <p class="mt-3 text-2xl font-medium tracking-[0.08em] text-black/70 [text-shadow:0_1px_0_rgba(255,255,255,0.35)] sm:text-3xl">
          Certificates &amp; standards
        </p>
      </div>
    </header>

    <div class="h-2 w-full bg-[#f89014]" />

    <div class="bg-[radial-gradient(circle_at_top,#f5f5f5_0%,#e3e3e3_48%,#d2d2d2_100%)] shadow-[inset_0_40px_80px_rgba(0,0,0,0.18)]">
      <div class="mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <p class="mx-auto max-w-4xl text-center text-sm leading-8 text-zinc-800">
          محصولات شرکت صنایع پخت مشهد با رعایت ۶ استاندارد معتبر جهانی، تضمینی برای کیفیت، ایمنی و بهره‌وری بالا در صنعت پخت نان، شیرینی و غذا هستند.
          این استانداردها نشان‌دهنده تعهد ما به اصول مهندسی دقیق، مواد اولیه باکیفیت و فرآیندهای تولید پیشرفته است. همچنین، دریافت نشان
          <strong>Eco Energy</strong>
          تأکیدی بر رویکرد ما به بهره‌وری انرژی و حفاظت از محیط زیست می‌باشد.
        </p>

        <div
          class="mt-12 grid grid-cols-2 items-end justify-items-center gap-x-10 gap-y-12 sm:grid-cols-3 lg:grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.8fr)_repeat(3,minmax(0,1fr))] lg:gap-x-14"
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
                    ? 'h-full w-auto  max-w-[240px] rounded-lg '
                    : 'h-full w-32 max-w-[120px] opacity-80 grayscale'
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
