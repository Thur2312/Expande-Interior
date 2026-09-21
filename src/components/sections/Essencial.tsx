import { copy } from '../../content/copy'
import { Rich } from '../ui/Rich'

// Larguras no desktop: "O que é" é frase e pode quebrar linha; Quando e Onde precisam
// de espaço pra caber numa linha só (data + local completos, sem quebrar no meio).
const DESKTOP_SPANS = ['lg:col-span-3', 'lg:col-span-3', 'lg:col-span-4', 'lg:col-span-2']

export function Essencial() {
  return (
    <section aria-labelledby="essencial-title" className="page-x pb-10 lg:pb-16">
      <h2 id="essencial-title" className="sr-only">
        {copy.essencial.title}
      </h2>

      <dl className="border-t border-rule lg:grid lg:grid-cols-12">
        {copy.essencial.items.map((item, index) => (
          <div
            key={item.term}
            className={`grid grid-cols-[5.5rem_1fr] gap-4 border-b border-rule py-4 lg:block lg:border-b-0 lg:py-7 lg:pr-8 ${DESKTOP_SPANS[index]}`}
          >
            <dt className="text-[0.9375rem] text-mist">{item.term}</dt>
            <dd className="text-lg text-fog lg:mt-2 lg:text-xl">
              <Rich text={item.value} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
