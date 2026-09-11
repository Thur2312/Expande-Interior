import type { CtaLocation } from '../components/ui/CtaButton'

// dataLayer não existe no tipo padrão de Window: é o GTM que a cria em runtime.
// unknown[] porque o GTM aceita tanto objetos de evento quanto arrays no formato gtag() (ver lib/gtm.ts).
declare global {
  interface Window {
    dataLayer: unknown[]
  }
}

/** União fechada: só estes eventos podem ser enviados, cada um com seus próprios campos. */
export type AnalyticsEvent = { event: 'cta_click'; cta_location: CtaLocation }

export function pushEvent(event: AnalyticsEvent): void {
  window.dataLayer ??= []
  window.dataLayer.push(event)
}
