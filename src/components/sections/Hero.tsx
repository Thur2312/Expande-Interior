import type { Ref } from 'react'
import type { SiteConfig } from '../../config/site'
import { copy } from '../../content/copy'
import { useFontsReady } from '../../hooks/useFontsReady'
import { Paren } from '../brand/Paren'
import { CtaButton } from '../ui/CtaButton'
import { Rich } from '../ui/Rich'

interface HeroProps {
  config: SiteConfig
  salesUrl: string
  // React 19: ref chega como prop comum, sem forwardRef.
  ref?: Ref<HTMLElement>
}

export function Hero({ config, salesUrl, ref }: HeroProps) {
  const fontsReady = useFontsReady()
  const isFoto = config.heroVariant === 'foto'

  return (
    <section
      ref={ref}
      id="topo"
      aria-labelledby="hero-title"
      data-motion={config.parenthesesMotion}
      data-ready={fontsReady ? '' : undefined}
      className="relative isolate flex min-h-[calc(92svh-4.75rem)] items-center overflow-hidden py-8 lg:min-h-[calc(90svh-6.25rem)] lg:py-4"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-between">
        <Paren
          side="left"
          className="hero-paren hero-paren--left h-[64%] w-auto shrink-0 -translate-x-[42%] text-wine sm:h-[74%] sm:-translate-x-[30%] lg:h-[88%] lg:translate-x-[3vw]"
        />
        <Paren
          side="right"
          className="hero-paren hero-paren--right h-[64%] w-auto shrink-0 translate-x-[42%] text-wine sm:h-[74%] sm:translate-x-[30%] lg:h-[88%] lg:-translate-x-[3vw]"
        />
      </div>

      <div className="hero-copy page-x w-full">
        {isFoto && (
          <div aria-hidden="true" className="hero-photo relative mx-auto -mb-14 w-[82vw] max-w-[420px] sm:max-w-[520px] sm:-mb-20 lg:max-w-[640px] lg:-mb-36">
            <img src="/images/hero-palestrantes.png" alt="" width={1270} height={1061} fetchPriority="high" className="h-auto w-full" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-night to-transparent" />
          </div>
        )}

        <h1 id="hero-title" className="title-hero relative max-w-[14ch] lg:max-w-[19ch]">
          {copy.hero.headlines[config.headline]}
        </h1>

        <div className="mt-5 lg:mt-4">
          <CtaButton href={salesUrl} location="hero" fullWidth className="sm:w-auto" />
          <p className="mt-3 max-w-[34ch] text-[0.875rem] leading-snug text-mist">
            <Rich text={copy.cta.exitNote} />
          </p>
        </div>
      </div>
    </section>
  )
}
