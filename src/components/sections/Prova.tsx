import { copy } from '../../content/copy'
import { isPending } from '../../content/pending'

/**
 * Prova social nunca é inventada nem fica com placeholder:
 * sem depoimento ou apoiador real, a seção não existe, nem em desenvolvimento.
 */
export function Prova() {
  const { title, testimonials, supportersLabel, supporters } = copy.prova
  const realTestimonials = testimonials.filter((item) => !isPending(item.quote) && !isPending(item.author))
  const realSupporters = supporters.filter((sponsor) => !isPending(sponsor.name))

  if (realTestimonials.length === 0 && realSupporters.length === 0) return null

  const hasTestimonials = realTestimonials.length > 0

  return (
    <section aria-labelledby="prova-title" className="page-x py-14 lg:py-20">
      {/* Sem depoimento, "Quem já participou" prometeria algo que a seção não mostra:
          o rótulo dos apoiadores vira o próprio título da seção. */}
      {hasTestimonials && (
        <h2 id="prova-title" className="title-section">
          {title}
        </h2>
      )}

      {hasTestimonials && (
        <div className="mt-10 flex flex-col gap-12 lg:mt-16 lg:gap-16">
          {realTestimonials.map((item, index) => (
            <figure key={item.author} className={index % 2 === 1 ? 'lg:ml-[33%]' : ''}>
              <blockquote className="max-w-[30ch] font-serif text-[1.5rem] leading-snug lg:text-[2rem]">
                {item.quote}
              </blockquote>
              <figcaption className="mt-4 text-mist">
                {item.author}, {item.role}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {realSupporters.length > 0 && (
        <div className={hasTestimonials ? 'mt-14 lg:mt-20' : ''}>
          {hasTestimonials ? (
            <p className="text-center text-mist">{supportersLabel}</p>
          ) : (
            <h2 id="prova-title" className="text-center text-mist">
              {supportersLabel}
            </h2>
          )}

          {/* Cada logo dentro de uma caixa de tamanho igual, centralizada: as artes têm margens e
              proporções diferentes, e altura fixa deixava umas grandes e outras minúsculas. */}
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-8 border-t border-rule pt-8 lg:grid lg:grid-cols-5 lg:gap-x-6 lg:pt-10">
            {realSupporters.map((sponsor) => {
              const logo = sponsor.logo ? (
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  loading="lazy"
                  className={`max-h-full max-w-full object-contain grayscale ${sponsor.invert ? 'invert' : ''}`}
                />
              ) : (
                <span className="text-center text-mist">{sponsor.name}</span>
              )
              const inner = 'flex h-full w-full items-center justify-center'

              return (
                <li
                  key={sponsor.name}
                  className="h-12 w-[calc((100%-2rem)/3)] opacity-80 transition-opacity duration-200 focus-within:opacity-100 hover:opacity-100 lg:h-16 lg:w-full"
                >
                  {/* Só vira link quando o endereço real chegar: hoje ainda é [[ ]] e levaria a uma página quebrada */}
                  {isPending(sponsor.url) ? (
                    <span className={inner}>{logo}</span>
                  ) : (
                    <a href={sponsor.url} target="_blank" rel="noopener noreferrer" className={inner}>
                      {logo}
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </section>
  )
}
