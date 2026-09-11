import { CtaButton } from './CtaButton'

interface StickyCtaProps {
  href: string
  visible: boolean
}

export function StickyCta({ href, visible }: StickyCtaProps) {
  return (
    <div
      className="sticky-cta fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-night px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
      data-hidden={visible ? undefined : ''}
      aria-hidden={!visible}
      // inert tira o botão da navegação por teclado enquanto está escondido.
      inert={!visible}
    >
      <CtaButton href={href} location="sticky" fullWidth />
    </div>
  )
}
