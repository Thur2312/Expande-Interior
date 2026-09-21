# Expande Interior — landing page

Este arquivo vale para todas as sessões do projeto. Se alguma skill de design ativa sugerir algo que contradiga este documento (scrollytelling, pin/scrub, efeitos cinematográficos), **este documento prevalece**.

## Projeto

- Cliente: Expande Interior (projeto da Horizon). Contato: Thácio Barbosa. Entrega: 17/09/2026
- Hipótese de trabalho: movimento/evento do ecossistema empreendedor do interior, com participação vendida na plataforma externa [[PLATAFORMA_DE_VENDA]]
- Função única da página: levar a pessoa até a plataforma de venda
- Impressão desejada, nas palavras do cliente: "movimento de vanguarda no ecossistema empreendedor local, a régua vai subir como um todo"
- O cliente rejeita: estética de summit de capital, estética de evento de prefeitura, neon, poluição visual
- Sentido do nome (confirmado pelo cliente): duplo. Expansão do interior como território e expansão interior do empresário, de dentro para fora
- Conceito: de dentro para fora em duas escalas. O empresário se expande por dentro e isso sobe a régua do interior como um todo

## Regras invioláveis

1. Nunca inventar dado factual (datas, valores, nomes, números, depoimentos). Usar placeholder visível `[[ ]]`
2. Todo texto mora em `src/content/copy.ts`. Nenhum texto dentro de JSX
3. Seção sem conteúdo real não renderiza. Nada de prova social inventada. Mecanismo: `showPending` no `config/site.ts` (true em desenvolvimento, false para publicar) + `isPending`/`isReady` em `content/pending.ts`. Hero, Essencial, Manifesto e Participar nunca somem: precisam de conteúdo real antes da publicação
4. Não recriar a logo em texto ou CSS e não alterar seus arquivos

## Stack

- Vite + React + TypeScript (`strict: true`)
- Tailwind CSS v4 via `@tailwindcss/vite`, tokens em `@theme`
- Sem biblioteca de animação. Hook próprio `useReveal` (IntersectionObserver + transição CSS)
- Fontes self-hosted via Fontsource, `font-display: swap`, preload apenas da fonte de título
- Deploy na Vercel

```
src/
  main.tsx  App.tsx
  styles/index.css        # @import "tailwindcss"; @theme
  config/site.ts          # SALES_URL, GTM_ID, flags (heroVariant, parenthesesMotion)
  content/copy.ts         # todo o texto, tipado
  components/sections/    # Header Hero Essencial Manifesto Video Programacao Pessoas Prova Participar Faq Footer
  components/ui/          # CtaButton StickyCta Parentheses VideoFacade Accordion
  components/brand/       # Monogram Orbits (SVG inline com currentColor)
  hooks/                  # useReveal useInView useSalesLink
  lib/analytics.ts
public/
  brand/  fonts/  images/  favicon.svg  og.jpg
```

## Marca

Fonte da verdade: arquivo .AI do cliente. Cores em sRGB.

| Arquivo em `public/brand/` | Uso |
|---|---|
| `logo-expande-fog.svg` | Header desktop e rodapé, via `<img>` |
| `logo-expande-wine.svg` | Reservado para fundos claros (não previstos nesta página) |
| `logo-expande.svg` | Versão `currentColor`, apenas para uso inline |
| `monograma-exin*.svg` | Header mobile e favicon |
| `orbitas.svg` | Elemento gráfico secundário, **no máximo uma aparição** na página |
| `selo-orbitas.svg` | Fora da página. Reservado para OG image ou redes |

- Arquivos com `currentColor` só funcionam inline. Em `<img>`, `currentColor` vira preto, por isso existem as variantes `-fog` e `-wine`
- A caixa-alta espaçada de "( INTERIOR )" é exclusiva da logo. Não usar esse estilo em nenhum outro texto
- Os parênteses são o dispositivo central da marca (o monograma "( ex IN )" prova isso). Na página, aparecem em dois ou três momentos, no máximo. Nunca em todo título

## Tokens de cor (contrastes já validados)

| Token | Hex | Papel |
|---|---|---|
| `night` | `#1A0A0D` | Fundo principal. Mesmo matiz do bordô (349°), quase preto |
| `night-raised` | `#271115` | Superfície elevada sutil |
| `wine` | `#66222E` | **Cor oficial.** Blocos-capítulo (Manifesto, Participar) |
| `fog` | `#D3D3D3` | **Cor oficial.** Texto principal e fundo do CTA |
| `fog-hover` | `#F2F2F2` | Hover do CTA |
| `mist` | `#B3ABAD` | Texto secundário |
| `rule` | `#3E282C` | Divisores funcionais |

| Combinação | Contraste | Veredito |
|---|---|---|
| `fog` sobre `night` | 12,83:1 | Texto principal |
| `fog` sobre `wine` | 7,65:1 | Texto nos blocos-capítulo |
| `wine` sobre `fog` (texto do CTA) | 7,65:1 | CTA |
| `mist` sobre `night` / `wine` | 8,55:1 / 5,10:1 | Texto secundário ok nos dois |
| `wine` sobre `night` | **1,68:1** | **Só como área. Nunca texto, ícone, borda ou linha** |

```css
@theme {
  --color-night: #1A0A0D;
  --color-night-raised: #271115;
  --color-wine: #66222E;
  --color-fog: #D3D3D3;
  --color-fog-hover: #F2F2F2;
  --color-mist: #B3ABAD;
  --color-rule: #3E282C;
  --radius-sm: 4px;
  --radius-md: 8px;
}
```

## Tipografia

- Títulos: **Piazzolla**, escolhida pela Horizon após teste em 360px e 1440px (reserva: Newsreader). Licença OFL
- Corpo e interface: **Fustat**, a mesma fonte da logo (`@fontsource-variable/fustat`, licença OFL)
- A tensão é intencional: serifa carrega o "clássico", Fustat carrega a "vanguarda" da marca
- Importar `@fontsource-variable/piazzolla/opsz.css`, não o pacote padrão: o padrão carrega só o eixo de peso e perde o tamanho óptico
- Corpo 18px desktop, 17px mobile, até ~70 caracteres por linha, entrelinha 1.6
- Título do hero fluido: 34px em 360px até 86px em 1440px (reduzido de 38–96px depois que a foto dos palestrantes entrou no hero — com 3 linhas em 96px o CTA saía da dobra em notebooks comuns)
- Peso do título: 600 no mobile, 500 a partir de 1024px (em tamanho grande o 600 pesa demais)
- Títulos alinhados à esquerda, entrelinha ~1.02, `text-wrap: balance` para evitar palavra sozinha na última linha

```css
@theme {
  --font-serif: "Piazzolla Variable", Georgia, serif;
  --font-sans: "Fustat Variable", system-ui, sans-serif;
}
.title-hero {
  font-family: var(--font-serif);
  font-size: clamp(2.125rem, 1.042rem + 4.81vw, 5.375rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.01em;
  text-wrap: balance;
  overflow-wrap: break-word;
}
@media (min-width: 1024px) { .title-hero { font-weight: 500; } }
```
- Sentence case em tudo

## Direção visual: "Manifesto assinado"

- Base `night` com o bordô entrando em blocos que funcionam como capítulos
- Fotos reais com tratamento único e consistente: P&B ou duotone `night`/`fog`. A decisão sai com as fotos reais na mão
- Assinatura: parênteses que se abrem a partir do centro no hero (único momento orquestrado da página). É a tradução visual de "de dentro para fora". Implementados com os vetores do monograma, em `wine`, grandes e emoldurando o título (cortados nas bordas no mobile). **Decisão da Horizon (11/09): parênteses se abrindo.** A opção `estatico` fica só no config, caso o cliente peça
- Órbitas: textura estática, grande e cortada, uma única vez. Nunca girando, nunca com brilho. Órbita em movimento é vocabulário de summit tech
- Forma: raio 4px em tags e inputs, 8px em botões e mídia. Profundidade por troca de superfície, sem sombra cinza

### Três armadilhas

1. **Bordô + serifa + clássico = escritório de advocacia, vinícola, formatura.** Proibido: dourado, ornamentos, filetes decorativos, vinhetas, textura de papel envelhecido. O que afasta isso: minúsculas da logo, Fustat, pessoas reais
2. **Folclore do interior = evento de prefeitura.** Proibido: cordel, xilogravura, mandacaru, chapéu de couro, texturas de barro ou couro. Orgulho do interior sem fantasia do interior
3. **Expansão interior = coach e autoajuda.** Proibido: "desperte seu potencial", "jornada", "mindset", "propósito", "sua melhor versão", foto de braços abertos, pôr do sol, topo de montanha. O tom é formal e sóbrio, não motivacional

## Copy e duplo sentido

- Nunca explicar o trocadilho ("o interior da região e o seu interior"). Explicado, ele vira slogan de mentoria
- A expressão literal "de dentro para fora" não aparece na copy. Quem diz isso é a animação dos parênteses
- Só o hero segura os dois sentidos. Essencial: território. Manifesto: ponte entre pessoa e região. Pessoas e Participar: indivíduo
- Texto de apoio do hero sempre concreto (o que é, para quem), nunca sentimental
- Título do hero: [[TITULO_HERO]]. Candidatos: "Tudo que o interior precisa já está aqui dentro." (recomendado), "Expandir sem sair daqui.", "A régua sobe quando cada um sobe."
- Proibido "Daqui para fora" (pode ser lido como sair do interior)

## Movimento

- Sutil. Um único momento orquestrado: parênteses abrindo no hero
- `useReveal` apenas em elementos pontuais, não em toda seção
- Animação responsiva a ação é bem-vinda: accordion abrindo, CTA sticky entrando
- `prefers-reduced-motion`: tudo desligado
- Proibido: pin, scrub, Lenis, parallax, SplitText letra a letra

## Anti-padrões

- Neon, glow, gradientes decorativos, mesh gradient, roxo/ciano "tech"
- Contador regressivo, "últimas vagas", urgência falsa
- Grade de palestrantes com foto redonda
- Parede de logos coloridos (apoiadores: monocromático e discreto)
- Banco de imagens, foto de palco ou plateia genérica
- Grade de cards idênticos
- Eyebrow em caixa-alta, labels em fonte mono, seta "→" em botão
- Destacar uma palavra do título com cor ou itálico
- Numeração 01/02/03 em conteúdo que não é sequência real
- Clichês de copy: "não é X, é Y" ("Não é um evento. É um movimento."), frases de três batidas ("Ideias. Pessoas. Futuro."), "transforme", "revolucione", "o maior evento", "não fique de fora"

## Conversão

- Logo após o hero, um bloco essencial responde: o que é, quando, onde, quanto
- Header sem CTA: ele dividia a primeira tela com o CTA do hero e o header não é fixo, então nunca era visto sozinho
- CTA sticky no mobile, aparecendo quando o hero sai da tela
- Perto de todo CTA de compra: aviso de que a pessoa vai para [[PLATAFORMA_DE_VENDA]] e formas de pagamento (cartão ou Pix)
- CTA com verbo que diz o que acontece: [[TEXTO_CTA]] (ex.: "Garantir minha vaga")
- `useSalesLink` repassa `utm_*` para o link da plataforma
- Todo CTA dispara `cta_click` com a localização

## Qualidade mínima

- Mobile-first, de 360px a 1920px. Nada que dependa de hover
- Foco de teclado visível, HTML semântico, um `h1`, `alt` descritivo
- Lighthouse mobile ≥ 90 em Performance e Acessibilidade
- Testar no navegador interno do Instagram e o preview do link no WhatsApp
- Vídeo com legenda (no celular, quase todo mundo assiste sem som)

## Modo didático

Thur está se profissionalizando em JavaScript/TypeScript. Ao fim de cada fase, registre em `APRENDIZADO.md` cada conceito técnico usado: o que é, o trecho real do código, por que foi feito assim e qual seria a alternativa. Durante a execução, comentários no código só onde a decisão não é óbvia, para não travar o ritmo.

## Processo

- Trabalhar por fases (ver `PROMPTS-POR-FASE.md`) e **parar ao fim de cada uma**
- Revisar visualmente com screenshots em 360, 768 e 1440 antes de declarar uma fase pronta
