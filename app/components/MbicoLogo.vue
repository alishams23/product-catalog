<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'light' | 'dark'
  alt?: string
}>(), {
  variant: 'light',
  alt: 'صنایع پخت مشهد'
})

const src = computed(() =>
  props.variant === 'dark'
    ? 'https://mbico.ir/wp-content/uploads/2024/08/LOGO-MBICO.svg'
    : 'https://mbico.ir/wp-content/uploads/2024/08/MBICO-LOGO.svg'
)
</script>

<template>
  <img :src="src" :alt="alt" loading="lazy" decoding="async">
</template>

