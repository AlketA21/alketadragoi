'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Layers, Share2, BarChart2, Bot } from 'lucide-react'
import { ScrollReveal } from '@/components/scroll-reveal'
import { visibleProjects } from '@/lib/portfolio-data'
import { useWorkVisibility } from '@/components/work-visibility-context'

type Tab = 'design' | 'social-media' | 'data' | 'ai-agent'

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'design',       label: 'Design & Web',         icon: <Layers   className="h-3.5 w-3.5" /> },
  { id: 'social-media', label: 'Social Media',          icon: <Share2   className="h-3.5 w-3.5" /> },
  { id: 'data',         label: 'Data Analyst | BI Dev', icon: <BarChart2 className="h-3.5 w-3.5" /> },
  { id: 'ai-agent',     label: 'AI Agent',              icon: <Bot      className="h-3.5 w-3.5" /> },
]

// ── Single sticky-stack card ─────────────────────────────────────────────
function StackCard({
  project,
  index,
  total,
}: {
  project: (typeof visibleProjects)[0]
  index: number
  total: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { saveReturnPoint } = useWorkVisibility()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scale   = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - index) * 0.035])
  const opacity = useTransform(scrollYProgress, [0.85, 1], [1, index === total - 1 ? 1 : 0.55])

  const topOffset = 88 + index * 18

  return (
    <div ref={ref} className="sticky" style={{ top: `${topOffset}px` }}>
      <motion.div style={{ scale, opacity }}>
        <Link
          href={`/projects/${project.slug}`}
          onClick={saveReturnPoint}
          data-cursor-view
          className="group relative flex flex-col rounded-3xl border border-border bg-card/90 backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_32px_80px_-20px_oklch(0.82_0.075_85_/_0.3)] sm:flex-row sm:h-64"
        >
          {/* Photo frame — modern: geometric shapes peek out behind it, hover scale/tilt/glow */}
          <div className="relative h-52 w-full shrink-0 sm:h-full sm:w-72">
            {/* Decorative geometric shapes behind the photo, tinted with the project's own gradient */}
            <div
              aria-hidden
              className={`absolute -left-3 -top-3 h-16 w-16 rotate-12 rounded-2xl bg-gradient-to-br ${project.gradient} opacity-70 blur-[1px] transition-transform duration-500 group-hover:rotate-[24deg] group-hover:scale-110`}
            />
            <div
              aria-hidden
              className={`absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-gradient-to-br ${project.gradient} opacity-60 blur-[2px] transition-transform duration-500 group-hover:-translate-x-1 group-hover:translate-y-1 group-hover:scale-110`}
            />

            <div className={`relative h-full w-full overflow-hidden rounded-3xl ring-1 ring-border/60 transition-all duration-500 group-hover:ring-primary/60 group-hover:shadow-[0_20px_45px_-12px_oklch(0.82_0.075_85_/_0.45)] ${project.image ? 'bg-muted' : `bg-gradient-to-br ${project.gradient}`}`}>
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 288px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
                />
              )}
              <span className="absolute left-5 top-5 z-10 font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-white/80 [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="absolute bottom-4 left-5 z-10 rounded-full bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                {project.category}
              </span>
              {/* Subtle sheen sweep on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
              />
            </div>
          </div>

          {/* Text content */}
          <div className="flex flex-1 flex-col justify-between p-7">
            <div>
              <h3 className="font-heading text-2xl font-bold text-foreground leading-tight">
                {project.title}
              </h3>
              <p className="mt-3 line-clamp-3 text-base leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                View project
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 text-foreground transition-all duration-300 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </div>

          {/* Gold glow border on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: 'linear-gradient(120deg, oklch(0.82 0.075 85), oklch(0.74 0.06 82), oklch(0.66 0.05 70))',
              WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              padding: '1px',
            }}
          />
        </Link>
      </motion.div>
    </div>
  )
}

// ── Main section ─────────────────────────────────────────────────────────
export function WorkSection() {
  const [active, setActive] = useState<Tab>('design')
  const { workVisible, openWork } = useWorkVisibility()
  const filtered = visibleProjects.filter((p) => p.type === active)

  // Before it's triggered (folder click or navbar "Work" click), this section
  // renders only a slim, clickable teaser — no full project list on scroll.
  if (!workVisible) {
    return (
      <section id="work" className="mx-auto max-w-4xl scroll-mt-24 px-5 py-10 sm:py-14">
        <ScrollReveal>
          <button
            type="button"
            onClick={() => openWork()}
            className="group mx-auto flex flex-col items-center gap-3 rounded-3xl border border-dashed border-border/70 px-8 py-8 text-center transition-colors hover:border-primary"
          >
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Work</span>
            <span className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
              Click to see selected projects
            </span>
            <span className="mt-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-all duration-300 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </button>
        </ScrollReveal>
      </section>
    )
  }

  return (
    <section id="work" className="mx-auto max-w-4xl scroll-mt-24 px-5 py-24 sm:py-32">
      {/* Header */}
      <ScrollReveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Work</p>
        <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl text-balance">
          <span className="text-gradient">Selected projects</span>
        </h2>
      </ScrollReveal>

      {/* Tab switcher */}
      <ScrollReveal delay={100}>
        <div className="mt-8 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                active === tab.id
                  ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                  : 'border-border bg-card/60 text-muted-foreground hover:text-foreground backdrop-blur-sm'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Stack cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="mt-10 flex flex-col gap-5"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {filtered.map((project, i) => (
            <StackCard
              key={project.slug}
              project={project}
              index={i}
              total={filtered.length}
            />
          ))}
          <div className="h-24" />
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
