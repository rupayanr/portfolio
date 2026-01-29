import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { themes, defaultTheme } from '../themes'
import type { Theme } from '../themes'

interface ThemeContextType {
  theme: Theme
  setTheme: (themeId: string) => void
  cycleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.style.setProperty('--bg', theme.colors.bg)
  root.style.setProperty('--bg-secondary', theme.colors.bgSecondary)
  root.style.setProperty('--text', theme.colors.text)
  root.style.setProperty('--text-dim', theme.colors.textDim)
  root.style.setProperty('--accent', theme.colors.accent)
  root.style.setProperty('--border', theme.colors.border)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const savedThemeId = localStorage.getItem('theme')
    const found = themes.find(t => t.id === savedThemeId)
    return found || themes.find(t => t.id === defaultTheme) || themes[0]
  })

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem('theme', theme.id)
  }, [theme])

  const setTheme = (themeId: string) => {
    const found = themes.find(t => t.id === themeId)
    if (found) {
      setThemeState(found)
    }
  }

  const cycleTheme = () => {
    const currentIndex = themes.findIndex(t => t.id === theme.id)
    const nextIndex = (currentIndex + 1) % themes.length
    setThemeState(themes[nextIndex])
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
