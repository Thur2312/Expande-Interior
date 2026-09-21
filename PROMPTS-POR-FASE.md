# Prompts por fase — Expande Interior

**Status (11/09):** Fases 0, 1, 2 e 3 (essencial + extras) concluídas. Hero tipográfico, parênteses se abrindo (decidido), títulos A e B aguardando escolha do cliente. Todas as seções construídas com placeholders. `useSalesLink` repassa UTMs, `cta_click` dispara para o `dataLayer` em todo CTA, GTM entra assim que o cliente enviar o Container ID (`site.gtmId`), Consent Mode v2 com banner (aceitar/recusar com o mesmo peso) e `privacidade.html` como segunda entrada do Vite. A emenda night/wine entre os blocos-capítulo (Manifesto e Participar) agora tem uma régua de 1px (`.chapter { border-block }`), marcando quebra de capítulo em vez de corte seco de cor.

Duas seções novas, fora do escopo original do `CLAUDE.md`, adicionadas a pedido do Thur — mesma gramática visual de "Pessoas por trás" (lista editorial, foto pequena em tons de cinza, sem grade nem foto redonda, para não cair em estética de summit):
- **Palestrantes ("Quem apresenta")**, entre Programação e Pessoas: convidados externos, com bio curta e a foto linkando para a rede social da pessoa (só a foto, não o card inteiro)
- **Patrocinadores**, dentro de Prova: `prova.supporters` deixou de ser `string[]` e virou `{ name, url, logo }[]` — logo em tons de cinza linkando pro site/rede do apoiador; sem logo ainda, aparece o nome em texto. Continua só renderizando com conteúdo real

**Status (17/09):** Variante `heroVariant: 'foto'` implementada e ativada por padrão. Revisada no mesmo dia: em vez de foto full-bleed, os parênteses voltaram a se abrir normalmente (assinatura preservada) e a colagem dos 5 palestrantes (`/images/hero-palestrantes.png`) aparece pequena e centralizada, por cima do fundo, com uma leve emenda pro `night` na base (`.hero-photo` em `index.css`) — o título continua alinhado à esquerda, logo abaixo. A foto só aparece depois que a animação dos parênteses termina (`transition-delay` maior que a duração deles). Tamanho final a pedido do Thur (640px no desktop, 520px tablet, 420px mobile) com espaçamento comprimido (`py`, sobreposição foto/título, `mt` do bloco de CTA) pra caber sem empurrar o botão pra fora da tela em 1440×900. Abaixo de ~820px de altura de viewport o CTA passa a exigir rolagem — não tem mais margem de compressão sem cortar linha do título ou a foto. Variante `tipografico` (sem foto) continua no config, acessível por `?hero=tipografico`. 5 fotos de palestrantes conectadas em `copy.ts` (Christyan, Luiza, Samuel, Tarcísio, Thácio) — nome parcial (falta sobrenome), cargo e bio ainda como `[[ ]]`.

Pendente: ícones minimalistas do briefing (entram com os itens reais de "O que está incluso"), sobrenome/cargo/bio/rede social dos 5 novos palestrantes, confirmar se "Thácio" da foto é Thácio Barbosa (contato do projeto), comprimir `LUIZA.jpg` (5,4 MB — muito acima do aceitável para Lighthouse mobile) e os demais JPGs de palestrantes para WebP, `og:image` e domínio final (faltam a arte 1200×630 e o domínio publicado), JSON-LD `Event` (hipótese de evento ainda não confirmada) e Fase 4.

Cole um prompt por vez no Claude Code. O `CLAUDE.md` já tem todas as regras; os prompts só dizem o que fazer agora.

---

## Fase 0 — Setup

```
Leia o CLAUDE.md. Execute a Fase 0:

1. Crie o projeto Vite com React + TypeScript (strict) na raiz atual
2. Instale e configure Tailwind v4 com @tailwindcss/vite e declare os tokens do CLAUDE.md em @theme
3. Instale @fontsource-variable/fustat (corpo e interface) e @fontsource-variable/piazzolla (títulos).
   Importe piazzolla/opsz.css, não o index, para manter o tamanho óptico
4. Os arquivos de public/brand/ e public/favicon.svg já estão no projeto. Referencie o favicon no index.html
5. Crie a estrutura de pastas do CLAUDE.md, com config/site.ts e content/copy.ts tipados e cheios de placeholders [[ ]]
6. index.html: lang="pt-BR", title, description e og:* estáticos com placeholders
7. App.tsx provisório: fundo night, logo-expande-fog.svg, um título na serifada e um parágrafo em Fustat

Pare ao terminar e crie o APRENDIZADO.md cobrindo: plugin do Tailwind no Vite, @theme, Fontsource,
diferença entre public/ e src/assets, e por que currentColor não funciona em <img>.
```

**Pronto quando:** `npm run dev` mostra as duas fontes corretas sobre o fundo `night`, e `npm run build` passa sem erro.

---

## Fase 1 — Proposta de direção (vai para o cliente)

```
Leia o CLAUDE.md. Execute a Fase 1.

Antes de codar, escreva um plano curto (escala tipográfica aplicada, composição do hero em mobile e desktop)
e revise contra o CLAUDE.md: se algo parecer o que você faria para qualquer landing de evento, troque e diga por quê.
Depois construa, sem parar entre plano e código:

1. Header: monograma no mobile, logo no desktop, CTA pequeno
2. Hero com duas variantes controladas por config.heroVariant:
   - "foto": foto real em sangria total, título por cima, scrim escuro só na faixa do texto
   - "tipografico": sem foto, título em serifa muito grande com os parênteses como elemento principal
3. Parênteses com duas opções controladas por config.parenthesesMotion:
   - "abrindo": no carregamento, os parênteses se afastam do centro revelando o título (única animação orquestrada)
   - "estatico": parênteses parados, compondo o título
4. Bloco Essencial logo após o hero: o que é, quando, onde, quanto
5. Manifesto em bloco wine (capítulo)
6. CtaButton (fundo fog, texto wine, hover fog-hover) e StickyCta no mobile, entrando quando o hero sai da tela
7. Copy provisória no tom manifesto, respeitando a lista de clichês proibidos

Tire screenshots em 360 e 1440 das 4 combinações (2 heros x 2 movimentos) e pare.
Atualize o APRENDIZADO.md (IntersectionObserver, useRef, useEffect com cleanup, prefers-reduced-motion, tipagem do config).
```

Wireframe mobile (prioridade):
```
┌────────────────────────┐
│ (ex IN)      [Garantir]│
│                        │
│  foto vertical P&B     │
│                        │
│                        │
│ Título-manifesto       │
│ em serifa, 3–4         │
│ linhas                 │
│                        │
│ [   Garantir vaga    ] │
├────────────────────────┤
│ O que é    uma frase   │
│ Quando     [[DATA]]    │
│ Onde       [[LOCAL]]   │
│ Quanto     [[VALOR]]   │
└────────────────────────┘
```

Wireframe desktop:
```
┌──────────────────────────────────────────────────────────┐
│ expande (interior)                       [Garantir vaga] │
│                                                          │
│   foto real em sangria total                             │
│                                                          │
│  (  Título-manifesto em serifa                           │
│     muito grande, 2 a 3 linhas  )                        │
│                                                          │
│  Frase de apoio curta                  [Garantir vaga]   │
├──────────────────────────────────────────────────────────┤
│ O que é ...     Quando ...     Onde ...     Quanto ...   │
└──────────────────────────────────────────────────────────┘
```

**Pronto quando:** as 4 combinações estão navegáveis, o `prefers-reduced-motion` desliga a animação e os screenshots estão salvos para enviar ao cliente.

---

## Fase 2 — Seções restantes

```
Leia o CLAUDE.md. A direção aprovada foi: título [[a|b]], parênteses abrindo.
Fixe as escolhas no config/site.ts (mantenha a leitura da URL só em desenvolvimento).
Se a foto do hero tiver chegado, implemente a variante com foto antes de seguir. Depois execute a Fase 2:

1. Vídeo: VideoFacade com poster e play por clique, iframe só carrega após o clique, legendas ativas
2. Programação: agenda tipográfica. Numeração só se for sequência cronológica real
3. Pessoas por trás: lista editorial com nome em serifa e papel em Fustat, foto pequena sempre visível
   no mobile (nada dependente de hover). No mobile o papel fica abaixo do nome, na mesma linha eles colidem
4. Prova: só renderiza se copy.ts tiver conteúdo real (números, depoimentos, apoiadores em monocromático)
5. Participar: bloco wine, o que está incluso, valor, CTA e aviso de saída para a plataforma com "cartão ou Pix".
   Se usar as órbitas, esta é a única aparição: grandes, cortadas, estáticas, fog em opacidade baixa
6. FAQ: Accordion acessível (button, aria-expanded, aria-controls)
7. Rodapé: logo, redes, contato para dúvidas, organizador, link de privacidade

Screenshots em 360, 768 e 1440. Pare e atualize o APRENDIZADO.md (renderização condicional, aria, lazy loading de iframe).
```

**Pronto quando:** a página completa funciona com conteúdo real onde ele existe, e placeholders visíveis onde ainda falta.

---

## Fase 3 — Integrações

```
Leia o CLAUDE.md. Execute a Fase 3, primeiro o essencial:

Essencial:
1. useSalesLink: lê utm_* de window.location.search com URLSearchParams e repassa para SALES_URL
2. lib/analytics.ts: pushEvent tipado (união de nomes de evento permitidos) enviando para window.dataLayer
3. cta_click em todo CTA com location: "header" | "hero" | "sticky" | "participar" | "footer"
4. Snippet do GTM com GTM_ID vindo do config
5. Meta tags finais, og.jpg 1200x630, JSON-LD Event se a hipótese de evento estiver confirmada

Se couber no prazo:
6. Consent Mode v2 com consentimento padrão negado e banner discreto, aceitar e recusar com o mesmo peso visual
7. privacidade.html como segunda entrada do Vite. O texto vem do cliente: use placeholder, não redija política

Pare e atualize o APRENDIZADO.md (URLSearchParams, declaração global de window.dataLayer, union types, multi-page no Vite).
```

**Pronto quando:** o GTM Preview mostra `cta_click` com a localização correta, e o link da plataforma chega com as UTMs.

---

## Fase 4 — QA e publicação

```
Leia o CLAUDE.md. Execute a Fase 4 e me entregue um relatório com o que passou e o que falhou:

1. Screenshots em 360, 768, 1440 e 1920
2. Navegação completa só com teclado, foco sempre visível
3. prefers-reduced-motion ativo: nenhuma animação
4. Lighthouse mobile: Performance e Acessibilidade ≥ 90
5. Imagens em AVIF/WebP com srcset; hero com fetchpriority="high" e preload
6. npm run build sem warnings
7. Checklist manual para eu fazer no celular: navegador interno do Instagram, preview do link no WhatsApp,
   vídeo com legenda, clique no CTA chegando na plataforma
```

**Pronto quando:** relatório sem falhas bloqueantes e deploy na Vercel com o domínio já apontado.
