import { useEffect, useState } from 'react'
import { copy } from '../../content/copy'
import { updateConsent } from '../../lib/gtm'

type Choice = 'granted' | 'denied'
const STORAGE_KEY = 'expande-consent'

function readSavedChoice(): Choice | null {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved === 'granted' || saved === 'denied' ? saved : null
}

export function ConsentBanner() {
  // Inicializador de estado (lazy): lê o localStorage antes da primeira pintura,
  // então não há um instante em que o banner aparece para quem já decidiu.
  const [choice, setChoice] = useState<Choice | null>(readSavedChoice)

  // Reaplica a escolha salva no GTM a cada carregamento: o padrão dele é negado.
  // Não depende de `choice`: só deve rodar uma vez, no mount. `decide` cobre as mudanças seguintes.
  useEffect(() => {
    const saved = readSavedChoice()
    if (saved) updateConsent(saved === 'granted')
  }, [])

  function decide(granted: boolean): void {
    const value: Choice = granted ? 'granted' : 'denied'
    localStorage.setItem(STORAGE_KEY, value)
    updateConsent(granted)
    setChoice(value)
  }

  if (choice) return null

  return (
    <div role="region" aria-label={copy.consent.message} className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-night-raised px-4 py-4 lg:px-8">
      <div className="mx-auto flex max-w-[64rem] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[52ch] text-[0.9375rem] text-mist">{copy.consent.message}</p>

        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide(false)}
            className="min-h-10 flex-1 rounded-md border border-rule px-5 text-[0.9375rem] font-semibold transition-colors duration-200 hover:bg-night sm:flex-initial"
          >
            {copy.consent.decline}
          </button>
          <button
            type="button"
            onClick={() => decide(true)}
            className="min-h-10 flex-1 rounded-md border border-rule px-5 text-[0.9375rem] font-semibold transition-colors duration-200 hover:bg-night sm:flex-initial"
          >
            {copy.consent.accept}
          </button>
        </div>
      </div>
    </div>
  )
}
