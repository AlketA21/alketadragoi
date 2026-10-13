import { Mail } from 'lucide-react'
import { ScrollReveal } from '@/components/scroll-reveal'
import { profile } from '@/lib/portfolio-data'

export function ContactSection() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-3xl px-5 py-24 text-center sm:py-32"
    >
      <ScrollReveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          Contact
        </p>
        <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl text-balance">
          Let&apos;s build something{' '}
          <span className="text-gradient">beautiful together.</span>
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={150}>
        <a
          href={`mailto:${profile.email}`}
          className="group mt-10 inline-flex items-center gap-3 rounded-full border border-primary/50 bg-card/60 px-6 py-3.5 backdrop-blur-sm transition-all duration-300 hover:border-primary hover:bg-primary"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors duration-300 group-hover:bg-background group-hover:text-primary">
            <Mail className="h-4 w-4" />
          </span>
          <span className="font-heading text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary-foreground sm:text-xl">
            {profile.email}
          </span>
        </a>
      </ScrollReveal>
    </section>
  )
}
