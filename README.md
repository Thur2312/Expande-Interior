# Expande Interior — landing page

Vite + React + TypeScript + Tailwind v4. Projeto da Horizon.

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # checagem de tipos + build de produção
npm run lint     # oxlint
npm run pendencias  # lista todo texto que ainda depende do cliente
```

## Comparar opções pela URL

- `?titulo=a` ou `?titulo=b`
- `?parenteses=abrindo` ou `?parenteses=estatico`

Exemplo: `http://localhost:5173/?titulo=b&parenteses=estatico`

## Antes de publicar

1. `npm run pendencias` precisa voltar vazio para hero, essencial, manifesto e participar (essas seções não somem)
2. Em `src/config/site.ts`, trocar `showPending` para `false`: seções opcionais que ainda tiverem `[[ ]]` somem sozinhas

## Documentos

- `CLAUDE.md`: regras do projeto (marca, tokens, direção, anti-padrões)
- `PROMPTS-POR-FASE.md`: próximas fases
- `APRENDIZADO.md`: conceitos técnicos usados em cada fase
