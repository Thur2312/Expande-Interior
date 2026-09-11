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

  return (
    <section aria-labelledby="prova-title" className="page-x py-14 lg:py-24">
      <h2 id="prova-title" className="title-section">
        {title}
      </h2>

      {realTestimonials.length > 0 && (
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
        <div className="mt-14 border-t border-rule pt-6">
          <p className="text-[0.9375rem] text-mist">{supportersLabel}</p>
          <ul className="mt-4 flex flex-wrap items-center gap-x-10 gap-y-4">
            {realSupporters.map((sponsor) => (
              <li key={sponsor.name}>
                <a
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-lg text-mist transition-colors duration-200 hover:text-fog"
                >
                  {sponsor.logo ? (
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      loading="lazy"
                      className="h-6 w-auto grayscale opacity-80 transition-opacity duration-200 hover:opacity-100 lg:h-7"
                    />
                  ) : (
                    sponsor.name
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
