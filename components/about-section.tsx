'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/scroll-reveal'
import { profile } from '@/lib/portfolio-data'

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden px-5 py-24 sm:py-32">
      {/* Background photo — low opacity, sits behind everything in this section */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/hero-bg.webp"
          alt=""
          fill
          className="object-cover opacity-10"
        />
      </div>

      <div className="mx-auto grid max-w-5xl items-center gap-10 sm:grid-cols-2 sm:gap-14">
        {/* Text — shifted left */}
        <div className="order-2 text-left sm:order-1">
          <ScrollReveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
              About
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-snug sm:text-4xl text-balance">
              A designer who codes, and a developer who cares about{' '}
              <span className="text-gradient">how things feel.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
              {profile.bio} Based in {profile.location}, I work across the full
              design-to-development spectrum, turning ideas into polished products
              that are a joy to use.
            </p>
          </ScrollReveal>
        </div>

        {/* Photo — on the right, zooms in as it scrolls into view */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, x: 80 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-1 aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border sm:order-2"
        >
          <Image
            src="/alketa-hero.webp"
            alt={profile.name}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  )
}
