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
  const { title, price, condition, learnTitle, learn } = copy.participar
  // Reaproveita o que já está no bloco essencial: quem chega ao fim da página decide
  // com data e local à vista, sem voltar lá em cima e sem um segundo texto para manter.
  const logistics = copy.essencial.items.filter(({ term }) => term === 'Quando' || term === 'Onde')

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

        <dl className="mt-10 border-t border-fog/20 lg:mt-14 lg:max-w-[34ch]">
          {logistics.map(({ term, value }) => (
            <div key={term} className="border-b border-fog/20 py-3.5">
              <dt className="text-[0.875rem] text-mist">{term}</dt>
              <dd className="mt-0.5 text-lg">
                <Rich text={value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-12 lg:col-span-5 lg:col-start-8 lg:mt-2">
        <h3 className="font-semibold">{learnTitle}</h3>
        {/* Temas em serifa e em corpo maior: são o motivo da compra, então ganham destaque sobre o resto da lista */}
        <ul className="mt-4 border-t border-fog/20">
          {learn.map((topic) => (
            <li key={topic} className="border-b border-fog/20 py-3 font-serif text-[1.5rem] leading-tight lg:text-[1.75rem]">
              {topic}
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
