import { site, type HeadlineKey, type ParenthesesMotion, type SiteConfig } from './site'

/**
 * Garante que um valor vindo da URL é uma das opções permitidas.
 * Se não for, devolve o padrão. Assim ninguém quebra a página digitando ?titulo=xyz.
 */
function pick<T extends string>(value: string | null, allowed: readonly T[], fallback: T): T {
  return allowed.find((option) => option === value) ?? fallback
}

const HEADLINES: readonly HeadlineKey[] = ['a', 'b']
const MOTIONS: readonly ParenthesesMotion[] = ['abrindo', 'estatico']

/**
 * Permite ao cliente comparar as opções pelo próprio link:
 * ?titulo=b&parenteses=estatico
 */
export function resolveConfig(search: string = window.location.search): SiteConfig {
  const params = new URLSearchParams(search)

  return {
    ...site,
    headline: pick(params.get('titulo'), HEADLINES, site.headline),
    parenthesesMotion: pick(params.get('parenteses'), MOTIONS, site.parenthesesMotion),
  }
}
