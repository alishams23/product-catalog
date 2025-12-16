<script setup lang="ts">
const year = new Date().getFullYear()

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/modern_bakery_mbico', icon: 'https://mbico.ir/wp-content/uploads/2024/07/instagram-ico-280x280.png' },
  { label: 'YouTube', href: 'https://www.youtube.com/@MBICO-ep3ow', icon: 'https://mbico.ir/wp-content/uploads/2024/04/youtube-ico-280x280.png' },
  { label: 'Telegram', href: 'https://t.me/mbico2023', icon: 'https://mbico.ir/wp-content/uploads/2024/07/Telegram-ico-280x280.png' },
  { label: 'WhatsApp', href: 'https://chat.whatsapp.com/HjiQCjzxluRJEphIhA1lDc', icon: 'https://mbico.ir/wp-content/uploads/2024/07/whatsapp-ico-280x280.png' },
  { label: 'Soroush', href: 'https://splus.ir/mbico2023', icon: 'https://mbico.ir/wp-content/uploads/2024/07/Soroush-ico-280x280.png' },
  { label: 'Eitaa', href: 'https://eitaa.com/mbico2023', icon: 'https://mbico.ir/wp-content/uploads/2024/04/eitaa-ico-280x280.png' },
  { label: 'Rubika', href: 'https://rubika.ir/@mbico7571', icon: 'https://mbico.ir/wp-content/uploads/2024/04/rubika-ico-280x280.png' },
  { label: 'Aparat', href: 'https://www.aparat.com/mbico', icon: 'https://mbico.ir/wp-content/uploads/2024/07/aparat-ico-280x280.png' },
  { label: 'Namasha', href: 'https://www.namasha.com/mbico', icon: 'https://mbico.ir/wp-content/uploads/2024/04/namasha-ico-280x280.png' },
  { label: 'Facebook', href: 'https://www.facebook.com/bakingbread.mbico/', icon: 'https://mbico.ir/wp-content/uploads/2024/07/facebook-ico-280x280.png' }
]
</script>

<template>
  <footer class="mt-10">
    <section class="relative overflow-hidden">
      <NuxtImg
        src="https://mbico.ir/wp-content/uploads/2024/04/aie-veiw2.jpg"
        alt="نمای کارخانه صنایع پخت مشهد"
        class="h-[340px] w-full object-cover sm:h-[420px]"
      />
      <div class="absolute inset-0 bg-black/45" />
      <div class="absolute inset-x-0 top-0 h-[10px] bg-zinc-200/60" />

      <div class="absolute inset-0 flex items-center justify-center">
        <div class="mx-auto max-w-6xl px-4 text-center">
          <p class="text-white text-[1.15rem] sm:text-[1.35rem] font-semibold drop-shadow">
            نان سالم، هوای پاک، ایران سرافراز
          </p>

          <div class="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              v-for="s in socials"
              :key="s.href"
              class="group inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur hover:bg-white/15"
              :href="s.href"
              target="_blank"
              rel="noopener"
              :aria-label="s.label"
              :title="s.label"
            >
              <NuxtImg :src="s.icon" :alt="s.label" class="h-8 w-8 object-contain opacity-95 group-hover:opacity-100" />
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-zinc-950 text-zinc-200">
      <div class="mx-auto max-w-6xl px-4 py-10">
        <div class="grid gap-8 lg:grid-cols-3">
          <div>
            <MbicoLogo class="h-10 w-auto brightness-0 invert" variant="dark" />
            <p class="mt-4 text-sm leading-8 text-zinc-300">
              شرکت صنایع پخت مشهد با رویکرد توسعه پایدار، در تلاش است با ارائه راهکارهای نوآورانه در صنعت پخت،
              کیفیت زندگی و بهره‌وری را ارتقا دهد.
            </p>
          </div>

          <div>
            <h3 class="text-sm font-semibold text-white">دسترسی سریع</h3>
            <div class="mt-3 h-px w-16 bg-amber-500" />
            <div class="mt-4 grid gap-2 text-sm">
              <a class="hover:text-amber-400" href="https://mbico.ir/products/" target="_blank" rel="noopener">محصولات</a>
              <a class="hover:text-amber-400" href="https://mbico.ir/blog/" target="_blank" rel="noopener">وبلاگ</a>
              <a class="hover:text-amber-400" href="https://mbico.ir/news/" target="_blank" rel="noopener">اخبار</a>
              <a class="hover:text-amber-400" href="https://mbico.ir/%d8%ae%d8%af%d9%85%d8%a7%d8%aa-%d9%be%d8%b3-%d8%a7%d8%b2-%d9%81%d8%b1%d9%88%d8%b4/" target="_blank" rel="noopener">خدمات پس از فروش</a>
              <a class="hover:text-amber-400" href="https://mbico.ir/%d8%aa%d9%85%d8%a7%d8%b3-%d8%a8%d8%a7-%d8%b5%d9%86%d8%a7%db%8c%d8%b9-%d9%be%d8%ae%d8%aa-%d9%85%d8%b4%d9%87%d8%af/" target="_blank" rel="noopener">تماس با ما</a>
            </div>
          </div>

          <div>
            <h3 class="text-sm font-semibold text-white">ارتباط با ما</h3>
            <div class="mt-3 h-px w-16 bg-amber-500" />
            <div class="mt-4 space-y-3 text-sm text-zinc-300">
              <p>تلفن: <a class="hover:text-amber-400" href="tel:+985132464090">۰۵۱-۳۲۴۶۴۰۹۰</a></p>
              <p>وب‌سایت: <a class="hover:text-amber-400" href="https://mbico.ir/" target="_blank" rel="noopener">mbico.ir</a></p>
              <p>ایمیل: <a class="hover:text-amber-400" href="mailto:info@mbico.ir">info@mbico.ir</a></p>
            </div>
          </div>
        </div>

        <div class="mt-10 border-t border-white/10 pt-6 text-center text-xs text-zinc-400">
          © {{ year }} صنایع پخت مشهد
        </div>
      </div>
    </section>
  </footer>
</template>
