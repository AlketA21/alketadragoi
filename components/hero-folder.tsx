'use client'

import { useMemo, useRef, useState, useEffect, type PointerEvent } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { ArrowLeft, MousePointerClick, Sparkles, User, ChevronDown } from 'lucide-react'
import { ProfilePanel } from '@/components/profile-panel'
import { TypewriterTitle } from '@/components/typewriter-title'
import { LiquidText } from '@/components/liquid-text'
import { useWorkVisibility } from '@/components/work-visibility-context'
import { profile } from '@/lib/portfolio-data'

const Character3D = dynamic(
  () => import('@/components/character-3d').then((m) => m.Character3D),
  { ssr: false },
)

// Magnetic wrapper — pulls element toward cursor within radius
function Magnetic({
  children,
  strength = 0.3,
  className = '',
}: {
  children: React.ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 22 })
  const sy = useSpring(y, { stiffness: 300, damping: 22 })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  )
}

// Photo placeholder / upload zone (majtas, para hapjes së dosjes)
function PhotoZone() {
  const frameRef = useRef<HTMLDivElement>(null)
  const zoneRef = useRef<HTMLDivElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(useTransform(rawY, [-100, 100], [8, -8]), { stiffness: 180, damping: 20 })
  const rotateY = useSpring(useTransform(rawX, [-100, 100], [-8, 8]), { stiffness: 180, damping: 20 })
  const glowX = useSpring(useTransform(rawX, [-100, 100], [20, 80]), { stiffness: 120, damping: 24 })
  const glowY = useSpring(useTransform(rawY, [-100, 100], [20, 80]), { stiffness: 120, damping: 24 })

  // Scroll-linked depth: as the hero scrolls out of view, the photo settles
  // back and softly fades — a gentle transition instead of an abrupt cut.
  const { scrollYProgress } = useScroll({
    target: zoneRef,
    offset: ['start end', 'end start'],
  })
  const scrollScale = useTransform(scrollYProgress, [0.5, 1], [1, 0.9])
  const scrollRotate = useTransform(scrollYProgress, [0.5, 1], [0, -4])
  const scrollOpacity = useTransform(scrollYProgress, [0.5, 0.85, 1], [1, 1, 0.7])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reducedMotion) return
    const rect = frameRef.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set(e.clientX - (rect.left + rect.width / 2))
    rawY.set(e.clientY - (rect.top + rect.height / 2))
  }

  function handleLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      ref={zoneRef}
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0, x: -40, scale: 0.92 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
    >
      {/* Soft ambient glow behind the frame — reacts gently to cursor position */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -z-10 h-64 w-64 rounded-full opacity-40 blur-3xl sm:h-72 sm:w-72"
        style={{
          background: 'radial-gradient(circle, var(--gold-soft) 0%, transparent 70%)',
          left: useTransform(glowX, (v) => `${v}%`),
          top: useTransform(glowY, (v) => `${v}%`),
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      <motion.div
        ref={frameRef}
        className="relative group"
        style={{
          scale: scrollScale,
          rotate: scrollRotate,
          opacity: scrollOpacity,
          perspective: 900,
        }}
        animate={
          reducedMotion
            ? undefined
            : { y: [0, -10, 0] }
        }
        transition={
          reducedMotion
            ? undefined
            : { duration: 5, repeat: Infinity, ease: 'easeInOut' }
        }
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {/* Gold corner accents */}
        <span className="pointer-events-none absolute -top-2 -left-2 h-5 w-5 border-t-2 border-l-2 border-primary rounded-tl-md z-10" />
        <span className="pointer-events-none absolute -top-2 -right-2 h-5 w-5 border-t-2 border-r-2 border-primary rounded-tr-md z-10" />
        <span className="pointer-events-none absolute -bottom-2 -left-2 h-5 w-5 border-b-2 border-l-2 border-primary rounded-bl-md z-10" />
        <span className="pointer-events-none absolute -bottom-2 -right-2 h-5 w-5 border-b-2 border-r-2 border-primary rounded-br-md z-10" />

        {/* Photo area — ndërron automatikisht sipas dark/light mode */}
        <motion.div
          className="relative w-48 h-56 sm:w-56 sm:h-64 overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-md shadow-xl"
          style={{
            rotateX: reducedMotion ? 0 : rotateX,
            rotateY: reducedMotion ? 0 : rotateY,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Foto për Dark mode */}
          <Image
            src="/photo-dark.png"
            alt={profile.name}
            fill
            sizes="(max-width: 640px) 192px, 224px"
            className="hidden dark:block object-cover object-top"
          />
          {/* Foto për Light mode */}
          <Image
            src="/photo-light.png"
            alt={profile.name}
            fill
            sizes="(max-width: 640px) 192px, 224px"
            className="block dark:hidden object-cover object-top"
          />

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />

          {/* Glass sheen sweep — plays once on load, subtle premium shimmer */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent"
            initial={{ x: '-120%' }}
            animate={{ x: '120%' }}
            transition={{ duration: 1.4, delay: 0.9, ease: 'easeInOut' }}
          />

          {/* Cursor-reactive highlight, sits above the photo for a glass-like feel */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: 'radial-gradient(circle at center, oklch(1 0 0 / 0.12) 0%, transparent 60%)',
              left: useTransform(glowX, (v) => `${v}%`),
              top: useTransform(glowY, (v) => `${v}%`),
            }}
          />
        </motion.div>

        {/* Glow on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ boxShadow: '0 0 40px 8px oklch(0.82 0.075 85 / 0.15)' }}
        />
      </motion.div>

      {/* Name label below photo — mouse-reactive liquid distortion effect */}
      <div className="text-center">
        <LiquidText>
          <p className="font-heading text-lg font-bold text-foreground">{profile.name}</p>
        </LiquidText>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mt-0.5">
          {profile.role}
        </p>
      </div>
    </motion.div>
  )
}

// Floating hint
function FloatingHint() {
  const [visible, setVisible] = useState(false)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(t)
  }, [])

  const onMove = (e: React.MouseEvent) => {
    mx.set(e.clientX)
    my.set(e.clientY)
  }

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-40"
      onMouseMove={onMove}
      style={{ pointerEvents: 'none' }}
    >
      <AnimatePresence>
        {visible && (
          <motion.div
            style={{ x: mx, y: my, translateX: '-50%', translateY: '-130%' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute flex items-center gap-1.5 rounded-full border border-primary/30 bg-card/80 px-3 py-1.5 text-[11px] font-medium text-muted-foreground backdrop-blur-sm"
          >
            <Sparkles className="h-3 w-3 text-primary" />
            Click to open
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function HeroFolder() {
  const [open, setOpen] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const { openWork } = useWorkVisibility()
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const [hoverFolder, setHoverFolder] = useState(false)
  const folderRef = useRef<HTMLButtonElement>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const panelX = useMotionValue(0)
  const panelY = useMotionValue(0)
  const panelRX = useSpring(useTransform(panelY, [-200, 200], [8, -8]), { stiffness: 200, damping: 30 })
  const panelRY = useSpring(useTransform(panelX, [-200, 200], [-8, 8]), { stiffness: 200, damping: 30 })

  const burst = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 22 + Math.random()
        const dist = 90 + Math.random() * 140
        return {
          id: i,
          x: Math.cos(angle) * dist,
          y: -Math.abs(Math.sin(angle) * dist) - 40,
          size: 4 + Math.random() * 9,
          delay: Math.random() * 0.18,
          color: ['#f5c518', '#fbbf24', '#f59e0b'][Math.floor(Math.random() * 3)],
        }
      }),
    [],
  )

  function clearTimers() {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  function handleOpen() {
    if (open) return
    clearTimers()
    setOpen(true)
    timers.current.push(setTimeout(() => setRevealed(true), 750))
    openWork(false)
  }

  function handleBack() {
    clearTimers()
    setRevealed(false)
    timers.current.push(setTimeout(() => setOpen(false), 450))
  }

  function handleMove(e: PointerEvent<HTMLButtonElement>) {
    if (open) return
    const el = folderRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ rx: -py * 16, ry: px * 22 })
  }

  const onPanelMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    panelX.set(e.clientX - rect.left - rect.width / 2)
    panelY.set(e.clientY - rect.top - rect.height / 2)
  }
  const onPanelLeave = () => {
    panelX.set(0)
    panelY.set(0)
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pt-24 pb-16"
    >
      {/* Back button */}
      <button
        type="button"
        onClick={handleBack}
        className={`fixed left-4 top-20 z-50 inline-flex items-center gap-2 rounded-full border border-white/30 bg-card/40 px-4 py-2 text-sm font-medium text-foreground shadow-[0_0_24px_-6px_var(--gold)] backdrop-blur-xl transition-all duration-500 hover:bg-card/70 ${
          revealed
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-4 opacity-0'
        }`}
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      {/* ===== Folder stage: foto majtas + dosja djathtas ===== */}
      <AnimatePresence>
        {!revealed && (
          <motion.div
            key="folder-stage"
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.4 } }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Label sipër */}
            <TypewriterTitle />

            {/* Short services description — visible immediately at the top of the page */}
            <motion.p
              className="-mt-2 mb-8 max-w-lg text-pretty text-center text-sm leading-relaxed text-muted-foreground sm:text-base"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {profile.servicesLine}
            </motion.p>

            {/* ── Two-column: foto majtas | dosja djathtas ── */}
            <div className="mt-6 flex flex-col items-center gap-12 sm:flex-row sm:items-center sm:gap-16 lg:gap-24">

              {/* MAJTAS: Foto */}
              <PhotoZone />

              {/* DJATHTAS: Dosja */}
              <div className="flex flex-col items-center gap-6">
                <div className="relative [perspective:1200px]">
                  {/* light beam */}
                  {open && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute bottom-1/2 left-1/2 -z-10 h-72 w-24 -translate-x-1/2 rounded-full bg-gradient-to-t from-[var(--gold)] via-[var(--gold)]/40 to-transparent blur-md"
                      style={{
                        transformOrigin: 'bottom',
                        animation: 'beam-rise 1.1s ease-out forwards',
                      }}
                    />
                  )}

                  {/* particle burst — gold tones */}
                  {open &&
                    burst.map((p) => (
                      <motion.span
                        key={p.id}
                        aria-hidden
                        className="absolute left-1/2 top-1/2 rounded-full"
                        style={{
                          width: p.size,
                          height: p.size,
                          background: p.color,
                          boxShadow: `0 0 10px 2px ${p.color}`,
                        }}
                        initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                        animate={{
                          x: p.x,
                          y: p.y,
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0.4],
                        }}
                        transition={{ duration: 1.1, delay: 0.45 + p.delay, ease: 'easeOut' }}
                      />
                    ))}

                  <Magnetic strength={0.18}>
                    <motion.button
                      ref={folderRef}
                      type="button"
                      onClick={handleOpen}
                      onPointerMove={handleMove}
                      onPointerLeave={() => setTilt({ rx: 0, ry: 0 })}
                      onHoverStart={() => setHoverFolder(true)}
                      onHoverEnd={() => setHoverFolder(false)}
                      aria-label="Open portfolio folder"
                      className="group relative block cursor-pointer [transform-style:preserve-3d]"
                      animate={open ? { rotate: [0, -2.5, 2.5, -1.5, 0] } : { rotate: 0 }}
                      transition={{ duration: 0.24 }}
                      style={
                        {
                          '--rx': `${tilt.rx}deg`,
                          '--ry': `${tilt.ry}deg`,
                          animation: open
                            ? undefined
                            : 'float-folder 6s ease-in-out infinite',
                        } as React.CSSProperties
                      }
                    >
                      {/* folder tab */}
                      <div className="absolute -top-4 left-6 h-8 w-28 rounded-t-xl bg-[oklch(0.78_0.15_88)] [transform:translateZ(-8px)]" />
                      {/* folder back */}
                      <div className="relative h-52 w-72 rounded-2xl bg-[oklch(0.74_0.15_86)] shadow-2xl sm:h-60 sm:w-80 [transform:translateZ(-8px)]" />
                      {/* inner paper */}
                      <div className="absolute inset-x-5 top-3 h-44 rounded-lg bg-background/95 [transform:translateZ(-2px)] sm:h-52" />

                      {/* hover glow ring */}
                      <AnimatePresence>
                        {hoverFolder && !open && (
                          <motion.div
                            className="absolute -inset-3 rounded-3xl"
                            style={{ boxShadow: '0 0 40px 8px oklch(0.82 0.075 85 / 0.3)' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          />
                        )}
                      </AnimatePresence>

                      {/* folder front flap */}
                      <motion.div
                        className="absolute inset-0 flex items-end rounded-2xl bg-[oklch(0.83_0.16_88)] p-6 shadow-xl [backface-visibility:hidden]"
                        style={{ transformOrigin: 'bottom', transformStyle: 'preserve-3d' }}
                        animate={{ rotateX: open ? -140 : 0 }}
                        transition={{
                          duration: 0.6,
                          delay: open ? 0.22 : 0,
                          ease: 'easeOut',
                        }}
                      >
                        <motion.div animate={{ opacity: open ? 0 : 1 }} transition={{ duration: 0.3 }}>
                          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[oklch(0.3_0.05_277)]/70">
                            Portfolio of
                          </p>
                          <p className="font-heading text-2xl font-bold text-[oklch(0.23_0.05_277)] sm:text-3xl">
                            {profile.name}
                          </p>
                        </motion.div>
                      </motion.div>
                    </motion.button>
                  </Magnetic>
                </div>

                {/* Click hint */}
                <motion.span
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-xs font-medium text-muted-foreground backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.85, duration: 0.5 }}
                >
                  <MousePointerClick className="h-4 w-4 text-primary" />
                  Click the folder to open
                </motion.span>
              </div>
            </div>

            {/* Name & tagline below both columns (mobile) */}
            <motion.p
              className="mt-8 max-w-md text-pretty text-center leading-relaxed text-muted-foreground sm:hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {profile.tagline}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Revealed / character stage ===== */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            key="character-stage"
            className="grid w-full max-w-3xl items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="relative h-[52vh] min-h-[380px] w-full"
              initial={{ y: 80, scale: 0.7, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-30"
                style={{ background: 'radial-gradient(ellipse at 50% 70%, oklch(0.82 0.075 85 / 0.25) 0%, transparent 70%)' }}
              />
              <Character3D />
            </motion.div>

            <motion.div
              className="flex justify-center"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
              }}
            >
              <ProfilePanel />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll-down hint — fades away once the folder is opened */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1 text-muted-foreground/70"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
