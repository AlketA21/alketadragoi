'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { LiquidText } from '@/components/liquid-text'

const TEXT = 'PERSONAL PORTFOLIO'

export function TypewriterTitle() {
  const [count, setCount] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const done = count >= TEXT.length

  useEffect(() => {
    if (done) return
    const id = setTimeout(() => setCount((c) => c + 1), 80)
    return () => clearTimeout(id)
  }, [count, done])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const letters = TEXT.split('')

  return (
    <div ref={containerRef} className="relative mb-6 flex flex-col items-center">
      {/* Decorative line above */}
      <motion.div
        className="mb-3 flex items-center gap-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <motion.div
          className="h-[1px] w-8 bg-gradient-to-r from-transparent to-foreground/30 dark:to-[#d9c48f]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        />
        <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-foreground/40 dark:text-[#d9c48f]/50">
          ✦
        </span>
        <motion.div
          className="h-[1px] w-8 bg-gradient-to-l from-transparent to-foreground/30 dark:to-[#d9c48f]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        />
      </motion.div>

      {/* Main text with per-letter animation — wrapped in the mouse-reactive liquid effect */}
      <LiquidText>
        <p
          className="inline-flex min-h-[1.4em] flex-wrap items-center justify-center"
          aria-label={TEXT}
        >
          {letters.map((char, i) => {
            const isVisible = i < count
            const isSpace = char === ' '
            const shimmerDelay = done ? i * 0.04 : 0
            return (
              <motion.span
                key={i}
                style={{
                  display: 'inline-block',
                  width: isSpace ? '0.45em' : undefined,
                  // subtle magnetic 3d tilt per letter
                  transform: done
                    ? `perspective(400px) rotateY(${mousePos.x * (i % 3 === 0 ? 4 : 2)}deg) rotateX(${-mousePos.y * 2}deg)`
                    : undefined,
                  transition: 'transform 0.15s ease-out',
                }}
                initial={false}
                animate={
                  isVisible
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 6, scale: 0.8 }
                }
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className={
                  done
                    ? 'shimmer-title font-heading text-3xl font-bold tracking-[0.12em] sm:text-5xl'
                    : 'font-heading text-3xl font-bold tracking-[0.12em] text-foreground/50 sm:text-5xl'
                }
              >
                {isSpace ? '\u00A0' : char}
              </motion.span>
            )
          })}
          {!done && (
            <span className="ml-0.5 inline-block h-[1em] w-[1px] animate-pulse bg-primary" />
          )}
        </p>
      </LiquidText>

      {/* Decorative line below */}
      {done && (
        <motion.div
          className="mt-3 h-[1px] w-24 bg-gradient-to-r from-transparent via-[#22d3ee]/40 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      )}
    </div>
  )
}
