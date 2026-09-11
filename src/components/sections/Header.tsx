export function Header() {
  return (
    <header className="relative z-20 px-4 py-5 sm:px-8 lg:px-[4vw] lg:py-7">
      <a href="#topo" aria-label="Expande Interior, voltar ao início" className="inline-flex">
        <img src="/brand/monograma-exin-fog.svg" alt="" width={74} height={36} className="h-9 w-auto lg:hidden" />
        <img src="/brand/logo-expande-fog.svg" alt="" width={162} height={44} className="hidden h-11 w-auto lg:block" />
      </a>
    </header>
  )
}
