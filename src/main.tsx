import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'
import App from './App'

// Console Easter Egg
console.log(`
%c
╔═══════════════════════════════════════════╗
║                                           ║
║   Hey, fellow developer!                  ║
║                                           ║
║   Curious about the code?                 ║
║   → github.com/rupayanr/portfolio         ║
║                                           ║
║   Want to work together?                  ║
║   → rupayan.roy16@gmail.com               ║
║                                           ║
╚═══════════════════════════════════════════╝
`, 'color: #bd93f9; font-family: monospace;')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
