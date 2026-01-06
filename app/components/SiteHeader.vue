<script setup lang="ts">
type NavLink = { label: string, href: string }
type MegaTab = { key: string, label: string, href: string, items: NavLink[] }

type CategoryListItem = {
  title: string
  image?: string | null
}

type PaginatedCategoryList = {
  count: number
  next: string | null
  previous: string | null
  results: CategoryListItem[]
}

type RootCategory = {
  id: number
  name: string
  slug: string
  categories: Array<{
    id: number
    name: string
    slug: string
  }>
}

const isMobileOpen = ref(false)
const isProductsOpen = ref(false)
const isLanguageOpen = ref(false)
const activeProductsTab = ref<string>('')
const isAtTop = useState<boolean>('header:isAtTop', () => true)
const baseScrollThresholdPx = 8
const productScrollThresholdPx = 140
const { t, locale, localePath, switchLocalePath, isRtl } = useTranslations()

const topLinks = computed<NavLink[]>(() => [
  { label: t('header.links.about'), href: '/about' },
  { label: t('header.links.contact'), href: '/contact' },
  { label: t('header.links.blog'), href: '/blog' }
])

const languageOptions = computed<NavLink[]>(() => [
  { label: t('header.language.fa'), href: switchLocalePath('fa') },
  { label: t('header.language.en'), href: switchLocalePath('en') },
  { label: t('header.language.ru'), href: switchLocalePath('ru') }
])

const mobileLinks = computed<NavLink[]>(() => [
  { label: t('header.links.home'), href: '/' },
  { label: t('header.links.products'), href: '/products' },
  { label: t('header.links.categories'), href: '/categories' },
  ...topLinks.value
])

const activeLanguageLabel = computed(() => {
  if (locale.value === 'fa') return t('header.language.fa')
  if (locale.value === 'ru') return t('header.language.ru')
  return t('header.language.en')
})

const productsTabs = computed<MegaTab[]>(() => [
  {
    key: 'ovens',
    label: t('header.mega.tabs.ovens.label'),
    href: '/products',
    items: [
      { label: t('header.mega.tabs.ovens.items.bakery'), href: '/products' },
      { label: t('header.mega.tabs.ovens.items.bulk'), href: '/products' },
      { label: t('header.mega.tabs.ovens.items.pizza'), href: '/products' },
      { label: t('header.mega.tabs.ovens.items.lavash'), href: '/products' },
      { label: t('header.mega.tabs.ovens.items.barbari'), href: '/products' },
      { label: t('header.mega.tabs.ovens.items.sangak'), href: '/products' },
      { label: t('header.mega.tabs.ovens.items.taftoon'), href: '/products' }
    ]
  },
  {
    key: 'equipment',
    label: t('header.mega.tabs.equipment.label'),
    href: '/products',
    items: [
      { label: t('header.mega.tabs.equipment.items.viewAll'), href: '/products' },
      { label: t('header.mega.tabs.equipment.items.products'), href: '/products' },
      { label: t('header.mega.tabs.equipment.items.afterSales'), href: '/after-sales' }
    ]
  },
  {
    key: 'mobile',
    label: t('header.mega.tabs.mobile.label'),
    href: '/products',
    items: [
      { label: t('header.mega.tabs.mobile.items.viewAll'), href: '/products' },
      { label: t('header.mega.tabs.mobile.items.products'), href: '/products' }
    ]
  }
])

const isInternalLink = (href: string) => href.startsWith('/')

const { data: categoriesData } = await useFetch<PaginatedCategoryList>('/api/products/categories', {
  query: { page_size: 200 },
  default: () => ({ count: 0, next: null, previous: null, results: [] })
})

const { data: rootCategories } = await useFetch<RootCategory[]>('/api/products/root-categories', {
  default: () => []
})

const categorySlugMap = computed(() => {
  const map = new Map<string, string>()
  for (const root of rootCategories.value ?? []) {
    for (const cat of root.categories ?? []) {
      if (cat.name && cat.slug) map.set(cat.name, cat.slug)
    }
  }
  return map
})

const categoryLinks = computed<NavLink[]>(() =>
  (categoriesData.value?.results ?? [])
    .map((item) => {
      const title = item.title?.trim() ?? ''
      if (!title) return null
      const slug = categorySlugMap.value.get(title) ?? slugifyCategoryTitle(title)
      const href = slug ? `/categories/${encodeURIComponent(slug)}` : '/categories'
      return { label: title, href }
    })
    .filter((item): item is NavLink => Boolean(item))
)

const rootTabs = computed<MegaTab[]>(() => {
  const roots = rootCategories.value ?? []
  if (!roots.length) return []
  return roots
    .map((root) => ({
      key: root.slug || String(root.id),
      label: root.name || root.slug || t('header.mega.fallbackCategory'),
      href: root.slug ? `/categories?root_category=${encodeURIComponent(root.slug)}` : '/categories',
      items: (root.categories ?? [])
        .map((cat) => ({
          label: cat.name || '',
          href: cat.slug ? `/categories/${encodeURIComponent(cat.slug)}` : '/categories'
        }))
        .filter((item) => item.label)
    }))
    .filter((tab) => tab.label)
})

const menuTabs = computed<MegaTab[]>(() => {
  if (rootTabs.value.length) return rootTabs.value
  if (categoryLinks.value.length) {
    return [{
      key: 'all',
      label: t('header.links.products'),
      href: '/products',
      items: categoryLinks.value
    }]
  }
  return productsTabs.value
})

const activeTab = computed(() =>
  menuTabs.value.find(t => t.key === activeProductsTab.value) ?? menuTabs.value[0] ?? productsTabs.value[0]!
)

const activeTabItems = computed(() => activeTab.value.items)

watch(menuTabs, (tabs) => {
  if (!tabs.length) return
  if (!tabs.some((tab) => tab.key === activeProductsTab.value)) {
    activeProductsTab.value = tabs[0]!.key
  }
}, { immediate: true })

function slugifyCategoryTitle(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
}

let productsCloseTimer: ReturnType<typeof setTimeout> | null = null
function openProductsMenu() {
  if (productsCloseTimer) {
    clearTimeout(productsCloseTimer)
    productsCloseTimer = null
  }
  isProductsOpen.value = true
}

function closeProductsMenu() {
  if (productsCloseTimer) {
    clearTimeout(productsCloseTimer)
    productsCloseTimer = null
  }
  isProductsOpen.value = false
}

function scheduleCloseProductsMenu() {
  if (productsCloseTimer) clearTimeout(productsCloseTimer)
  productsCloseTimer = setTimeout(() => {
    isProductsOpen.value = false
    productsCloseTimer = null
  }, 120)
}

function closeAll() {
  isMobileOpen.value = false
  closeProductsMenu()
  isLanguageOpen.value = false
}

function selectLanguage() {
  isLanguageOpen.value = false
}

function selectLanguageAndClose() {
  closeAll()
}

const route = useRoute()
const isProductPage = computed(() => route.path.includes('/products'))
const shouldHideHeaderAtTop = computed(() => Boolean(route.meta?.hideHeaderAtTop))

function readScrollY() {
  return window.scrollY || window.pageYOffset || 0
}

function activeScrollThreshold() {
  return isProductPage.value ? productScrollThresholdPx : baseScrollThresholdPx
}

let rafId: number | null = null
function onScroll() {
  if (rafId != null) return
  rafId = window.requestAnimationFrame(() => {
    rafId = null
    isAtTop.value = readScrollY() <= activeScrollThreshold()
    if (!isAtTop.value) closeAll()
  })
}

onMounted(() => {
  isAtTop.value = readScrollY() <= activeScrollThreshold()
  window.requestAnimationFrame(() => {
    isAtTop.value = readScrollY() <= activeScrollThreshold()
  })
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  if (rafId != null) window.cancelAnimationFrame(rafId)
  if (productsCloseTimer) clearTimeout(productsCloseTimer)
})

watch(() => route.fullPath, async () => {
  closeAll()
  await nextTick()
  isAtTop.value = readScrollY() <= activeScrollThreshold()
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
      :class="[
        'fixed inset-x-0 top-0 z-50 text-zinc-900 backdrop-blur-xl backdrop-saturate-150 transition-all duration-500 ease-out',
        shouldHideHeaderAtTop && isAtTop
          ? 'pointer-events-none -translate-y-2 opacity-0 border-b border-white/40 bg-white/55 shadow-[0_4px_18px_rgba(0,0,0,0.06)]'
          : 'translate-y-0 opacity-100 border-b border-white/60 bg-white/80 shadow-[0_8px_28px_rgba(0,0,0,0.12)]'
      ]"
    >
    <div class="mx-auto max-w-6xl px-4">
      <div class="relative flex items-center gap-3 py-3">
        <NuxtLink
          :to="localePath('/')"
          class="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 lg:static lg:left-auto lg:translate-x-0"
        >
          <MbicoLogo class="h-9 w-auto" />
        </NuxtLink>

        <nav class="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-800">
          <div
            class="relative"
            @mouseenter="openProductsMenu"
            @mouseleave="scheduleCloseProductsMenu"
          >
            <button
              type="button"
              class="inline-flex items-center gap-1 hover:text-amber-600"
              :aria-expanded="isProductsOpen ? 'true' : 'false'"
              aria-haspopup="menu"
              @click="isProductsOpen ? closeProductsMenu() : openProductsMenu()"
            >
              {{ t('header.links.products') }}
              <span class="text-zinc-500">v</span>
            </button>

            <div
              v-if="isProductsOpen"
              class="absolute top-full pt-3"
              :class="isRtl ? 'right-0' : 'left-0'"
              role="menu"
              @mouseenter="openProductsMenu"
              @mouseleave="scheduleCloseProductsMenu"
            >
              <div class="w-[720px] rounded-2xl border border-zinc-200 bg-white shadow-xl">
                <div class="grid grid-cols-12 gap-0 overflow-hidden rounded-2xl">
                  <div class="col-span-4 bg-zinc-50 p-4" :class="isRtl ? 'border-l border-zinc-200' : 'border-r border-zinc-200'">
                    <p class="mb-2 text-xs font-semibold text-zinc-500" :class="isRtl ? 'text-right' : 'text-left'">
                      {{ t('header.mega.categoriesLabel') }}
                    </p>
                    <div class="flex flex-col gap-1">
                      <button
                        v-for="tab in menuTabs"
                        :key="tab.key"
                        type="button"
                        class="rounded-xl px-3 py-2 text-sm transition"
                        :class="[
                          isRtl ? 'text-right' : 'text-left',
                          tab.key === activeProductsTab ? 'bg-amber-100 text-zinc-900' : 'hover:bg-zinc-100 text-zinc-700'
                        ]"
                        @click="activeProductsTab = tab.key"
                      >
                        {{ tab.label }}
                      </button>
                    </div>
                  </div>

                  <div class="col-span-8 p-5">
                    <div class="flex items-center justify-between gap-3">
                    <NuxtLink
                      v-if="isInternalLink(activeTab.href)"
                      class="text-sm font-semibold text-zinc-900 hover:text-amber-600"
                      :to="localePath(activeTab.href)"
                    >
                      {{ activeTab.label }}
                    </NuxtLink>
                    <a
                      v-else
                      class="text-sm font-semibold text-zinc-900 hover:text-amber-600"
                      :href="activeTab.href"
                      target="_blank"
                      rel="noopener"
                    >
                      {{ activeTab.label }}
                    </a>

                    <NuxtLink
                      v-if="isInternalLink(activeTab.href)"
                      class="text-xs text-amber-700 hover:text-amber-800"
                      :to="localePath(activeTab.href)"
                    >
                      {{ t('header.mega.viewAll') }}
                    </NuxtLink>
                    <a
                      v-else
                      class="text-xs text-amber-700 hover:text-amber-800"
                      :href="activeTab.href"
                      target="_blank"
                      rel="noopener"
                    >
                      {{ t('header.mega.viewAll') }}
                    </a>
                  </div>

                    <div class="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
                      <template v-for="item in activeTabItems" :key="item.href">
                        <NuxtLink
                          v-if="isInternalLink(item.href)"
                          class="rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
                          :to="localePath(item.href)"
                        >
                          {{ item.label }}
                        </NuxtLink>
                        <a
                          v-else
                          class="rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
                          :href="item.href"
                          target="_blank"
                          rel="noopener"
                        >
                          {{ item.label }}
                        </a>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <template v-for="l in topLinks" :key="l.href">
            <NuxtLink v-if="isInternalLink(l.href)" class="hover:text-amber-600" :to="localePath(l.href)">
              {{ l.label }}
            </NuxtLink>
            <a
              v-else
              class="hover:text-amber-600"
              :href="l.href"
              target="_blank"
              rel="noopener"
            >
              {{ l.label }}
            </a>
          </template>

          <div
            class="relative"
            @mouseenter="isLanguageOpen = true"
            @mouseleave="isLanguageOpen = false"
          >
            <button
              type="button"
              class="inline-flex items-center gap-1 hover:text-amber-600"
              :aria-expanded="isLanguageOpen ? 'true' : 'false'"
              aria-haspopup="menu"
              @click="isLanguageOpen = !isLanguageOpen"
            >
              {{ activeLanguageLabel }}
              <span class="text-zinc-500">v</span>
            </button>

            <div v-if="isLanguageOpen" class="absolute top-full pt-3" :class="isRtl ? 'right-0' : 'left-0'" role="menu">
              <div class="w-44 rounded-xl border border-zinc-200 bg-white p-2 shadow-xl">
                <template v-for="option in languageOptions" :key="option.label">
                  <NuxtLink
                    v-if="isInternalLink(option.href)"
                    class="block rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
                    :to="option.href"
                    @click="selectLanguage()"
                  >
                    {{ option.label }}
                  </NuxtLink>
                  <a
                    v-else
                    class="block rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
                    :href="option.href"
                    target="_blank"
                    rel="noopener"
                    @click="selectLanguage()"
                  >
                    {{ option.label }}
                  </a>
                </template>
              </div>
            </div>
          </div>
        </nav>

        <div class="flex items-center gap-2" :class="isRtl ? 'ml-auto lg:mr-auto lg:ml-0' : 'ml-auto'">
          <a
            class="hidden sm:inline-flex items-center rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-amber-600"
            href="tel:+985132464090"
          >
            {{ t('header.cta.phone') }}
          </a>

          <button
            type="button"
            class="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-900 transition hover:bg-zinc-50"
            :aria-label="t('header.aria.openMenu')"
            @click="isMobileOpen = true"
          >
            ☰
          </button>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="isMobileOpen" class="lg:hidden fixed inset-0 z-[70]">
        <button class="absolute inset-0 z-0 bg-black/60" :aria-label="t('header.aria.closeMenu')" @click="isMobileOpen = false" />

        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="translate-x-0"
          leave-to-class="translate-x-full"
        >
          <aside class="absolute right-0 top-0 z-10 h-full w-[86vw] max-w-[340px] bg-white shadow-2xl">
            <div class="flex h-full flex-col">
              <div class="flex items-center justify-between border-b border-zinc-200 px-4 py-4">
                <MbicoLogo class="h-8 w-auto" />
                <button class="h-9 w-9 rounded-xl border border-zinc-200 text-zinc-700" :aria-label="t('header.aria.close')" @click="isMobileOpen = false">
                  x
                </button>
              </div>

              <nav class="flex-1 overflow-y-auto p-4">
                <div class="space-y-2">
              <template v-for="l in mobileLinks" :key="l.href">
                <NuxtLink
                  v-if="isInternalLink(l.href)"
                  class="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-zinc-800 hover:bg-zinc-50"
                  :to="localePath(l.href)"
                  @click="closeAll"
                >
                  <span>{{ l.label }}</span>
                  <span class="text-zinc-300">></span>
                </NuxtLink>
                <a
                  v-else
                  class="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-zinc-800 hover:bg-zinc-50"
                  :href="l.href"
                  target="_blank"
                  rel="noopener"
                  @click="closeAll"
                >
                  <span>{{ l.label }}</span>
                  <span class="text-zinc-300">></span>
                </a>
              </template>
            </div>

            <div class="mt-6 border-t border-zinc-200 pt-4">
              <p class="px-3 text-xs font-semibold text-zinc-500">{{ t('header.language.label') }}</p>
              <div class="mt-2 space-y-1">
                <template v-for="option in languageOptions" :key="option.label">
                  <NuxtLink
                    v-if="isInternalLink(option.href)"
                    class="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-50"
                    :to="option.href"
                    @click="selectLanguageAndClose()"
                  >
                    <span>{{ option.label }}</span>
                    <span class="text-zinc-300">></span>
                  </NuxtLink>
                  <a
                    v-else
                    class="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-50"
                    :href="option.href"
                    target="_blank"
                    rel="noopener"
                    @click="selectLanguageAndClose()"
                  >
                    <span>{{ option.label }}</span>
                    <span class="text-zinc-300">></span>
                  </a>
                </template>
              </div>
            </div>
              </nav>

              <div class="border-t border-zinc-200 p-4 text-center">
                <a class="text-xs font-semibold text-zinc-500" href="tel:+985132464090">
                  {{ t('header.cta.phoneShort') }}
                </a>
              </div>
            </div>
          </aside>
        </Transition>
      </div>
    </Teleport>
    </header>
  </Transition>
</template>
