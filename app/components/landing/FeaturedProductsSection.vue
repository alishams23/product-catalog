<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'

type FeaturedProduct = {
  title: string
  href: string
  image: string
}

const { t, localePath } = useTranslations()

const fallbackProducts = computed<FeaturedProduct[]>(() => [
  {
    title: t('home.featured.fallbackProducts.portableRotary'),
    href: 'https://mbico.ir/products/%d8%af%d8%b3%d8%aa%da%af%d8%a7%d9%87-%d9%86%d8%a7%d9%86%d9%88%d8%a7%db%8c%db%8c-%d8%af%d9%88%d8%a7%d8%b1-%d9%be%d8%b1%d8%aa%d8%a7%d8%a8%d9%84/',
    image: 'https://mbico.ir/wp-content/uploads/2023/11/Portable-Oven-280x280.webp'
  },
  {
    title: t('home.featured.fallbackProducts.sangakAuto'),
    href: 'https://mbico.ir/products/%d8%af%d8%b3%d8%aa%da%af%d8%a7%d9%87-%d9%86%d8%a7%d9%86%d9%88%d8%a7%db%8c%db%8c-%d8%b3%d9%86%da%af%da%a9-%d8%a7%d8%aa%d9%88%d9%85%d8%a7%d8%aa-%d9%be%d8%b1%d8%aa%d8%a7%d8%a8%d9%84/',
    image: 'https://mbico.ir/wp-content/uploads/2023/11/Sangak-Oven-Auto-280x280.webp'
  },
  {
    title: t('home.featured.fallbackProducts.tunnel'),
    href: 'https://mbico.ir/products/%d8%af%d8%b3%d8%aa%da%af%d8%a7%d9%87-%d9%86%d8%a7%d9%86%d9%88%d8%a7%db%8c%db%8c-%d8%aa%d9%88%d9%86%d9%84%db%8c/',
    image: 'https://mbico.ir/wp-content/uploads/2023/11/Tunnel-Oven-280x280.webp'
  },
  {
    title: t('home.featured.fallbackProducts.rotaryPastry'),
    href: 'https://mbico.ir/products/%d9%81%d8%b1-%da%af%d8%b1%d8%af%d8%a7%d9%86-%d9%82%d9%86%d8%a7%d8%af%db%8c/',
    image: 'https://mbico.ir/wp-content/uploads/2023/11/Rotary-Pastry-Oven-280x280.webp'
  }
])

const { data: remoteProducts } = await useFetch<FeaturedProduct[]>('/api/featured-products', {
  default: () => []
})

const products = computed(() => remoteProducts.value.length ? remoteProducts.value : fallbackProducts.value)
const baseLength = computed(() => products.value.length)
const items = computed(() => {
  const base = products.value
  return base.length ? [...base, ...base, ...base] : []
})
const resolvedItems = computed(() =>
  items.value.map((item) => {
    const href = toProductRoute(item.href)
    return { ...item, resolvedHref: href, isInternal: href.startsWith('/') }
  })
)

const scroller = ref<HTMLDivElement | null>(null)
const slideRefs = ref<HTMLElement[]>([])
const activeIndex = ref(0)
const isJumping = ref(false)
let rafId = 0
let wheelAccum = 0
let wheelLocked = false
let wheelUnlockTimer = 0

onBeforeUpdate(() => {
  slideRefs.value = []
})

function setSlideRef(el: Element | ComponentPublicInstance | null) {
  if (el instanceof HTMLElement) slideRefs.value.push(el)
}

function toProductRoute(href: string): string {
  const slugEncoded = /https:\/\/mbico\.ir\/products\/([^/?#]+)(?:\/|$)/.exec(href)?.[1]
  if (!slugEncoded) return href

  let slug = slugEncoded
  try {
    slug = decodeURIComponent(slugEncoded)
  } catch {
    slug = slugEncoded
  }

  return localePath(`/products/${encodeURIComponent(slug)}`)
}

function scrollToIndex(index: number, behavior: ScrollBehavior = 'smooth') {
  const container = scroller.value
  const el = slideRefs.value[index]
  if (!container || !el) return

  const containerRect = container.getBoundingClientRect()
  const elRect = el.getBoundingClientRect()
  const deltaX = (elRect.left + elRect.width / 2) - (containerRect.left + containerRect.width / 2)
  if (Math.abs(deltaX) < 1) return

  container.scrollBy({ left: deltaX, behavior })
}

function onWheel(e: WheelEvent) {
  const container = scroller.value
  if (!container || isJumping.value) return

  const dominant = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX
  if (!dominant) return

  e.preventDefault()

  const unit = e.deltaMode === 1 ? 28 : e.deltaMode === 2 ? container.clientWidth : 1
  wheelAccum += dominant * unit

  const thresholdPx = 90
  if (wheelLocked || Math.abs(wheelAccum) < thresholdPx) return

  const dir = Math.sign(wheelAccum)
  wheelAccum = 0
  wheelLocked = true

  const isRtl = getComputedStyle(container).direction === 'rtl'
  const step = isRtl ? -dir : dir
  scrollToIndex(activeIndex.value + step, 'smooth')

  if (wheelUnlockTimer) window.clearTimeout(wheelUnlockTimer)
  wheelUnlockTimer = window.setTimeout(() => {
    wheelLocked = false
  }, 380)
}

function updateActive() {
  const container = scroller.value
  if (!container || !slideRefs.value.length) return

  const containerRect = container.getBoundingClientRect()
  const center = containerRect.left + containerRect.width / 2

  let bestIndex = 0
  let bestDist = Number.POSITIVE_INFINITY
  for (let i = 0; i < slideRefs.value.length; i++) {
    const r = slideRefs.value[i]!.getBoundingClientRect()
    const c = r.left + r.width / 2
    const dist = Math.abs(c - center)
    if (dist < bestDist) {
      bestDist = dist
      bestIndex = i
    }
  }

  activeIndex.value = bestIndex

  if (isJumping.value) return
  const n = baseLength.value
  if (!n) return

  if (bestIndex < n) {
    isJumping.value = true
    scrollToIndex(bestIndex + n, 'auto')
    activeIndex.value = bestIndex + n
    requestAnimationFrame(() => {
      isJumping.value = false
    })
  } else if (bestIndex >= 2 * n) {
    isJumping.value = true
    scrollToIndex(bestIndex - n, 'auto')
    activeIndex.value = bestIndex - n
    requestAnimationFrame(() => {
      isJumping.value = false
    })
  }
}

function onScroll() {
  if (rafId) cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(updateActive)
}

watch(baseLength, async (len) => {
  if (!import.meta.client || !len) return
  await nextTick()
  scrollToIndex(len, 'auto')
  updateActive()
}, { immediate: true })

onMounted(() => {
  window.addEventListener('resize', updateActive, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateActive)
  if (rafId) cancelAnimationFrame(rafId)
  if (wheelUnlockTimer) window.clearTimeout(wheelUnlockTimer)
})
</script>

<template>
  <section class="py-10">
    <div class="mx-auto max-w-6xl px-4">
      <UiSectionHeading :title="t('home.featured.heading')" align="center" />

      <div class="mt-6 rounded-[28px] bg-zinc-100 p-5 sm:p-6">
        <div
          ref="scroller"
          class="featured-scroll flex gap-4 overflow-x-auto pb-5 pt-3 [-webkit-overflow-scrolling:touch] snap-x snap-mandatory cursor-grab active:cursor-grabbing"
          @scroll.passive="onScroll"
          @wheel="onWheel"
        >
          <component
            v-for="(p, i) in resolvedItems"
            :key="`${p.href}-${i}`"
            :ref="setSlideRef"
            class="group relative flex w-[210px] shrink-0 snap-center flex-col overflow-hidden rounded-[30px] bg-zinc-50 ring-1 ring-black/5 transition duration-300 hover:shadow-md sm:w-[230px]"
            :class="i === activeIndex ? 'z-10 scale-[1.04] shadow-md' : 'scale-[0.97] opacity-90'"
            :is="p.isInternal ? 'NuxtLink' : 'a'"
            v-bind="p.isInternal ? { to: p.resolvedHref } : { href: p.resolvedHref, target: '_blank', rel: 'noopener' }"
          >
            <div class="p-4">
              <div class="overflow-hidden rounded-[20%] bg-white">
                <NuxtImg :src="p.image" :alt="p.title" class="h-36 w-full object-contain" />
              </div>
            </div>
            <div
              class="px-3 py-3 text-center transition-colors"
              :class="i === activeIndex ? 'bg-[#2a2a2b]' : 'bg-zinc-500 group-hover:bg-[#2a2a2b]'"
            >
              <p class="text-sm font-semibold text-white leading-6">
                {{ p.title }}
              </p>
              <div class="mt-3">
                <span
                  class="inline-flex rounded-full px-4 py-2 text-xs font-semibold text-white transition-colors"
                  :class="i === activeIndex ? 'bg-amber-500' : 'bg-[#e2bf8c] group-hover:bg-amber-500'"
                >
                  {{ t('home.featured.cta') }}
                </span>
              </div>
            </div>
          </component>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.featured-scroll {
  scrollbar-width: none;
}

.featured-scroll::-webkit-scrollbar {
  display: none;
}
</style>
