'use client'

import { useEffect, useId, useRef, type ReactNode } from 'react'

/**
 * Wraps its children in a mouse-reactive "liquid" distortion filter —
 * the text warps/wobbles as the mouse moves near or across it, then
 * settles back to normal,
 *
 * Usage:
 *   <LiquidText>
 *     <span className="font-heading text-6xl font-bold">Alketa Dragoi</span>
 *   </LiquidText>
 */
export function LiquidText({ children }: { children: ReactNode }) {
  const filterId = useId().replace(/:/g, '')
  const wrapRef = useRef<HTMLDivElement>(null)
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null)
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null)

  useEffect(() => {
    const el = wrapRef.current
    const turbulence = turbulenceRef.current
    const displacement = displacementRef.current
    if (!el || !turbulence || !displacement) return

    let raf = 0
    let scale = 0
    let targetScale = 0
    let seed = 0
    let lastX = 0
    let lastY = 0
    let hasLast = false

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom

      if (!inside) {
        targetScale = 0
        hasLast = false
        return
      }

      if (hasLast) {
        const dx = e.clientX - lastX
        const dy = e.clientY - lastY
        const speed = Math.sqrt(dx * dx + dy * dy)
        // Faster mouse movement => stronger distortion (capped)
        targetScale = Math.min(70, speed * 2.6)
      }
      lastX = e.clientX
      lastY = e.clientY
      hasLast = true
    }

    const onLeave = () => {
      targetScale = 0
      hasLast = false
    }

    const loop = () => {
      // Ease current scale toward target, then decay target back to 0
      scale += (targetScale - scale) * 0.18
      targetScale *= 0.9

      if (scale > 0.05) {
        seed += 0.6
        turbulence.setAttribute('seed', String(seed))
        displacement.setAttribute('scale', String(scale))
      } else {
        displacement.setAttribute('scale', '0')
      }

      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={wrapRef} style={{ filter: `url(#${filterId})` }}>
      <svg className="absolute h-0 w-0" aria-hidden focusable="false">
        <defs>
          <filter id={filterId}>
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.01 0.04"
              numOctaves={2}
              seed={0}
              result="noise"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="noise"
              scale={0}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      {children}
    </div>
  )
}
