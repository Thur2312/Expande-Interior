import { PAREN_LEFT, PAREN_RIGHT } from './parenthesesPaths'

interface ParenProps {
  side: 'left' | 'right'
  className?: string
}

/** Parênteses extraídos do monograma "( ex IN )" do arquivo .AI da marca. */
export function Paren({ side, className }: ParenProps) {
  return (
    <svg viewBox="0 0 69 188" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d={side === 'left' ? PAREN_LEFT : PAREN_RIGHT} />
    </svg>
  )
}
