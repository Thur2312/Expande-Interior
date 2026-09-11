import { useEffect, useState } from 'react'

/**
 * Espera as fontes carregarem antes de liberar a animação do hero,
 * para o título não trocar de fonte no meio do movimento.
 * Se a rede estiver lenta, libera mesmo assim depois de timeoutMs.
 */
export function useFontsReady(timeoutMs = 1500) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    let timeoutId = 0
    let frameId = 0

    const timeout = new Promise<void>((resolve) => {
      timeoutId = window.setTimeout(resolve, timeoutMs)
    })

    Promise.race([document.fonts.ready, timeout]).then(() => {
      // Dois frames: o navegador pinta o estado inicial antes da troca, e a transição acontece.
      frameId = requestAnimationFrame(() => {
        frameId = requestAnimationFrame(() => {
          if (!cancelled) setReady(true)
        })
      })
    })

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
      cancelAnimationFrame(frameId)
    }
  }, [timeoutMs])

  return ready
}
