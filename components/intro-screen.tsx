'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GOLD = '#d9c48f'
const GOLD_SOFT = '#c2a670'

// ─── Simbole & formula matematike/statistike që fluturojnë ───────────────────
const SYMBOLS = [
  'Σ', 'μ', '%', 'R²', 'σ', '∑x', 'β', 'ƒ(x)', '∆', '≈',
  'n=', 'p<.05', '√', '∞', 'KPI', 'log', 'π', 'χ²',
]

interface FloatItem {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  life: number
  maxLife: number
  text: string
  rotate: number
  vr: number
}

function FormulaCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const items = useRef<FloatItem[]>([])
  const raf = useRef(0)

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const cx = canvas.width / 2
    const cy = canvas.height / 2

    const spawn = (count: number, delay = 0) => {
      setTimeout(() => {
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2
          const speed = 1 + Math.random() * 3.5
          const life = 90 + Math.random() * 90
          items.current.push({
            id: Math.random(),
            x: cx + (Math.random() - 0.5) * 60,
            y: cy + (Math.random() - 0.5) * 60,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 0.8,
            size: 13 + Math.random() * 15,
            opacity: 0.55 + Math.random() * 0.35,
            life,
            maxLife: life,
            text: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
            rotate: (Math.random() - 0.5) * 40,
            vr: (Math.random() - 0.5) * 1.4,
          })
        }
      }, delay)
    }

    spawn(14, 0)
    spawn(12, 250)
    spawn(16, 550)
    spawn(12, 900)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      items.current = items.current.filter((p) => p.life > 0)

      for (const p of items.current) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.025
        p.vx *= 0.994
        p.rotate += p.vr
        p.life--
        const alpha = (p.life / p.maxLife) * p.opacity

        ctx.save()
        ctx.globalAlpha = alpha
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotate * Math.PI) / 180)
        ctx.font = `600 ${p.size}px "Geist Mono", monospace`
        ctx.fillStyle = GOLD
        ctx.shadowColor = GOLD
        ctx.shadowBlur = 10
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(p.text, 0, 0)
        ctx.restore()
      }

      raf.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf.current)
      items.current = []
    }
  }, [active])

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-10" />
}

// ─── Mini bar-chart animuar (qendër) ─────────────────────────────────────────
function MiniBarChart({ show }: { show: boolean }) {
  const bars = [0.4, 0.75, 0.55, 0.95, 0.65, 0.85]
  return (
    <div className="flex items-end gap-1.5 h-12">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-2 rounded-sm"
          style={{ background: `linear-gradient(180deg, ${GOLD}, ${GOLD_SOFT})` }}
          initial={{ height: 0 }}
          animate={show ? { height: `${h * 100}%` } : { height: 0 }}
          transition={{ duration: 0.6, delay: 0.15 + i * 0.07, ease: [0.34, 1.56, 0.64, 1] }}
        />
      ))}
    </div>
  )
}

// ─── Linjë grafiku (sparkline) që vizatohet ──────────────────────────────────
function SparkLine({ show }: { show: boolean }) {
  return (
    <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
      <motion.path
        d="M2 32 L20 18 L38 26 L56 8 L74 14 L92 4 L118 10"
        stroke={GOLD}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={show ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.2 }}
      />
      {[2, 20, 38, 56, 74, 92, 118].map((x, i) => {
        const ys = [32, 18, 26, 8, 14, 4, 10]
        return (
          <motion.circle
            key={i}
            cx={x}
            cy={ys[i]}
            r="2.6"
            fill={GOLD}
            initial={{ opacity: 0, scale: 0 }}
            animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: 0.25 + i * 0.1, duration: 0.3 }}
          />
        )
      })}
    </svg>
  )
}

function ScanLine() {
  return (
    <motion.div
      className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#d9c48f] to-transparent opacity-50 z-20"
      initial={{ top: '-2px' }}
      animate={{ top: '100vh' }}
      transition={{ duration: 1.5, ease: 'linear', delay: 0.2 }}
    />
  )
}

interface Props {
  onDone: () => void
}

export function IntroScreen({ onDone }: Props) {
  const [phase, setPhase] = useState<'idle' | 'particles' | 'text' | 'exit'>('idle')
  const [showFx, setShowFx] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => { setPhase('particles'); setShowFx(true) }, 100)
    const t2 = setTimeout(() => setPhase('text'), 500)
    const t3 = setTimeout(() => setPhase('exit'), 2300)
    const t4 = setTimeout(() => onDone(), 2900)
    return () => [t1, t2, t3, t4].forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const letters = 'ALKETA DRAGOI'.split('')
  const showCharts = phase === 'text'

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'oklch(0.14 0.008 60)' }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Grid overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                'linear-gradient(#d9c48f 1px, transparent 1px), linear-gradient(90deg, #d9c48f 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {phase !== 'idle' && <ScanLine />}

          {/* Formula & symbols floating */}
          <FormulaCanvas active={showFx} />

          {/* Central glow */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 300,
              height: 300,
              background: 'radial-gradient(circle, oklch(0.78 0.16 85 / 0.3) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={phase !== 'idle' ? { scale: [0, 2.5, 1.5], opacity: [0, 0.8, 0.4] } : {}}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          {/* Logo / monogram */}
          <motion.div
            className="relative z-30 mb-6 flex items-center justify-center"
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={phase !== 'idle' ? { scale: 1, rotate: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className="relative h-20 w-20">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#d9c48f]/60"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border border-[#c2a670]/40"
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="font-heading text-2xl font-bold"
                  style={{ color: '#d9c48f', textShadow: '0 0 20px #d9c48f' }}
                >
                  AD
                </span>
              </div>
            </div>
          </motion.div>

          {/* Name letters */}
          <div className="relative z-30 overflow-hidden">
            <motion.div className="flex gap-[0.06em]" aria-label="Alketa Dragoi">
              {letters.map((l, i) => (
                <motion.span
                  key={i}
                  className="font-heading text-4xl font-bold sm:text-6xl"
                  style={{
                    color: '#f0ece0',
                    textShadow: '0 0 40px oklch(0.78 0.16 85 / 0.4)',
                    display: 'inline-block',
                    width: l === ' ' ? '0.5em' : undefined,
                  }}
                  initial={{ y: 80, opacity: 0, rotateX: -90 }}
                  animate={
                    phase === 'text'
                      ? { y: 0, opacity: 1, rotateX: 0 }
                      : {}
                  }
                  transition={{
                    duration: 0.55,
                    delay: i * 0.045,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  {l}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Subtitle */}
          <motion.p
            className="relative z-30 mt-3 font-mono text-xs uppercase tracking-[0.5em] text-[#d9c48f]/70 sm:text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={phase === 'text' ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Designer &amp; Data Analyst
          </motion.p>

          {/* Mini charts row */}
          <motion.div
            className="relative z-30 mt-7 flex items-center gap-8"
            initial={{ opacity: 0, y: 14 }}
            animate={showCharts ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.85, duration: 0.5 }}
          >
            <MiniBarChart show={showCharts} />
            <div className="h-8 w-px bg-white/10" />
            <SparkLine show={showCharts} />
          </motion.div>

          {/* Progress bar */}
          <motion.div className="absolute bottom-10 z-30 h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #d9c48f, #c2a670)' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.0, delay: 0.3, ease: 'linear' }}
            />
          </motion.div>

          {/* Corner decorations */}
          {[
            'top-6 left-6',
            'top-6 right-6 rotate-90',
            'bottom-6 right-6 rotate-180',
            'bottom-6 left-6 -rotate-90',
          ].map((cls, i) => (
            <motion.div
              key={i}
              className={`absolute z-20 ${cls}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={phase !== 'idle' ? { opacity: 0.5, scale: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.08 }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M2 30 L2 2 L30 2" stroke="#d9c48f" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
