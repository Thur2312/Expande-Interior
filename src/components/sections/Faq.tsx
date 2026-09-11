import { site } from '../../config/site'
import { copy } from '../../content/copy'
import { isPending } from '../../content/pending'
import { AccordionItem } from '../ui/AccordionItem'
import { Rich } from '../ui/Rich'

export function Faq() {
  // Pergunta com resposta pendente some antes da publicação; as prontas continuam.
  const items = site.showPending ? copy.faq.items : copy.faq.items.filter((item) => !isPending(item.answer))
  if (items.length === 0) return null

  return (
    <section aria-labelledby="faq-title" className="page-x py-20 lg:grid lg:grid-cols-12 lg:gap-8 lg:py-32">
      <h2 id="faq-title" className="title-section lg:col-span-4">
        {copy.faq.title}
      </h2>

      <div className="mt-10 border-t border-rule lg:col-span-7 lg:col-start-6 lg:mt-2">
        {items.map((item) => (
          <AccordionItem key={item.question} question={item.question}>
            <Rich text={item.answer} />
          </AccordionItem>
        ))}
      </div>
    </section>
  )
}
