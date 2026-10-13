'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import type { Project } from '@/lib/portfolio-data'

const LABELS_BY_TYPE: Record<Project['type'], string[]> = {
  design: ['+ SHTO SCREENSHOT', '+ SHTO MOCKUP', '+ SHTO UI FLOW', '+ SHTO PROTOTIP'],
  'social-media': ['+ SHTO POST', '+ SHTO REEL', '+ SHTO STORY', '+ SHTO KAMPANJË'],
  data: ['+ SHTO DASHBOARD', '+ SHTO RAPORT', '+ SHTO GRAFIK', '+ SHTO KPI'],
  'ai-agent': ['+ SHTO DEMO', '+ SHTO FLOW', '+ SHTO PROMPT', '+ SHTO OUTPUT'],
}

const ROTATIONS = [-9, 6, 4, -6]
const SIZES = [168, 168, 150, 168]

/**
 * "Hero Visual" — 4 scattered polaroid-style cards, same size/rotation/shadow
 * whether they hold a placeholder label or a real photo. Pass `images` (up to 4)
 * to fill the frames with real work; omit it to keep the "+ SHTO ..." placeholder.
 */
export function ProjectHeroVisual({ project, images }: { project: Project; images?: string[] }) {
  const labels = LABELS_BY_TYPE[project.type]

  return (
    <div className="relative mx-auto mt-14 hidden h-[340px] w-full max-w-md sm:h-[420px] sm:max-w-lg min-[520px]:block">
      {labels.map((label, i) => {
        const size = SIZES[i]
        const rotate = ROTATIONS[i]
        // Scatter positions across the container, roughly "thrown on a table"
        const positions = [
          { top: '6%', left: '8%' },
          { top: '2%', left: '46%' },
          { top: '42%', left: '4%' },
          { top: '34%', left: '42%' },
        ]
        const pos = positions[i]
        const image = images?.[i]

        return (
          <div
            key={label}
            className={`absolute overflow-hidden rounded-[20px] shadow-[0_12px_30px_rgba(20,17,15,0.18)] transition-transform duration-300 hover:z-10 hover:scale-[1.04] hover:shadow-[0_18px_40px_rgba(20,17,15,0.28)] ${
              image ? '' : `flex items-center justify-center bg-gradient-to-br ${project.gradient}`
            }`}
            style={{
              width: size,
              height: size,
              top: pos.top,
              left: pos.left,
              transform: `rotate(${rotate}deg)`,
            }}
          >
            {image ? (
              <Image src={image} alt={`${project.title} — ${i + 1}`} fill sizes="200px" className="object-cover" />
            ) : (
              <span
                className="px-3 text-center font-mono text-[11px] uppercase tracking-[0.15em]"
                style={{ color: 'rgba(20,17,15,0.55)' }}
              >
                {label}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

/**
 * "Marquee" — an endlessly scrolling strip of plates (doubled via JS for a
 * seamless loop). Hover pauses the scroll. Pass `images` to fill the plates
 * with real work (cycles through them if fewer than 8); omit it to keep the
 * "+ SHTO PAMJE PUNE" placeholder.
 */
export function ProjectMarquee({ project, images }: { project: Project; images?: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    // Guard against double-duplication (e.g. React StrictMode double-invoking effects)
    if (track.dataset.doubled === 'true') return
    track.innerHTML += track.innerHTML
    track.dataset.doubled = 'true'
  }, [])

  const plateCount = 8
  const plates = Array.from({ length: plateCount })

  return (
    <div className="relative mt-16 w-screen overflow-hidden py-2 ml-[calc(50%-50vw)]">
      {/* Edge fade gradients */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

      <div
        ref={trackRef}
        className="marquee-track flex w-max items-center gap-5"
      >
        {plates.map((_, i) => {
          const image = images && images.length > 0 ? images[i % images.length] : undefined
          return (
            <div
              key={i}
              className={`relative flex h-[160px] w-[160px] shrink-0 items-center justify-center overflow-hidden rounded-[20px] sm:h-[210px] sm:w-[220px] ${
                image
                  ? 'border border-border'
                  : `border-2 border-dashed bg-gradient-to-br ${project.gradient}`
              }`}
              style={image ? undefined : { borderColor: 'rgba(20,17,15,0.45)' }}
            >
              {image ? (
                <Image src={image} alt={`${project.title} — ${i + 1}`} fill sizes="220px" className="object-cover" />
              ) : (
                <span
                  className="px-3 text-center font-mono text-xs uppercase tracking-[0.15em]"
                  style={{ color: 'rgba(20,17,15,0.55)' }}
                >
                  + SHTO PAMJE PUNE
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
