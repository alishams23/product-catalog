<script setup lang="ts">
type NavLink = { label: string, href: string }
type MegaTab = { key: string, label: string, href: string, items: NavLink[] }

const isMobileOpen = ref(false)
const isProductsOpen = ref(false)
const activeProductsTab = ref<'ovens' | 'equipment' | 'mobile'>('ovens')
const isAtTop = ref(true)
const scrollThresholdPx = 8

const topLinks: NavLink[] = [
  { label: 'درباره ما', href: 'https://mbico.ir/%d8%af%d8%b1%d8%a8%d8%a7%d8%b1%d9%87-%d8%b5%d9%86%d8%a7%db%8c%d8%b9-%d9%be%d8%ae%d8%aa-%d9%85%d8%b4%d9%87%d8%af/' },
  { label: 'تماس با ما', href: 'https://mbico.ir/%d8%aa%d9%85%d8%a7%d8%b3-%d8%a8%d8%a7-%d8%b5%d9%86%d8%a7%db%8c%d8%b9-%d9%be%d8%ae%d8%aa-%d9%85%d8%b4%d9%87%d8%af/' },
  { label: 'اخبار', href: 'https://mbico.ir/news/' },
  { label: 'خدمات پس از فروش', href: 'https://mbico.ir/%d8%ae%d8%af%d9%85%d8%a7%d8%aa-%d9%be%d8%b3-%d8%a7%d8%b2-%d9%81%d8%b1%d9%88%d8%b4/' },
  { label: 'وبلاگ', href: 'https://mbico.ir/blog/' },
  { label: 'آکادمی پخت', href: 'https://mbico.ir/academi/' },
  { label: 'English', href: 'https://mbico.com' }
]

const productsTabs: MegaTab[] = [
  {
    key: 'ovens',
    label: 'فرهای پخت',
    href: 'https://mbico.ir/%d9%81%d8%b1%d9%87%d8%a7%db%8c-%d9%be%d8%ae%d8%aa/',
    items: [
      { label: 'دستگاه‌های نانوایی', href: 'https://mbico.ir/%d8%af%d8%b3%d8%aa%da%af%d8%a7%d9%87-%d9%87%d8%a7%db%8c-%d9%86%d8%a7%d9%86%d9%88%d8%a7%db%8c%db%8c/' },
      { label: 'فرهای پخت نان حجیم و نیمه‌حجیم', href: 'https://mbico.ir/%d9%81%d8%b1%d9%87%d8%a7%db%8c-%d9%be%d8%ae%d8%aa-%d9%86%d8%a7%d9%86-%d8%ad%d8%ac%db%8c%d9%85/' },
      { label: 'فرهای پخت پیتزا و غذا', href: 'https://mbico.ir/%d9%81%d8%b1%d9%87%d8%a7%db%8c-%d9%be%d8%ae%d8%aa-%d9%be%db%8c%d8%aa%d8%b2%d8%a7-%d8%ba%d8%b0%d8%a7/' },
      { label: 'دستگاه لواش', href: 'https://mbico.ir/%d8%af%d8%b3%d8%aa%da%af%d8%a7%d9%87-%d9%84%d9%88%d8%a7%d8%b4/' },
      { label: 'دستگاه بربری', href: 'https://mbico.ir/%d8%af%d8%b3%d8%aa%da%af%d8%a7%d9%87-%d8%a8%d8%b1%d8%a8%d8%b1%db%8c/' },
      { label: 'دستگاه سنگک', href: 'https://mbico.ir/%d8%af%d8%b3%d8%aa%da%af%d8%a7%d9%87-%d8%b3%d9%86%da%af%da%a9/' },
      { label: 'دستگاه تافتون', href: 'https://mbico.ir/%d8%af%d8%b3%d8%aa%da%af%d8%a7%d9%87-%d8%aa%d8%a7%d9%81%d8%aa%d9%88%d9%86/' }
    ]
  },
  {
    key: 'equipment',
    label: 'تجهیزات پخت',
    href: 'https://mbico.ir/%d8%aa%d8%ac%d9%87%db%8c%d8%b2%d8%a7%d8%aa-%d9%be%d8%ae%d8%aa/',
    items: [
      { label: 'مشاهده همه تجهیزات پخت', href: 'https://mbico.ir/%d8%aa%d8%ac%d9%87%db%8c%d8%b2%d8%a7%d8%aa-%d9%be%d8%ae%d8%aa/' },
      { label: 'محصولات', href: 'https://mbico.ir/products/' },
      { label: 'خدمات پس از فروش', href: 'https://mbico.ir/%d8%ae%d8%af%d9%85%d8%a7%d8%aa-%d9%be%d8%b3-%d8%a7%d8%b2-%d9%81%d8%b1%d9%88%d8%b4/' }
    ]
  },
  {
    key: 'mobile',
    label: 'ماشین‌آلات پخت سیار',
    href: 'https://mbico.ir/%d9%85%d8%a7%d8%b4%db%8c%d9%86-%d8%a2%d9%84%d8%a7%d8%aa-%d9%be%d8%ae%d8%aa-%d8%b3%db%8c%d8%a7%d8%b1/',
    items: [
      { label: 'مشاهده همه ماشین‌آلات پخت سیار', href: 'https://mbico.ir/%d9%85%d8%a7%d8%b4%db%8c%d9%86-%d8%a2%d9%84%d8%a7%d8%aa-%d9%be%d8%ae%d8%aa-%d8%b3%db%8c%d8%a7%d8%b1/' },
      { label: 'محصولات', href: 'https://mbico.ir/products/' }
    ]
  }
]

const activeTab = computed(() => productsTabs.find(t => t.key === activeProductsTab.value) ?? productsTabs[0]!)

function closeAll() {
  isMobileOpen.value = false
  isProductsOpen.value = false
}

const route = useRoute()
const showMenu = computed(() => route.path !== '/' || !isAtTop.value)

function readScrollY() {
  return window.scrollY || window.pageYOffset || 0
}

let rafId: number | null = null
function onScroll() {
  if (rafId != null) return
  rafId = window.requestAnimationFrame(() => {
    rafId = null
    isAtTop.value = readScrollY() <= scrollThresholdPx
    if (!showMenu.value) closeAll()
  })
}

onMounted(() => {
  isAtTop.value = readScrollY() <= scrollThresholdPx
  window.requestAnimationFrame(() => {
    isAtTop.value = readScrollY() <= scrollThresholdPx
  })
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  if (rafId != null) window.cancelAnimationFrame(rafId)
})

watch(() => route.fullPath, async () => {
  closeAll()
  await nextTick()
  isAtTop.value = readScrollY() <= scrollThresholdPx
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-250 ease-out"
    enter-from-class="-translate-y-3 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="-translate-y-3 opacity-0"
  >
    <header
      v-show="showMenu"
      class="fixed inset-x-0 top-0 z-50 border-b border-zinc-200 bg-white/95 shadow-sm backdrop-blur"
    >
    <div class="mx-auto max-w-6xl px-4">
      <div class="flex items-center gap-3 py-3">
        <a href="https://mbico.ir/" class="flex items-center gap-3">
          <MbicoLogo class="h-9 w-auto" />
        </a>

        <nav class="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-800">
          <div
            class="relative"
            @mouseenter="isProductsOpen = true"
            @mouseleave="isProductsOpen = false"
          >
            <button
              type="button"
              class="inline-flex items-center gap-1 hover:text-amber-600"
              :aria-expanded="isProductsOpen ? 'true' : 'false'"
              aria-haspopup="menu"
              @click="isProductsOpen = !isProductsOpen"
            >
              محصولات
              <span class="text-zinc-500">▾</span>
            </button>

            <div
              v-if="isProductsOpen"
              class="absolute right-0 top-full mt-3 w-[720px] rounded-2xl border border-zinc-200 bg-white shadow-xl"
              role="menu"
            >
              <div class="grid grid-cols-12 gap-0 overflow-hidden rounded-2xl">
                <div class="col-span-4 border-l border-zinc-200 bg-zinc-50 p-4">
                  <p class="mb-2 text-xs font-semibold text-zinc-500">
                    دسته‌بندی‌ها
                  </p>
                  <div class="flex flex-col gap-1">
                    <button
                      v-for="tab in productsTabs"
                      :key="tab.key"
                      type="button"
                      class="rounded-xl px-3 py-2 text-right text-sm transition"
                      :class="tab.key === activeProductsTab ? 'bg-amber-100 text-zinc-900' : 'hover:bg-zinc-100 text-zinc-700'"
                      @click="activeProductsTab = tab.key as any"
                    >
                      {{ tab.label }}
                    </button>
                  </div>
                </div>

                <div class="col-span-8 p-5">
                  <div class="flex items-center justify-between gap-3">
                    <a
                      class="text-sm font-semibold text-zinc-900 hover:text-amber-600"
                      :href="activeTab.href"
                      target="_blank"
                      rel="noopener"
                    >
                      {{ activeTab.label }}
                    </a>
                    <a
                      class="text-xs text-amber-700 hover:text-amber-800"
                      :href="activeTab.href"
                      target="_blank"
                      rel="noopener"
                    >
                      مشاهده همه
                    </a>
                  </div>

                  <div class="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
                    <a
                      v-for="item in activeTab.items"
                      :key="item.href"
                      class="rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
                      :href="item.href"
                      target="_blank"
                      rel="noopener"
                    >
                      {{ item.label }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <a
            v-for="l in topLinks"
            :key="l.href"
            class="hover:text-amber-600"
            :href="l.href"
            target="_blank"
            rel="noopener"
          >
            {{ l.label }}
          </a>
        </nav>

        <div class="mr-auto flex items-center gap-2">
          <a
            class="hidden sm:inline-flex items-center rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-amber-600"
            href="tel:+985132464090"
          >
            تماس: ۰۵۱-۳۲۴۶۴۰۹۰
          </a>

          <button
            type="button"
            class="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 hover:bg-zinc-50"
            aria-label="باز کردن منو"
            @click="isMobileOpen = true"
          >
            ☰
          </button>
        </div>
      </div>
    </div>

    <div v-if="isMobileOpen" class="lg:hidden fixed inset-0 z-50">
      <button class="absolute inset-0 bg-black/40" aria-label="بستن منو" @click="isMobileOpen = false" />

      <aside class="absolute right-0 top-0 h-full w-[320px] bg-white shadow-2xl">
        <div class="flex items-center justify-between border-b border-zinc-200 p-4">
          <MbicoLogo class="h-8 w-auto" />
          <button class="h-9 w-9 rounded-xl border border-zinc-200" aria-label="بستن" @click="isMobileOpen = false">
            ×
          </button>
        </div>

        <div class="p-4">
          <a class="block rounded-xl bg-amber-500 px-4 py-3 text-center text-sm font-semibold text-white" href="https://mbico.ir/products/" target="_blank" rel="noopener">
            مشاهده محصولات
          </a>

          <div class="mt-4 space-y-1">
            <a
              v-for="l in topLinks"
              :key="l.href"
              class="block rounded-xl px-3 py-3 text-sm text-zinc-800 hover:bg-zinc-50"
              :href="l.href"
              target="_blank"
              rel="noopener"
            >
              {{ l.label }}
            </a>
          </div>
        </div>
      </aside>
    </div>
    </header>
  </Transition>
</template>
