import { copy } from '../../content/copy'
import { pushEvent } from '../../lib/analytics'

export type CtaLocation = 'header' | 'hero' | 'sticky' | 'participar' | 'footer'

interface CtaButtonProps {
  href: string
  location: CtaLocation
  size?: 'md' | 'sm'
  fullWidth?: boolean
  className?: string
}

const SIZES = {
  md: 'min-h-13 px-7 text-[1.0625rem]',
  sm: 'min-h-10 px-5 text-[0.9375rem]',
} as const

export function CtaButton({ href, location, size = 'md', fullWidth = false, className = '' }: CtaButtonProps) {
  const classes = [
    'inline-flex items-center justify-center rounded-md bg-fog font-semibold text-wine',
    'transition-colors duration-200 hover:bg-fog-hover',
    SIZES[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <a
      href={href}
      data-cta={location}
      className={classes}
      onClick={() => pushEvent({ event: 'cta_click', cta_location: location })}
    >
      {copy.cta.label}
    </a>
  )
}
