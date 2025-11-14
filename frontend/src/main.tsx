import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/themes.css'
import './index.css'
import './theme/initTheme'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
