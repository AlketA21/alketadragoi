'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

type Theme = 'light' | 'dark'

type ThemeContextValue = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  // The inline boot script in layout.tsx already applied the right class to
  // <html> before first paint — here we just sync React state with it.
  // (Content is NOT hidden any more, so it is in the HTML for search engines.)
  useEffect(() => {
    const root = document.documentElement
    if (!root.classList.contains('dark') && !root.dataset.themeChecked) {
      let stored: Theme | null = null
      try {
        stored = window.localStorage.getItem('ad-theme') as Theme | null
      } catch {
        // localStorage can throw on some mobile/insecure origins — ignore.
      }
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if ((stored ?? (prefersDark ? 'dark' : 'light')) === 'dark') root.classList.add('dark')
    }
    root.dataset.themeChecked = '1'
    setTheme(root.classList.contains('dark') ? 'dark' : 'light')
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark'
      const root = document.documentElement
      root.classList.add('theme-transition')
      root.classList.toggle('dark', next === 'dark')
      try {
        window.localStorage.setItem('ad-theme', next)
      } catch {
        // Ignore — theme still applies for this session.
      }
      window.setTimeout(() => root.classList.remove('theme-transition'), 550)
      return next
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
