'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [isProjectCard, setIsProjectCard] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return
    setEnabled(true)
    document.documentElement.classList.add('has-custom-cursor')

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: target.x, y: target.y }
    let raf = 0

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
      if (!raf) raf = requestAnimationFrame(loop)
    }

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      const projectCard = el.closest('[data-cursor-view]')
      const interactive = el.closest('a, button, [role="button"], input, textarea')
      setIsProjectCard(Boolean(projectCard))
      if (ringRef.current) {
        ringRef.current.dataset.active = interactive ? 'true' : 'false'
      }
    }

    function loop() {
      ring.x += (target.x - ring.x) * 0.18
      ring.y += (target.y - ring.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`
      }
      // Stop the loop once the ring has caught up (restarts on next move)
      raf = Math.abs(target.x - ring.x) + Math.abs(target.y - ring.y) > 0.1 ? requestAnimationFrame(loop) : 0
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[9999] -ml-1 -mt-1 h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_2px_var(--gold)] transition-opacity duration-200 ${
          isProjectCard ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <div
        ref={ringRef}
        aria-hidden
        data-active="false"
        className={`pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full border transition-[width,height,margin,background-color,border-color] duration-200 ease-out ${
          isProjectCard
            ? '-ml-11 -mt-11 h-[88px] w-[88px] border-primary bg-primary/95 backdrop-blur-sm'
            : 'border-primary/70 -ml-4 -mt-4 h-8 w-8 data-[active=true]:-ml-6 data-[active=true]:-mt-6 data-[active=true]:h-12 data-[active=true]:w-12 data-[active=true]:bg-primary/10'
        }`}
      >
        {isProjectCard && (
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-primary-foreground">
            View
          </span>
        )}
      </div>
    </>
  )
}
