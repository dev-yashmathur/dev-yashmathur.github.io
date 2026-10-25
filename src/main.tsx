import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './styles/globalStyles.css'
import App from './App.tsx'
import { printConsoleEgg } from './utils/consoleEgg'

printConsoleEgg()

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Prerendered pages arrive with their HTML in place; the SPA fallback (404.html) arrives empty.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
