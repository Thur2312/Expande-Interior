import type { Ref } from 'react'
import { copy } from '../../content/copy'
import { Orbits } from '../brand/Orbits'
import { CtaButton } from '../ui/CtaButton'
import { Rich } from '../ui/Rich'

interface ParticiparProps {
  salesUrl: string
  ref?: Ref<HTMLElement>
}

export function Participar({ salesUrl, ref }: ParticiparProps) {
  const { title, price, condition, includedTitle, included } = copy.participar

  return (
    <section
      ref={ref}
      id="participar"
      aria-labelledby="participar-title"
      className="chapter page-x relative isolate overflow-hidden bg-wine py-20 lg:grid lg:grid-cols-12 lg:gap-8 lg:py-32"
    >
      {/* Única aparição das órbitas na página: grandes, cortadas, estáticas */}
      <Orbits className="pointer-events-none absolute -right-[45%] -bottom-[18%] -z-10 w-[130%] text-fog opacity-[0.07] lg:-right-[10vw] lg:-bottom-[35%] lg:w-[58vw]" />

      <div className="lg:col-span-6">
        <h2 id="participar-title" className="title-section max-w-[16ch]">
          {title}
        </h2>
        <p className="mt-8 font-serif text-[2.75rem] leading-none font-medium lg:mt-12 lg:text-[4.5rem]">
          <Rich text={price} />
        </p>
        <p className="mt-4 text-mist">
          <Rich text={condition} />
        </p>
      </div>

      <div className="mt-12 lg:col-span-5 lg:col-start-8 lg:mt-2">
        <h3 className="font-semibold">{includedTitle}</h3>
        <ul className="mt-4 border-t border-fog/20">
          {included.map((item, index) => (
            <li key={index} className="border-b border-fog/20 py-3.5 text-lg">
              <Rich text={item} />
            </li>
          ))}
        </ul>

        <CtaButton href={salesUrl} location="participar" fullWidth className="mt-8" />
        <p className="mt-3 text-[0.875rem] leading-snug text-mist">
          <Rich text={copy.cta.exitNote} />
        </p>
      </div>
    </section>
  )
}
