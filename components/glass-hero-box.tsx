'use client'

import { Bot } from 'lucide-react'

/**
 * Glassmorphism placeholder box for the AI Agent category's hero —
 * used instead of a real photo/illustration until a real project exists.
 * Frosted-glass card: blurred, semi-transparent, soft border + glow.
 */
export function GlassHeroBox() {
  return (
    <div className="relative mt-12 flex h-64 w-full items-center justify-center overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.15)] backdrop-blur-2xl sm:h-80">
      {/* Soft color glows behind the glass, matching the site's gold accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl"
      />
      {/* Subtle top sheen, typical of a glass surface */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent"
      />

      <div className="relative flex flex-col items-center gap-3">
        <Bot className="h-10 w-10 text-foreground/70 sm:h-12 sm:w-12" />
        <p className="font-heading text-3xl font-bold tracking-[0.08em] text-foreground sm:text-5xl">
          AI AGENT
        </p>
      </div>
    </div>
  )
}
