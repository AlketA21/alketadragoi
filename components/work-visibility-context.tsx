'use client'

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

const VISIBLE_KEY = 'work-visible'
const RETURN_SCROLL_KEY = 'work-return-scroll'

type WorkVisibilityContextValue = {
  workVisible: boolean
  /** Reveals the Work section. Pass `scroll: false` to just reveal it without
   *  jumping the page (e.g. when opened from the hero folder — the person
   *  stays where they are and scrolls down on their own). Defaults to true
   *  (used by the navbar "Work" link, where jumping to it is expected). */
  openWork: (scroll?: boolean) => void
  /** Call right before navigating to a project's detail page, so "Back to
   *  Portfolio" can restore both the Work section and the exact scroll
   *  position the person was at — no need to re-scroll through the cards. */
  saveReturnPoint: () => void
}

function safeGet(key: string) {
  try { return sessionStorage.getItem(key) } catch { return null }
}
function safeSet(key: string, value: string) {
  try { sessionStorage.setItem(key, value) } catch {}
}
function safeRemove(key: string) {
  try { sessionStorage.removeItem(key) } catch {}
}

const WorkVisibilityContext = createContext<WorkVisibilityContextValue | undefined>(undefined)

export function WorkVisibilityProvider({ children }: { children: ReactNode }) {
  const [workVisible, setWorkVisible] = useState(false)

  // Restore "Work" visibility across a full page reload (e.g. after following
  // "Back to Portfolio" from a project page), and scroll back to where the
  // person was before they clicked into that project.
  useEffect(() => {
    const wasVisible = safeGet(VISIBLE_KEY) === 'true'
    const returnScroll = safeGet(RETURN_SCROLL_KEY)

    if (wasVisible) setWorkVisible(true)

    if (returnScroll) {
      safeRemove(RETURN_SCROLL_KEY)
      requestAnimationFrame(() => {
        setTimeout(() => {
          window.scrollTo({ top: Number(returnScroll), behavior: 'auto' })
        }, 60)
      })
    }
  }, [])

  const openWork = useCallback((scroll: boolean = true) => {
    setWorkVisible(true)
    safeSet(VISIBLE_KEY, 'true')
    if (!scroll) return
    // Wait for the section to fully mount/expand before scrolling to it,
    // so it lands on the true top of the section instead of the middle.
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 150)
    })
  }, [])

  const saveReturnPoint = useCallback(() => {
    safeSet(VISIBLE_KEY, 'true')
    safeSet(RETURN_SCROLL_KEY, String(window.scrollY))
  }, [])

  return (
    <WorkVisibilityContext.Provider value={{ workVisible, openWork, saveReturnPoint }}>
      {children}
    </WorkVisibilityContext.Provider>
  )
}

export function useWorkVisibility() {
  const ctx = useContext(WorkVisibilityContext)
  if (!ctx) {
    throw new Error('useWorkVisibility must be used within WorkVisibilityProvider')
  }
  return ctx
}
