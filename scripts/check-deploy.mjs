// Confere o que impede a publicação. Rodar antes de cada deploy: npm run pre-deploy
// Erro (❌) = não publicar. Aviso (⚠️) = publicar só sabendo o motivo.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const errors = []
const warnings = []

const read = (path) => readFileSync(path, 'utf-8')
const isComment = (line) => /^\s*(\/\/|\*|\/\*|<!--)/.test(line)

// 1. Textos pendentes [[ ]] em copy.ts e index.html (comentários não contam)
for (const file of ['src/content/copy.ts', 'index.html']) {
  const lines = read(file).split('\n')
  lines.forEach((line, i) => {
    if (line.includes('[[') && !isComment(line)) errors.push(`${file}:${i + 1} texto pendente: ${line.trim().slice(0, 90)}`)
  })
}

// 2. Configuração do site
const site = read('src/config/site.ts')
const salesUrl = site.match(/salesUrl:\s*'([^']*)'/)?.[1]
if (!salesUrl || salesUrl === '#') errors.push("site.ts: salesUrl ainda é '#' (falta o link do checkout)")
if (/showPending:\s*true/.test(site)) errors.push('site.ts: showPending está true (seções pendentes aparecem na página)')
if (/gtmId:\s*null/.test(site)) warnings.push('site.ts: gtmId é null (sem medição; a política de privacidade fala em Google Tag Manager)')
if (/email:\s*null/.test(site)) warnings.push('site.ts: links.email é null (rodapé sem e-mail de contato)')

// 3. Compartilhamento (o endereço do site entra no build: ver vite.config.ts)
if (!existsSync('public/og.jpg')) errors.push('public/og.jpg não existe')

// 4. Peso dos arquivos em public/ (tudo vai para o deploy)
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]))
for (const file of walk('public')) {
  const kb = statSync(file).size / 1024
  if (kb > 15 * 1024) errors.push(`${file}: ${(kb / 1024).toFixed(0)} MB (comprimir ou mover para fora de public/)`)
  else if (kb > 600 && !file.endsWith('.mp4')) warnings.push(`${file}: ${kb.toFixed(0)} KB (imagem pesada, otimizar)`)
}

for (const w of warnings) console.log(`⚠️  ${w}`)
for (const e of errors) console.log(`❌ ${e}`)
console.log(errors.length ? `\n${errors.length} impedimento(s) para publicar.` : '\nNada impede a publicação.')
process.exit(errors.length ? 1 : 0)
