import { useId, useState, type ReactNode } from 'react'

interface AccordionItemProps {
  question: string
  children: ReactNode
}

export function AccordionItem({ question, children }: AccordionItemProps) {
  const [open, setOpen] = useState(false)
  // useId gera um id único e estável, igual no servidor e no navegador.
  const id = useId()
  const buttonId = `${id}-pergunta`
  const panelId = `${id}-resposta`

  return (
    <div className="border-b border-rule">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((current) => !current)}
          className="flex w-full items-start justify-between gap-6 py-5 text-left text-lg font-semibold lg:py-6 lg:text-xl"
        >
          <span>{question}</span>
          <span aria-hidden="true" className="accordion-icon text-mist" data-open={open ? '' : undefined} />
        </button>
      </h3>

      <div id={panelId} className="accordion-panel" data-open={open ? '' : undefined} inert={!open}>
        <div className="overflow-hidden">
          <p className="max-w-[60ch] pb-6 text-mist">{children}</p>
        </div>
      </div>
    </div>
  )
}
