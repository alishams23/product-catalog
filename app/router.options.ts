import type { RouterConfig } from '@nuxt/schema'

const LOCALES = ['en', 'fa'] as const

export default <RouterConfig>{
  routes: (routes) => {
    const localizedRoutes = []

    for (const route of routes) {
      localizedRoutes.push(route)

      for (const locale of LOCALES) {
        if (route.path?.startsWith(`/${locale}`)) continue
        const path = route.path === '/' ? `/${locale}` : `/${locale}${route.path}`
        const name = typeof route.name === 'string' ? `${route.name}___${locale}` : route.name
        localizedRoutes.push({ ...route, name, path })
      }
    }

    return localizedRoutes
  }
}
