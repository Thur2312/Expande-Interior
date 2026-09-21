import { site } from '../../config/site'
import { copy } from '../../content/copy'
import { isReady } from '../../content/pending'
import { Rich } from '../ui/Rich'

/**
 * Fotos entregues em enquadramentos bem diferentes (retrato fechado, corpo
 * inteiro, foto de palco bem aberta). object-cover sozinho não decide qual
 * parte da foto mostrar quando ela sobra muito pra um lado — esse ajuste por
 * arquivo é o "pra onde olhar" de cada uma, calibrado à mão.
 */
const PHOTO_ADJUST: Record<string, string> = {
  '/images/palestrantes/Christyan.jpg': 'object-top',
  '/images/palestrantes/SAMUEL.jpg': 'object-[8%_center]',
  '/images/palestrantes/LUIZA.jpg': 'scale-[1.7] origin-[50%_18%]',
  '/images/palestrantes/TARCISIO.jpg': 'scale-[1.65] origin-[44%_27%]',
}

export function Palestrantes() {
  const { title, intro, items } = copy.palestrantes
  const ready = isReady([intro, ...items.flatMap((speaker) => [speaker.name, speaker.role, speaker.bio])])
  if (!ready && !site.showPending) return null

  return (
    <section aria-labelledby="palestrantes-title" className="page-x py-14 lg:grid lg:grid-cols-12 lg:gap-8 lg:py-24">
      {/* sticky só no desktop: o título acompanha a lista longa em vez de deixar a coluna vazia */}
      <div className="lg:sticky lg:top-24 lg:col-span-4 lg:self-start lg:pr-10">
        <h2 id="palestrantes-title" className="title-section">
          {title}
        </h2>
        <p className="mt-5 max-w-[34ch] font-serif text-[1.25rem] leading-snug text-fog lg:mt-8 lg:max-w-none lg:text-[clamp(1.25rem,0.5rem+1vw,1.625rem)]">
          <Rich text={intro} />
        </p>
      </div>

      <ul className="mt-10 border-t border-rule lg:col-span-8 lg:col-start-5 lg:mt-2">
        {items.map((speaker, index) => (
          <li
            key={index}
            className={`grid grid-cols-[6rem_1fr] items-start gap-5 border-b border-rule py-8 lg:grid-cols-[11rem_1fr] lg:gap-9 lg:py-10 ${
              index % 2 === 1 ? 'lg:pl-12' : ''
            }`}
          >
            {/* O link é só na foto: um clique discreto, não um botão "ver perfil" */}
            {speaker.photo && speaker.social ? (
              <a
                href={speaker.social}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Perfil de ${speaker.name}`}
                className="block aspect-[3/4] w-full overflow-hidden rounded-sm"
              >
                <img
                  src={speaker.photo}
                  alt=""
                  loading="lazy"
                  className={`h-full w-full object-cover grayscale transition-opacity duration-200 hover:opacity-75 ${PHOTO_ADJUST[speaker.photo] ?? ''}`}
                />
              </a>
            ) : speaker.photo ? (
              <span className="block aspect-[3/4] w-full overflow-hidden rounded-sm">
                <img
                  src={speaker.photo}
                  alt=""
                  loading="lazy"
                  className={`h-full w-full object-cover grayscale ${PHOTO_ADJUST[speaker.photo] ?? ''}`}
                />
              </span>
            ) : (
              <span aria-hidden="true" className="aspect-[3/4] w-full rounded-sm bg-night-raised" />
            )}

            <div className="lg:pt-1">
              <p className="font-serif text-[1.75rem] leading-tight font-medium lg:text-[2.25rem]">
                <Rich text={speaker.name} />
              </p>
              <p className="mt-1.5 text-[0.9375rem] text-fog/70 lg:text-base">
                <Rich text={speaker.role} />
              </p>
              <p className="mt-3 max-w-[50ch] text-[0.9375rem] text-mist lg:text-lg">
                <Rich text={speaker.bio} />
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
