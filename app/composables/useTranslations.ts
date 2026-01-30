import { messages } from '~/i18n/messages'
import { useAppLocale } from '~/composables/useAppLocale'

type Params = Record<string, string | number>

function resolveValue(key: string, source: unknown): string | undefined {
  if (!key) return undefined
  const value = key.split('.').reduce<unknown>((acc, part) => {
    if (!acc || typeof acc !== 'object') return undefined
    return (acc as Record<string, unknown>)[part]
  }, source)
  return typeof value === 'string' ? value : undefined
}

function interpolate(text: string, params?: Params): string {
  if (!params) return text
  return text.replace(/\{\{(\w+)\}\}/g, (_, name) => {
    const value = params[name]
    return value === undefined ? '' : String(value)
  })
}

export function useTranslations() {
  const { locale, dir, isRtl, localePath, switchLocalePath } = useAppLocale()
  const dictionary = computed(() => messages[locale.value] ?? messages.fa)

  const t = (key: string, params?: Params) => {
    const value = resolveValue(key, dictionary.value) ?? resolveValue(key, messages.fa)
    if (!value) return key
    return interpolate(value, params)
  }

  return { t, locale, dir, isRtl, localePath, switchLocalePath }
}
