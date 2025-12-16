<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  subtitle?: string
  align?: 'right' | 'center'
}>(), {
  align: 'center'
})
</script>

<template>
  <header :class="align === 'center' ? 'text-center' : 'text-right'">
    <h2 class="text-[1.1rem] sm:text-[1.2rem] font-semibold text-zinc-900">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="mt-1 text-sm text-zinc-500">
      {{ subtitle }}
    </p>
    <div
      class="mt-3 h-[2px] w-16 bg-zinc-300"
      :class="align === 'center' ? 'mx-auto' : 'mr-0'"
    />
  </header>
</template>

