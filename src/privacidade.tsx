import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/piazzolla/opsz.css'
import '@fontsource-variable/fustat'
import './styles/index.css'
import { PrivacyPage } from './pages/PrivacyPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrivacyPage />
  </StrictMode>,
)
