'use client'

import { useState } from 'react'
import { Layers, Share2, BarChart2, Bot, ArrowUpRight, Check } from 'lucide-react'
import { ScrollReveal } from '@/components/scroll-reveal'
import { profile } from '@/lib/portfolio-data'

type Tab = 'design' | 'social-media' | 'data' | 'ai-agent'

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'design',       label: 'Design & Web',         icon: <Layers    className="h-3.5 w-3.5" /> },
  { id: 'social-media', label: 'Social Media',         icon: <Share2    className="h-3.5 w-3.5" /> },
  { id: 'data',         label: 'Data Analyst | BI Dev', icon: <BarChart2 className="h-3.5 w-3.5" /> },
  { id: 'ai-agent',     label: 'AI Agent',              icon: <Bot       className="h-3.5 w-3.5" /> },
]

// Solo-freelancer market rates (not agency pricing) — adjust freely in this file.
const PRICING: Record<Tab, { name: string; unit: string; price: string }[]> = {
  design: [
    { name: 'Landing Page Design',        unit: 'PER PAGE',    price: '$80' },
    { name: 'Business Website (up to 6 pages)', unit: 'PER WEBSITE', price: '$250' },
    { name: 'UI/UX App Design',            unit: 'PER PROJECT', price: '$200' },
    { name: 'Logo & Brand Identity',       unit: 'ONE-TIME',    price: '$90' },
    { name: 'Full Website Development',    unit: 'PER WEBSITE', price: '$350' },
  ],
  'social-media': [
    { name: 'Single Social Media Post',    unit: 'PER DESIGN',  price: '$10' },
    { name: 'Content Package (10 posts)',  unit: 'PER PACKAGE', price: '$80' },
    { name: 'Reel / Short Video Edit',     unit: 'PER REEL',    price: '$25' },
    { name: 'Monthly Content Plan (15 posts)', unit: 'MONTHLY', price: '$150' },
  ],
  data: [
    { name: 'Data Analysis Report',        unit: 'PER PROJECT', price: '$80' },
    { name: 'Power BI Dashboard',          unit: 'PER DASHBOARD', price: '$150' },
    { name: 'Excel Automation & Reporting', unit: 'PER PROJECT', price: '$60' },
    { name: 'Full BI Solution Setup',      unit: 'PER PROJECT', price: '$300' },
  ],
  'ai-agent': [
    { name: 'Simple Chatbot / Automation', unit: 'PER PROJECT', price: '$100' },
    { name: 'Custom AI Workflow Agent',    unit: 'PER PROJECT', price: '$250' },
    { name: 'AI API Integration',          unit: 'PER PROJECT', price: '$150' },
    { name: 'Advanced Multi-Step AI Agent', unit: 'PER PROJECT', price: '$400' },
  ],
}

export function PricingSection() {
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState<Tab>('design')
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  function handleStartClick(itemName: string) {
    const subject = `Project inquiry — ${itemName}`
    const text = `To: ${profile.email}\nSubject: ${subject}`
    // Fallback in case the mailto: link doesn't open a mail client in this
    // environment (e.g. a preview sandbox, or no default mail app set).
    navigator.clipboard?.writeText(text).catch(() => {})
    setCopiedItem(itemName)
    setTimeout(() => setCopiedItem((current) => (current === itemName ? null : current)), 2500)
  }

  // Before it's clicked open, this section renders only a slim teaser —
  // no pricing list on plain scroll, same pattern as the Work section.
  if (!visible) {
    return (
      <section id="pricing" className="mx-auto max-w-4xl scroll-mt-24 px-5 py-10 sm:py-14">
        <ScrollReveal>
          <button
            type="button"
            onClick={() => setVisible(true)}
            className="group mx-auto flex flex-col items-center gap-3 rounded-3xl border border-dashed border-border/70 px-8 py-8 text-center transition-colors hover:border-primary"
          >
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Pricing</span>
            <span className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
              Click to see pricing
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
    <section id="pricing" className="mx-auto max-w-4xl scroll-mt-24 px-5 py-24 sm:py-32">
      <ScrollReveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Pricing</p>
        <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl text-balance">
          <span className="text-gradient">Simple, transparent pricing.</span>
        </h2>
        <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          Straightforward per-project rates for individuals and small teams. Final
          pricing depends on scope — send a message and I&apos;ll recommend the right
          fit for your budget and timeline.
        </p>
      </ScrollReveal>

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

      <ScrollReveal delay={150}>
        <div className="mt-8 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card/60 backdrop-blur-sm">
          {PRICING[active].map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between gap-4 px-6 py-5"
            >
              <div>
                <p className="font-heading text-base font-bold text-foreground sm:text-lg">
                  {item.name}
                </p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {item.unit}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <span className="font-heading text-lg font-bold text-primary sm:text-xl">
                  {item.price}
                </span>
                <a
                  href={`mailto:${profile.email}?subject=${encodeURIComponent(
                    `Project inquiry — ${item.name}`,
                  )}`}
                  onClick={() => handleStartClick(item.name)}
                  className="group inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-background/60 px-3.5 text-xs font-semibold uppercase tracking-wide text-foreground transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  {copiedItem === item.name ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      Start
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45" />
                    </>
                  )}
                </a>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Need something that doesn&apos;t fit the list above?{' '}
          <a
            href={`mailto:${profile.email}?subject=${encodeURIComponent('Custom project inquiry')}`}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Email me your project details
          </a>{' '}
          and I&apos;ll put together a custom quote.
        </p>
      </ScrollReveal>
    </section>
  )
}
