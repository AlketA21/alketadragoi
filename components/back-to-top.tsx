'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

const SIZE = 52
const STROKE = 3
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [ripples, setRipples] = useState<number[]>([])

  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const id = Date.now()
    setRipples((r) => [...r, id])
    setTimeout(() => setRipples((r) => r.filter((rid) => rid !== id)), 600)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleClick}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{
            opacity: { duration: 0.3 },
            scale: { duration: 0.3 },
            y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="group fixed bottom-6 right-6 z-40 flex items-center justify-center"
          style={{ width: SIZE, height: SIZE }}
        >
          {/* Liquid glow behind the button — pulses gently, uses the brand gold */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-[-8px] rounded-full opacity-60 blur-lg"
            style={{ background: 'radial-gradient(circle, var(--gold-soft) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.25, 1], opacity: [0.45, 0.7, 0.45] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Ripple(s) on click */}
          {ripples.map((id) => (
            <motion.span
              key={id}
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full border border-primary/60"
              initial={{ scale: 0.6, opacity: 0.6 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          ))}

          {/* Base circle */}
          <span className="absolute inset-0 rounded-full border border-border bg-card/80 shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-105 group-active:scale-95" />

          {/* Scroll-progress ring */}
          <svg
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="absolute inset-0 -rotate-90"
          >
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="var(--border)"
              strokeWidth={STROKE}
              opacity={0.4}
            />
            <motion.circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="var(--gold)"
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              style={{
                pathLength: smoothProgress,
              }}
            />
          </svg>

          <ArrowUp className="relative z-10 h-4 w-4 text-foreground transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
