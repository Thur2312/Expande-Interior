# Aprendizado — Fases 0 e 1

Cada conceito com o trecho real do projeto, o porquê e a alternativa.

---

## 1. Tailwind v4: `@theme` transforma tokens em classes

```css
@theme {
  --color-wine: #66222E;
  --font-serif: "Piazzolla Variable", Georgia, serif;
}
```

**O que acontece:** toda variável com prefixo `--color-` vira utilitário automaticamente: `bg-wine`, `text-wine`, `border-wine`. `--font-serif` vira `font-serif`. No v3, isso ficava no `tailwind.config.js`; no v4, fica no próprio CSS.

**Por quê:** o token existe em um lugar só. Mudou o hex, mudou a página inteira, e a variável também fica disponível no CSS puro (`var(--color-wine)`).

---

## 2. Bug real desta fase: ordem das classes não resolve conflito

O primeiro screenshot mostrou o botão do header aparecendo no celular, mesmo com `hidden lg:inline-flex`:

```tsx
const classes = ['inline-flex ...', className] // className = 'hidden lg:inline-flex'
```

**Por que falhou:** `inline-flex` e `hidden` mexem na mesma propriedade (`display`). Quem ganha **não é a ordem no atributo `class`**, é a ordem em que as regras aparecem no CSS gerado. O Tailwind gerou `inline-flex` depois de `hidden`, e ele venceu.

**Como evitar:** não passar para um componente classes que brigam com as classes internas dele. Ou esconder pelo elemento pai (`<div className="hidden lg:block">`). Em projetos maiores, a biblioteca `tailwind-merge` resolve isso automaticamente.

---

## 3. Fontes: `opsz.css` e tamanho óptico

```ts
import '@fontsource-variable/piazzolla/opsz.css'
```

**O que é:** a Piazzolla tem dois eixos, peso (`wght`) e tamanho óptico (`opsz`). O navegador ajusta sozinho o desenho conforme o tamanho da letra, mas só se o arquivo tiver o eixo. O `import '@fontsource-variable/piazzolla'` padrão carrega **só o peso**.

**Alternativa:** Google Fonts via `<link>`. Funciona, mas depende de servidor externo e piora a privacidade (LGPD) e a performance.

---

## 4. `clamp()`: tamanho fluido com equação de reta

```css
font-size: clamp(2.375rem, 1.167rem + 5.37vw, 6rem);
```

Formato: `clamp(mínimo, valor fluido, máximo)`. Para o valor fluido, queremos 38px em 360px de tela e 96px em 1440px:

- inclinação = (96 − 38) ÷ (1440 − 360) = 0,0537 → **5.37vw**
- ponto de partida = 38 − 0,0537 × 360 = 18,67px → **1.167rem**

Conferindo em 1440px: 18,67 + 77,33 = 96px.

**Por que `rem` na parte fixa:** se fosse tudo em `vw`, o zoom do navegador não aumentaria o título. É acessibilidade.

---

## 5. Generics: o mesmo hook para qualquer elemento

```ts
export function useInView<T extends Element>(...) {
  const ref = useRef<T | null>(null)
  ...
}

const [heroRef, heroInView] = useInView<HTMLElement>()
```

**O que é:** `T` é um tipo que só é decidido quando você usa a função. `extends Element` limita: pode ser `HTMLElement`, `HTMLParagraphElement`, mas não `string`. Assim o `ref` sai com o tipo exato do elemento onde vai ser usado, e o TypeScript reclama se você colocar um ref de `<p>` num `<section>`.

Outro exemplo, em `preview.ts`:

```ts
function pick<T extends string>(value: string | null, allowed: readonly T[], fallback: T): T {
  return allowed.find((option) => option === value) ?? fallback
}
```

Qualquer texto que chegue da URL (`string | null`) sai dali como `'a' | 'b'`, garantido.

---

## 6. `useEffect` com cleanup e IntersectionObserver

```ts
useEffect(() => {
  const observer = new IntersectionObserver(([entry]) => { ... })
  observer.observe(element)
  return () => observer.disconnect()
}, [once, rootMargin, threshold])
```

**IntersectionObserver:** avisa quando um elemento entra ou sai da tela. Substitui o antigo `window.addEventListener('scroll')`, que roda dezenas de vezes por segundo e trava a rolagem.

**Cleanup (a função do `return`):** roda quando o componente sai da tela ou antes do efeito rodar de novo. Sem ele, cada remontagem deixaria um observer vivo. Em desenvolvimento, o `StrictMode` monta tudo duas vezes justamente para você perceber cleanups faltando.

---

## 7. React 19: `ref` como prop comum

```tsx
export function Hero({ config, ref }: HeroProps) {
  return <section ref={ref}>...</section>
}
```

**Antes (React 18):** precisava envolver o componente em `forwardRef`. **Agora:** `ref` chega como qualquer outra prop.

---

## 8. Um bug que o linter pegou

A primeira versão do `useReveal` devolvia um objeto `{ ref, className, 'data-visible' }`. O linter do React Compiler reclamou: ler propriedades de um objeto que contém ref durante a renderização parece acesso ao ref.

**Correção:** devolver a tupla `[ref, visible]`, igual ao `useInView`. Refs são para o DOM, não para decidir o que renderizar.

---

## 9. `Promise.race` e o duplo `requestAnimationFrame`

```ts
Promise.race([document.fonts.ready, timeout]).then(() => {
  frameId = requestAnimationFrame(() => {
    frameId = requestAnimationFrame(() => setReady(true))
  })
})
```

**`Promise.race`:** resolve com a primeira promessa que terminar. Se a fonte demorar mais que 1,5s, a animação começa mesmo assim.

**Dois frames:** uma transição CSS só acontece se o navegador **pintar o estado inicial** antes da mudança. Com um frame só, às vezes ele junta as duas mudanças e o elemento aparece já no estado final, sem animar.

---

## 10. Atributos `data-*` como estado para o CSS

```tsx
<section data-motion="abrindo" data-ready={fontsReady ? '' : undefined}>
```

```css
[data-motion="abrindo"]:not([data-ready]) .hero-paren--left {
  transform: translateX(24vw);
  opacity: 0;
}
```

**Por quê:** o React só diz **em que estado** a página está; o CSS decide **como** isso aparece. Passar `undefined` remove o atributo do HTML, e aí o `:not([data-ready])` funciona.

---

## 11. `inert` e `aria-hidden` no CTA fixo

```tsx
<div aria-hidden={!visible} inert={!visible}>
```

**Problema:** o CTA fixo sai da tela com `transform`, mas continua no HTML. Sem `inert`, quem navega por teclado cairia num botão invisível. `inert` tira o elemento da navegação e do clique; `aria-hidden` o esconde de leitores de tela.

---

## 12. `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  [data-motion] .hero-paren { transform: none !important; opacity: 1 !important; }
}
```

Pessoas com labirintite ou sensibilidade a movimento ativam essa opção no sistema. Testado nesta fase: com ela ativa, parênteses e texto já aparecem no lugar.

---

## 13. `public/` e `src/assets/`, e o `currentColor` em `<img>`

- **`public/`:** o arquivo vai para o site com o mesmo nome (`/brand/logo-expande-fog.svg`). Bom para logo, favicon e OG image, que precisam de endereço fixo
- **`src/assets/`:** o Vite processa o arquivo e coloca um hash no nome (`logo-a8f3c.svg`), o que ajuda no cache

`fill="currentColor"` herda a cor do CSS **só quando o SVG está dentro do HTML**. Dentro de `<img>`, o SVG é um documento isolado, `currentColor` vira preto. Por isso existem as versões `-fog` e `-wine` com a cor fixa.

---

## 14. `URLSearchParams`: comparar opções sem novo deploy

```ts
const params = new URLSearchParams(window.location.search)
params.get('titulo') // 'b' em ?titulo=b
```

Com isso, o mesmo link publicado mostra qualquer combinação: `?titulo=b&parenteses=estatico`. Na Fase 3, a mesma API repassa as UTMs para a plataforma de venda.

---

# Fase 2

## 15. Estado derivado: a página descobre sozinha o que está pendente

```ts
export function isPending(text: string): boolean {
  return text.includes('[[')
}

const ready = isReady(items.flatMap((item) => [item.time, item.title, item.description]))
if (!ready && !site.showPending) return null
```

**Alternativa ruim:** uma flag manual por seção (`programacaoPronta: true`). Alguém esquece de trocar e a página publica com placeholder. Aqui, a informação é **derivada** do próprio conteúdo: se ainda tem `[[`, não está pronto. Uma fonte de verdade só.

`flatMap` transforma a lista de itens numa lista plana de textos: `[{a, b}, {a, b}]` vira `[a, b, a, b]`.

## 16. Componente que devolve `null`

Um componente React pode devolver `null` e não renderizar nada. É o jeito mais simples de esconder uma seção inteira: nenhum HTML vazio fica na página, e o `<h2>` dela não aparece para leitores de tela.

## 17. Facade de vídeo

O iframe do YouTube baixa perto de 1MB de JavaScript e grava cookies, mesmo que ninguém dê play. O facade mostra só uma capa com botão; o iframe só existe depois do clique.

```tsx
const [playing, setPlaying] = useState(false)

useEffect(() => {
  if (playing) iframeRef.current?.focus()
}, [playing])
```

Dois detalhes: o domínio `youtube-nocookie.com` reduz o rastreamento (importante para LGPD), e o `useEffect` que reage a `playing` move o foco para o player, senão quem usa teclado fica com o foco num botão que sumiu.

## 18. `useId` e a ligação entre pergunta e resposta

```tsx
const id = useId()
<button aria-expanded={open} aria-controls={`${id}-resposta`}>
<div id={`${id}-resposta`}>
```

`aria-controls` diz ao leitor de tela qual painel o botão abre, e `aria-expanded` diz se está aberto. Os ids precisam ser únicos na página; `useId` garante isso sem você inventar nomes.

## 19. Animar altura sem saber a altura

`height: auto` não anima em CSS. O truque moderno é animar a linha de um grid:

```css
.accordion-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 320ms; }
.accordion-panel[data-open] { grid-template-rows: 1fr; }
```

O filho precisa de `overflow: hidden`. E o painel fechado recebe `inert`: visualmente ele tem altura zero, mas sem `inert` um link lá dentro ainda receberia foco.

## 20. Duas condições para o CTA fixo

```ts
const showSticky = !heroInView && !participarInView
```

O CTA fixo só aparece quando **nenhum** CTA grande está na tela. Dois `useInView` independentes, uma expressão booleana. Pela lei de De Morgan, é o mesmo que `!(heroInView || participarInView)`.

## 21. Seletor de irmão adjacente

```css
.chapter + .chapter { margin-top: 5rem; }
```

`A + B` seleciona B **somente se** vier logo depois de A. Quando as seções entre Manifesto e Participar estão ocultas, os dois blocos bordô ficam colados, e essa regra separa os dois. Com as seções visíveis, a regra simplesmente não se aplica.

## 22. Semântica e números

- `<ol>` na programação: é uma sequência real no tempo, então a lista é ordenada no HTML, mesmo sem mostrar 1, 2, 3
- `tabular-nums`: todos os algarismos com a mesma largura, então horários ficam alinhados na vertical

## 23. Cor com transparência no Tailwind v4

```tsx
<ul className="border-t border-fog/20">
```

`/20` aplica 20% de opacidade à cor do token. No v4, isso vira `color-mix(in oklab, var(--color-fog) 20%, transparent)`, que funciona com qualquer variável do `@theme`.

---

# Fase 3

## 24. Declarar uma propriedade global em `window`

```ts
declare global {
  interface Window {
    dataLayer: unknown[]
  }
}
```

**O que é:** `window.dataLayer` não existe no tipo padrão do DOM — é o Google Tag Manager que cria esse array em runtime. Sem essa declaração, o TypeScript recusa `window.dataLayer.push(...)` porque a propriedade "não existe". `declare global { interface Window { ... } }` faz *merge* com a interface `Window` que já existe na lib do TypeScript, em vez de criar um tipo novo. É por isso que `interface` (não `type`) é obrigatório aqui: só interfaces fazem merge.

**Alternativa:** `(window as any).dataLayer`. Funciona, mas qualquer typo no nome do campo do evento passa direto sem aviso.

## 25. União discriminada: só estes eventos podem ser enviados

```ts
export type AnalyticsEvent = { event: 'cta_click'; cta_location: CtaLocation }

export function pushEvent(event: AnalyticsEvent): void {
  window.dataLayer.push(event)
}
```

**O que é:** hoje só existe um evento, mas a forma já é pensada para crescer: `type AnalyticsEvent = CtaClick | Consent | Outro`, cada um com o campo `event` como um valor literal diferente (`'cta_click'`, `'consent'`...). Esse campo compartilhado com valores literais diferentes é o "discriminante" — é o que o TypeScript usa para saber, dentro de um `if (event.event === 'cta_click')`, quais outros campos aquele evento tem.

**Por quê:** sem a união, `pushEvent('qualquercoisa', {...})` aceitaria qualquer string como nome de evento. Com ela, só passa quem está na lista, e o campo `cta_location` só é exigido (e só existe) quando `event` é `'cta_click'`.

## 26. `gtag()`: o shim de duas linhas do Consent Mode

```ts
function gtag(...args: unknown[]): void {
  window.dataLayer.push(args)
}
gtag('consent', 'default', { ad_storage: 'denied', ... })
```

**O que é:** o Google documenta o Consent Mode v2 em torno de uma função chamada `gtag()`, mas ela não precisa vir de lib nenhuma — é só uma função que empilha os argumentos recebidos (via **rest parameters**, `...args`) no `dataLayer`. O GTM sabe interpretar um array cujo primeiro item é `'consent'`.

**Por que isso importa mais que parecer:** esse comando de consentimento **padrão** precisa rodar *antes* do script do GTM carregar (em `initGtm`, a ordem das chamadas é o que garante isso). Se o GTM carregar primeiro, ele pode disparar uma tag de analytics antes de saber que o consentimento está negado.

## 27. Estado inicial "preguiçoso" para evitar um flash

```tsx
function readSavedChoice(): Choice | null { ... }
const [choice, setChoice] = useState<Choice | null>(readSavedChoice)
```

**O que é:** passar uma **função** para `useState` (em vez de um valor) faz o React chamá-la só uma vez, antes da primeira renderização. Nesta fase isso corrigiu um aviso real do linter: a primeira versão lia o `localStorage` dentro de um `useEffect` e chamava `setState` em seguida — o linter (`react/set-state-in-effect`) reclamou porque isso força uma renderização extra para um valor que já podia ter sido calculado antes da primeira. Com o inicializador preguiçoso, o banner de cookies nunca aparece piscando para quem já decidiu antes.

**Regra que fica:** `useEffect` é para sincronizar com sistemas externos (aqui, mandar o consentimento salvo para o GTM outra vez a cada carregamento) — não para copiar um valor externo para dentro do `useState`.

## 28. Multi-page no Vite: duas entradas, dois `main`

```ts
// vite.config.ts
build: {
  rollupOptions: {
    input: {
      main: resolve(import.meta.dirname, 'index.html'),
      privacidade: resolve(import.meta.dirname, 'privacidade.html'),
    },
  },
}
```

**O que é:** o Vite, por padrão, só empacota o `index.html` da raiz. Quando uma página não faz parte da SPA em `App.tsx` (aqui, a política de privacidade, que nem carrega o roteador nem depende de estado da página principal), a solução mais simples não é criar uma rota — é dar ao Vite um segundo par HTML + script de entrada (`privacidade.html` → `src/privacidade.tsx`), e listar os dois em `rollupOptions.input`. Cada entrada gera seu próprio JS, então a página de privacidade não carrega nada da Hero, do GTM ou do resto da SPA.

## 29. Por que `og:image` e o `JSON-LD Event` continuam pendentes

Duas pendências que **não** foram resolvidas nesta fase, de propósito, e por que isso é a decisão certa (não um item esquecido):

- **`og:image`:** precisa de uma arte final 1200×630 e de um domínio publicado para o link ser absoluto. Nenhum dos dois existe ainda.
- **JSON-LD `Event`:** exigiria `startDate`, `location` e outros campos como *dados estruturados* — e a Regra 1 do `CLAUDE.md` proíbe inventar data, valor ou local. Além disso, o evento em si ainda é hipótese de trabalho, não fato confirmado.

Marcar como "pendente" em vez de preencher com qualquer coisa é a mesma lógica do `isPending`/`isReady` (item 15): a página (e o `<head>`) só afirma o que já é real.

---

## 30. `heroVariant`: alternar layout inteiro por config, não por `if` espalhado

```tsx
const isFoto = config.heroVariant === 'foto'

<section className={`... ${isFoto ? 'items-end' : 'items-center'}`}>
  {isFoto ? <FundoComFoto /> : <Parenteses />}
  <div className="hero-copy ...">{/* título e CTA, iguais nos dois casos */}</div>
</section>
```

**O que é:** as duas variantes do Hero (a antiga, tipográfica, e a nova, com foto) dividem o mesmo componente. Só o que muda de fato — o fundo e o alinhamento vertical — fica atrás do `isFoto`; título, CTA e nota de rodapé são escritos uma vez só.

**Por quê essa forma:** a alternativa seria dois componentes (`HeroFoto` e `HeroTipografico`) escolhidos no `App.tsx`. Isso duplicaria a lógica de `useFontsReady`, o `id="topo"` e a estrutura do `<h1>` — e um ajuste de copy exigiria mexer em dois arquivos. Um componente com um branch interno é preferível quando as variantes compartilham a maior parte do JSX; vale trocar para dois componentes só se as variantes divergirem tanto que o branch vire um emaranhado de `isFoto ? ... : ...` em quase toda linha.

## 31. `object-fit: cover` recorta por igual dos dois lados opostos ao `object-position`

```html
<img className="h-full w-full object-cover object-bottom lg:object-top" />
```

**O que é:** com `object-cover`, o navegador escala a imagem até cobrir a caixa inteira e depois corta o excesso. `object-position` decide **de qual lado** vem o corte — `object-bottom` mantém a base da imagem e corta por cima; `object-top` faz o oposto.

**O problema real que isso resolveu:** a foto (colagem de 5 pessoas, quase quadrada) precisa cobrir uma seção bem mais larga que alta no desktop. Com `object-bottom` em todas as larguras, as cabeças das duas pessoas do fundo saíam cortadas no topo em telas largas (conferido por screenshot em 1440px). Trocar para `object-top` só a partir do `lg:` resolve porque nesse breakpoint a seção é proporcionalmente mais larga (corta pernas, que importam menos que rosto); no mobile, a seção é mais alta que larga e `object-bottom` já enquadrava todo mundo.

**Alternativa que existia e foi descartada:** `object-contain` nunca corta, mas sobra fundo (`night`) visível nas laterais em telas largas — o que contradiz o "sangria total" (foto ocupando 100% da largura) combinado para essa variante.

*(Revisado depois: a variante full-bleed foi trocada pela do item 32 — a foto pequena, centralizada, não precisa mais de `object-cover`/recorte nenhum.)*

## 32. Encadear animações com `transition-delay`, sem JavaScript

```css
.hero-paren { transition: transform 1200ms var(--ease-out-soft), opacity 900ms ease-out; }
.hero-photo { transition: opacity 700ms ease-out 1250ms, transform 700ms var(--ease-out-soft) 1250ms; }
```

**O que é:** os parênteses começam a animar em `t=0` e terminam por volta de `t=1200ms`. A foto tem um **delay** (o quarto valor da propriedade `transition`) de `1250ms` — ou seja, ela só começa a mudar de `opacity`/`transform` depois que os parênteses já terminaram. As duas animações são independentes (nenhuma "espera" a outra em JavaScript); elas só têm relógios deslocados.

**Por quê essa forma:** o pedido foi "a foto aparece depois que a animação das aspas termina". Como as duas animações já são puramente CSS (disparadas pelo atributo `data-ready` no `<section>`), a forma mais simples de sequenciar é dar à segunda um delay maior que a duração total da primeira — sem precisar de `onTransitionEnd`, `setTimeout` ou estado extra em React. O preço é que o tempo fica "chumbado" no CSS: se a duração dos parênteses mudar, o delay da foto precisa ser ajustado à mão junto.

**Alternativa mais robusta (não usada aqui):** ouvir o evento `transitionend` do parêntese em JS e só então adicionar a classe que revela a foto. Mais correto se as durações fossem dinâmicas, mas overkill para uma animação de entrada que só acontece uma vez por carregamento.
