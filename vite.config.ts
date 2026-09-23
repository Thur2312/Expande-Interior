import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * Endereço público do site, para canonical e og:image (o WhatsApp só aceita URL absoluta).
 * Sem domínio próprio, a Vercel informa o endereço de produção dela durante o build
 * (VERCEL_PROJECT_PRODUCTION_URL, sem "https://"). SITE_URL, se existir, tem prioridade:
 * serve para domínio próprio no futuro ou se a Vercel não expuser a variável.
 */
function resolveSiteUrl(): string | null {
  const explicit = process.env.SITE_URL
  if (explicit) return explicit.replace(/\/$/, '')
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  return vercel ? `https://${vercel}` : null
}

const siteUrl = resolveSiteUrl()

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'site-url',
      // Sem endereço conhecido (dev local), as tags que dependem dele saem do HTML
      // em vez de ficarem quebradas: melhor sem og:image do que com uma URL inválida.
      transformIndexHtml: (html) =>
        siteUrl ? html.replaceAll('%SITE_URL%', siteUrl) : html.replace(/^.*(%SITE_URL%|og:image:(width|height)).*\r?\n/gm, ''),
    },
  ],
  build: {
    // Segunda entrada: privacidade.html não faz parte da SPA em src/App.tsx.
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        privacidade: resolve(import.meta.dirname, 'privacidade.html'),
      },
    },
  },
})
