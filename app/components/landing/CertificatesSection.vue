<script setup lang="ts">
const logos = [
  { title: 'استاندارد ملی ایران', image: 'https://mbico.ir/wp-content/uploads/2024/10/IranStandard-280x280.webp' },
  { title: 'گواهینامه ایزو 9001', image: 'https://mbico.ir/wp-content/uploads/2024/10/ISOStandard-280x280.webp' },
  { title: 'استاندارد UL کانادا', image: 'https://mbico.ir/wp-content/uploads/2024/10/ULStandard-280x280.webp' },
  { title: 'نشان اکو انرژی', image: 'https://mbico.ir/wp-content/uploads/2024/11/EcoEnergy.webp', wide: true },
  { title: 'CSA کانادا', image: 'https://mbico.ir/wp-content/uploads/2024/10/CSAStandard-280x280.webp' },
  { title: 'گاست روسیه', image: 'https://mbico.ir/wp-content/uploads/2024/10/GostStandard-280x280.webp' },
  { title: 'CE اروپا', image: 'https://mbico.ir/wp-content/uploads/2024/10/CEStandard-280x280.webp' }
]
</script>

<template>
  <section class="pt-8">
    <div class="bg-gradient-to-b from-zinc-50 to-white">
      <div class="mx-auto max-w-6xl px-4">
        <div class="pt-6 text-center">
          <h2 class="text-[1.1rem] font-semibold">
            گواهینامه ها و استانداردها
          </h2>
          <p class="mt-1 text-[0.95rem] tracking-[0.25em] text-black/60">
            Certificates &amp; standards
          </p>
        </div>
      </div>
      <div class="mt-5 h-2 w-full bg-[#f89014]" />
    </div>

    <div class="bg-gradient-to-b from-white to-zinc-50">
      <div class="mx-auto max-w-6xl px-4 py-10">
        <p class="mx-auto max-w-4xl text-center text-sm leading-8 text-zinc-700">
          محصولات <strong>شرکت صنایع پخت مشهد</strong> با رعایت ۶ استاندارد معتبر جهانی، تضمینی برای کیفیت، ایمنی و
          بهره‌وری بالا در صنعت پخت نان، شیرینی و غذا هستند. دریافت نشان Eco Energy نیز تأکیدی بر رویکرد بهره‌وری انرژی
          و حفاظت از محیط زیست می‌باشد.
        </p>

        <div class="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-7">
          <div
            v-for="l in logos"
            :key="l.title"
            class="flex flex-col items-center justify-start text-center"
            :class="l.wide ? 'sm:col-span-2 lg:col-span-2' : ''"
          >
            <div class="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
              <NuxtImg
                :src="l.image"
                :alt="l.title"
                class="object-contain"
                :class="l.wide ? 'h-20 w-40' : 'h-16 w-16'"
              />
            </div>
            <p class="mt-3 text-xs text-zinc-700">
              {{ l.title }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

