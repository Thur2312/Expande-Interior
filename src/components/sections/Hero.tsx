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

  return (
    <section
      ref={ref}
      id="topo"
      aria-labelledby="hero-title"
      data-motion={config.parenthesesMotion}
      data-ready={fontsReady ? '' : undefined}
      className="relative isolate flex min-h-[calc(92svh-4.75rem)] items-center overflow-hidden py-12 lg:min-h-[calc(90svh-6.25rem)] lg:py-16"
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
        <h1 id="hero-title" className="title-hero max-w-[14ch] lg:max-w-[19ch]">
          {copy.hero.headlines[config.headline]}
        </h1>

        <div className="mt-7 flex flex-col gap-7 lg:mt-12 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <p className="max-w-[36ch] text-mist lg:text-[1.1875rem]">
            <Rich text={copy.hero.support} />
          </p>

          <div className="lg:shrink-0">
            <CtaButton href={salesUrl} location="hero" fullWidth className="sm:w-auto" />
            <p className="mt-3 max-w-[34ch] text-[0.875rem] leading-snug text-mist">
              <Rich text={copy.cta.exitNote} />
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
