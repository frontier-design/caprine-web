import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import './lib/gsap'
import App from './App.tsx'

if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
window.addEventListener('beforeunload', () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
