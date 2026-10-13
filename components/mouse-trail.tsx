'use client'

import { useEffect, useRef } from 'react'

interface TrailPoint {
  x: number
  y: number
  age: number
  size: number
  color: string
}

const TRAIL_COLORS = ['#f3db83', '#a7e9f3', '#ebe7f7']

export function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trail = useRef<TrailPoint[]>([])
  const mouse = useRef({ x: -999, y: -999 })
  const raf = useRef(0)
  const colorIndex = useRef(0)
  const lastPos = useRef({ x: -999, y: -999 })

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches
    if (!isFine) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const cv: HTMLCanvasElement = canvas

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }

      const dx = e.clientX - lastPos.current.x
      const dy = e.clientY - lastPos.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 4) return
      lastPos.current = { x: e.clientX, y: e.clientY }

      colorIndex.current = (colorIndex.current + 1) % TRAIL_COLORS.length
      trail.current.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
        size: 3 + Math.random() * 2,
        color: TRAIL_COLORS[colorIndex.current],
      })

      if (trail.current.length > 60) trail.current.shift()
      if (!raf.current) raf.current = requestAnimationFrame(draw)
    }
    window.addEventListener('mousemove', onMove)

    function draw() {
      ctx.clearRect(0, 0, cv.width, cv.height)

      trail.current.forEach((p, i) => {
        p.age++
        const maxAge = 35
        if (p.age > maxAge) return
        const t = 1 - p.age / maxAge
        const size = p.size * t

        ctx.save()
        ctx.globalAlpha = t * 0.45
        ctx.shadowColor = p.color
        ctx.shadowBlur = 15 * t
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // connect to next with line
        if (i < trail.current.length - 1) {
          const next = trail.current[i + 1]
          ctx.save()
          ctx.globalAlpha = t * 0.15
          ctx.strokeStyle = p.color
          ctx.lineWidth = size * 0.4
          ctx.lineCap = 'round'
          ctx.shadowColor = p.color
          ctx.shadowBlur = 6
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(next.x, next.y)
          ctx.stroke()
          ctx.restore()
        }
      })

      trail.current = trail.current.filter((p) => p.age <= 45)
      // Idle → stop the loop completely (restarts on the next mouse move)
      raf.current = trail.current.length ? requestAnimationFrame(draw) : 0
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
      raf.current = 0
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9990]"
      aria-hidden
    />
  )
}
