import { useInView } from './useInView'

/**
 * Aparição suave ao rolar. Uso restrito: só onde o CLAUDE.md permite.
 * Devolve [ref, visible] no mesmo formato do useInView.
 */
export function useReveal<T extends Element>() {
  return useInView<T>({ once: true, rootMargin: '0px 0px -12% 0px' })
}
