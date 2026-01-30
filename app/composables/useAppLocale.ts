import { isLocale, type Locale } from '~/i18n/messages'

const localeRegex = /^\/(en|fa)(?=\/|$|\?|#)/

export function useAppLocale() {
  const route = useRoute()
  const locale = computed<Locale>(() => {
    const match = localeRegex.exec(route.path)
    const value = match?.[1]
    return value && isLocale(value) ? value : 'ru'
  })

  const dir = computed(() => (locale.value === 'fa' ? 'rtl' : 'ltr'))
  const isRtl = computed(() => locale.value === 'fa')

  const normalizePath = (path: string) => (path.startsWith('/') ? path : `/${path}`)

  const stripLocale = (path: string) => {
    const cleaned = path.replace(localeRegex, '')
    return cleaned || '/'
  }

  const localePath = (path: string, targetLocale: Locale = locale.value) => {
    if (!path.startsWith('/')) return path
    const normalized = normalizePath(path)
    if (targetLocale === 'ru') return normalized
    if (normalized === '/') return `/${targetLocale}`
    return `/${targetLocale}${normalized}`
  }

  const switchLocalePath = (targetLocale: Locale) => {
    const base = stripLocale(route.fullPath || route.path)
    if (targetLocale === 'ru') return base
    if (base === '/') return `/${targetLocale}`
    return `/${targetLocale}${base}`
  }

  return { locale, dir, isRtl, localePath, switchLocalePath, stripLocale }
}
