<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'light' | 'dark'
  alt?: string
}>(), {
  variant: 'light'
})

const src = computed(() =>
  props.variant === 'dark'
    ? 'https://mbico.ir/wp-content/uploads/2024/08/LOGO-MBICO.svg'
    : 'https://mbico.ir/wp-content/uploads/2024/08/MBICO-LOGO.svg'
)

const { t } = useTranslations()
const altText = computed(() => props.alt ?? t('brand.name'))
</script>

<template>
  <img :src="src" :alt="altText" loading="lazy" decoding="async">
</template>
