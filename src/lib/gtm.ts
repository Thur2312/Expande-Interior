/**
 * gtag(): o shim mínimo que o Google documenta para Consent Mode v2 sem carregar a
 * lib gtag.js inteira. Ele só empilha os argumentos no dataLayer; o GTM sabe ler esse formato.
 */
function gtag(...args: unknown[]): void {
  window.dataLayer ??= []
  window.dataLayer.push(args)
}

/**
 * Roda uma única vez, no momento em que este módulo é importado pela primeira vez —
 * ou seja, antes de qualquer efeito de componente rodar. Isso importa de verdade:
 * o Consent Mode do Google exige que o comando 'default' seja sempre o primeiro no
 * dataLayer. Se ele dependesse de um useEffect do App, o efeito de montagem do
 * ConsentBanner (filho, que pode chamar updateConsent) rodaria antes do efeito do
 * App (pai) — React dispara efeitos de filho para pai — e 'update' chegaria primeiro.
 */
gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  // dá meio segundo para o banner ler uma escolha salva antes do GTM disparar tags.
  wait_for_update: 500,
})

/** Chamado quando a pessoa aceita ou recusa no banner. */
export function updateConsent(granted: boolean): void {
  const value = granted ? 'granted' : 'denied'
  gtag('consent', 'update', {
    ad_storage: value,
    analytics_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  })
}

function injectScript(gtmId: string): void {
  window.dataLayer ??= []
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
  document.head.appendChild(script)
}

export function initGtm(gtmId: string | null): void {
  if (!gtmId) return // placeholder: o cliente ainda não enviou o Container ID
  injectScript(gtmId)
}
