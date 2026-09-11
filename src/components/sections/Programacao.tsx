import { site } from '../../config/site'
import { copy } from '../../content/copy'
import { isReady } from '../../content/pending'
import { Rich } from '../ui/Rich'

export function Programacao() {
  const { title, items } = copy.programacao
  const ready = isReady(items.flatMap((item) => [item.time, item.title, item.description]))
  if (!ready && !site.showPending) return null

  return (
    <section aria-labelledby="programacao-title" className="page-x py-14 lg:py-24">
      <h2 id="programacao-title" className="title-section">
        {title}
      </h2>

      {/* <ol> porque é uma sequência real no tempo. A ordem já está no horário, sem números decorativos. */}
      <ol className="mt-10 border-t border-rule lg:mt-16">
        {items.map((item, index) => (
          <li key={index} className="grid gap-1.5 border-b border-rule py-6 lg:grid-cols-12 lg:gap-8 lg:py-8">
            <p className="text-[0.9375rem] text-mist tabular-nums lg:col-span-2 lg:pt-1.5 lg:text-base">
              <Rich text={item.time} />
            </p>
            <h3 className="font-serif text-[1.5rem] leading-tight font-medium lg:col-span-5 lg:text-[1.875rem]">
              <Rich text={item.title} />
            </h3>
            <p className="text-mist lg:col-span-5 lg:pt-1.5">
              <Rich text={item.description} />
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}
