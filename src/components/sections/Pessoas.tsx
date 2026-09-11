import { site } from '../../config/site'
import { copy } from '../../content/copy'
import { isReady } from '../../content/pending'
import { Rich } from '../ui/Rich'

export function Pessoas() {
  const { title, intro, items } = copy.pessoas
  const ready = isReady([intro, ...items.flatMap((person) => [person.name, person.role])])
  if (!ready && !site.showPending) return null

  return (
    <section aria-labelledby="pessoas-title" className="page-x py-14 lg:grid lg:grid-cols-12 lg:gap-8 lg:py-24">
      <div className="lg:col-span-4">
        <h2 id="pessoas-title" className="title-section">
          {title}
        </h2>
        <p className="mt-4 max-w-[32ch] text-mist lg:mt-6">
          <Rich text={intro} />
        </p>
      </div>

      <ul className="mt-10 border-t border-rule lg:col-span-7 lg:col-start-6 lg:mt-2">
        {items.map((person, index) => (
          <li
            key={index}
            className="grid grid-cols-[3.5rem_1fr] items-center gap-4 border-b border-rule py-5 lg:grid-cols-[4.5rem_1fr] lg:gap-6"
          >
            {person.photo ? (
              <img
                src={person.photo}
                alt=""
                loading="lazy"
                className="aspect-square w-full rounded-sm object-cover grayscale"
              />
            ) : (
              <span aria-hidden="true" className="aspect-square w-full rounded-sm bg-night-raised" />
            )}

            {/* Nome e papel empilhados: na mesma linha eles colidem em 360px */}
            <div>
              <p className="font-serif text-[1.5rem] leading-tight font-medium lg:text-[1.875rem]">
                <Rich text={person.name} />
              </p>
              <p className="mt-1 text-[0.9375rem] text-mist lg:text-base">
                <Rich text={person.role} />
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
