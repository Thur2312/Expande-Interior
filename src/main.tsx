import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// opsz.css carrega os eixos de peso E tamanho óptico. O import padrão carrega só o peso.
import '@fontsource-variable/piazzolla/opsz.css'
import '@fontsource-variable/fustat'
import './styles/index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
