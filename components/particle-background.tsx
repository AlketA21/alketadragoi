'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

const COLORS_DARK = ['#e8d4a0', '#d9c48f', '#a8a2ff']
const COLORS_LIGHT = ['#b08d4f', '#8f6f3a', '#6d5fd8']

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const cv: HTMLCanvasElement = canvas

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = window.innerWidth
    let height = window.innerHeight
    let particles: Particle[] = []
    let raf = 0
    // Canvas glow (shadowBlur) is costly — only on larger screens
    const glow = window.innerWidth >= 1024

    function isDark() {
      return document.documentElement.classList.contains('dark')
    }

    function makeParticles() {
      const count = width < 640 ? 30 : 60
      const colors = isDark() ? COLORS_DARK : COLORS_LIGHT
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        size: 1.5 + Math.random() * 3.2,
        opacity: 0.35 + Math.random() * 0.45,
        color: colors[Math.floor(Math.random() * colors.length)],
      }))
    }

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      cv.width = width
      cv.height = height
      makeParticles()
    }

    resize()
    window.addEventListener('resize', resize)

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        if (!reduceMotion) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < -10) p.x = width + 10
          if (p.x > width + 10) p.x = -10
          if (p.y < -10) p.y = height + 10
          if (p.y > height + 10) p.y = -10
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        if (glow) {
          ctx.shadowColor = p.color
          ctx.shadowBlur = p.size * 3
        }
        ctx.fill()
        if (glow) ctx.shadowBlur = 0
      }
      ctx.globalAlpha = 1

      raf = requestAnimationFrame(draw)
    }
    draw()
    // Reduced motion: one static frame, no animation loop at all
    if (reduceMotion) cancelAnimationFrame(raf)

    // Re-color particles when the theme toggles (dark/light class on <html>)
    const observer = new MutationObserver(() => {
      makeParticles()
      if (reduceMotion) draw()
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  )
}
