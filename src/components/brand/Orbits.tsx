import { ORBITS_PATHS, ORBITS_VIEWBOX } from './orbitsPaths'

/** Órbitas do arquivo .AI. Regra da marca: no máximo uma aparição, estática. */
export function Orbits({ className }: { className?: string }) {
  return (
    <svg viewBox={ORBITS_VIEWBOX} fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      {ORBITS_PATHS.map((d) => (
        <path key={d.slice(0, 24)} d={d} />
      ))}
    </svg>
  )
}
