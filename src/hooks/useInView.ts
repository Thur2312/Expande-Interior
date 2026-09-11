import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  /** Para de observar depois da primeira vez que o elemento aparece. */
  once?: boolean
  /** Margem extra da área observada, no formato do CSS: '0px 0px -10% 0px'. */
  rootMargin?: string
  threshold?: number
  /** Valor antes da primeira medição. Evita um "piscar" em elementos que já começam visíveis. */
  initialInView?: boolean
}

export function useInView<T extends Element>({
  once = false,
  rootMargin = '0px',
  threshold = 0,
  initialInView = false,
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(initialInView)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { rootMargin, threshold },
    )

    observer.observe(element)

    // Cleanup: sem isso, cada remontagem deixaria um observer vivo na memória.
    return () => observer.disconnect()
  }, [once, rootMargin, threshold])

  return [ref, inView] as const
}
