import { useMemo } from 'react'

/** Repassa todo parâmetro utm_* da URL atual para o link da plataforma de venda. */
export function useSalesLink(baseUrl: string): string {
  return useMemo(() => {
    const current = new URLSearchParams(window.location.search)
    const utm = new URLSearchParams()

    for (const [key, value] of current) {
      if (key.startsWith('utm_')) utm.set(key, value)
    }

    const query = utm.toString()
    if (!query) return baseUrl

    const separator = baseUrl.includes('?') ? '&' : '?'
    return `${baseUrl}${separator}${query}`
  }, [baseUrl])
}
