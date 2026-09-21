import { useEffect } from 'react'
import { resolveConfig } from './config/preview'
import { copy } from './content/copy'
import { useInView } from './hooks/useInView'
import { useSalesLink } from './hooks/useSalesLink'
import { initGtm } from './lib/gtm'
import { Essencial } from './components/sections/Essencial'
import { Faq } from './components/sections/Faq'
import { Footer } from './components/sections/Footer'
import { Header } from './components/sections/Header'
import { Hero } from './components/sections/Hero'
import { Palestrantes } from './components/sections/Palestrantes'
import { Participar } from './components/sections/Participar'
import { Programacao } from './components/sections/Programacao'
import { Prova } from './components/sections/Prova'
import { Video } from './components/sections/Video'
import { ConsentBanner } from './components/ui/ConsentBanner'
import { StickyCta } from './components/ui/StickyCta'

// Lido uma vez, fora do componente: a URL não muda enquanto a página está aberta.
const config = resolveConfig()

export default function App() {
  const [heroRef, heroInView] = useInView<HTMLElement>({ initialInView: true })
  const [participarRef, participarInView] = useInView<HTMLElement>()
  const salesUrl = useSalesLink(config.salesUrl)

  // O CTA fixo some quando já existe outro CTA grande na tela.
  const showSticky = !heroInView && !participarInView

  useEffect(() => {
    initGtm(config.gtmId)
  }, [])

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-sm focus:bg-fog focus:px-4 focus:py-2 focus:text-wine"
      >
        {copy.skipLink}
      </a>

      <Header />

      <main id="conteudo">
        <Hero ref={heroRef} config={config} salesUrl={salesUrl} />
        <Essencial />
        <Video />
        <Programacao />
        <Palestrantes />
        <Prova />
        <Participar ref={participarRef} salesUrl={salesUrl} />
        <Faq />
      </main>

      <Footer />
      <StickyCta href={salesUrl} visible={showSticky} />
      <ConsentBanner />
    </>
  )
}
