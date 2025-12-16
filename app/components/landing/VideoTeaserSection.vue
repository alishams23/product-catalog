<script setup lang="ts">
const isOpen = ref(false)
const videoUrl = 'https://mbico.ir/wp-content/uploads/2024/10/Tizer.mp4'
</script>

<template>
  <section class="py-10">
    <div class="w-full">
      <div class="relative overflow-hidden shadow-sm ring-1 ring-black/5">
        <NuxtImg
          src="https://mbico.ir/wp-content/uploads/2024/10/Mbico-Tizer.webp"
          alt="تیزر معرفی صنایع پخت مشهد"
          class="h-[320px] w-full object-cover sm:h-[420px] lg:h-[520px]"
        />
        <div class="absolute inset-0 bg-black/10" />

        <div class="absolute inset-0 flex items-center justify-center px-4">
          <div class="text-center text-white">
            <p class="text-[1.4rem] sm:text-[2rem] font-extrabold leading-tight drop-shadow">
              تیزر معرفی صنایع پخت مشهد
            </p>
            <p class="mt-3 text-sm sm:text-base text-white/90">
              با ما همراه باشید و از نزدیک با محصولات و خدمات آشنا شوید.
            </p>

            <button
              type="button"
              class="mt-6 inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/80 bg-white/10 backdrop-blur hover:bg-white/15"
              aria-label="پخش ویدئو"
              @click="isOpen = true"
            >
              ▶
            </button>
          </div>
        </div>
      </div>

      <Teleport to="body">
        <div v-if="isOpen" class="fixed inset-0 z-[60]">
          <button class="absolute inset-0 bg-black/70" aria-label="بستن" @click="isOpen = false" />
          <div class="absolute inset-0 flex items-center justify-center p-4">
            <div class="w-full max-w-6xl overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10">
              <div class="flex items-center justify-between px-4 py-3 text-white/90">
                <span class="text-sm">پخش ویدئو</span>
                <button class="h-9 w-9 rounded-xl bg-white/10 hover:bg-white/15" aria-label="بستن" @click="isOpen = false">
                  ×
                </button>
              </div>
              <video :src="videoUrl" controls autoplay class="w-full" />
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </section>
</template>
