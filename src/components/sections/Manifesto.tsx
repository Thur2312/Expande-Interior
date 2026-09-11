import { copy } from '../../content/copy'
import { useReveal } from '../../hooks/useReveal'
import { Rich } from '../ui/Rich'

// Recuos diferentes para cada afirmação: o ritmo irregular é intencional.
const OFFSETS = [
  'max-w-[16ch] lg:max-w-[19ch]',
  'ml-10 max-w-[15ch] sm:ml-[12%] lg:ml-[36%] lg:max-w-[19ch]',
  'max-w-[12ch] lg:ml-[9%]',
]

function Statement({ text, className }: { text: string; className: string }) {
  const [ref, visible] = useReveal<HTMLParagraphElement>()

  return (
    <p ref={ref} data-visible={visible ? '' : undefined} className={`title-statement reveal ${className}`}>
      {text}
    </p>
  )
}

export function Manifesto() {
  return (
    <section aria-labelledby="manifesto-title" className="chapter page-x bg-wine py-20 lg:py-36">
      <h2 id="manifesto-title" className="sr-only">
        {copy.manifesto.title}
      </h2>

      <div className="flex flex-col gap-12 lg:gap-24">
        {copy.manifesto.statements.map((statement, index) => (
          <Statement key={statement} text={statement} className={OFFSETS[index] ?? ''} />
        ))}
      </div>

      <p className="mt-16 max-w-[42ch] text-mist lg:mt-28 lg:ml-[36%]">
        <Rich text={copy.manifesto.body} />
      </p>
    </section>
  )
}
