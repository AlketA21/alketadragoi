'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'

const GOLD = 'var(--gold)'
const MUTED = 'var(--muted-foreground)'

/** Original, simple line-diagram thumbnails — inspired by generic automation
 *  concepts, not copied from any source. Each is self-contained inline SVG. */
function TicketTriageDiagram() {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full">
      <circle cx="48" cy="90" r="26" fill="none" stroke={MUTED} strokeWidth="2" />
      <circle cx="40" cy="82" r="3" fill={MUTED} />
      <circle cx="56" cy="82" r="3" fill={MUTED} />
      <path d="M38 96 Q48 104 58 96" fill="none" stroke={MUTED} strokeWidth="2" strokeLinecap="round" />
      <path d="M78 90 L120 90" stroke={MUTED} strokeWidth="2" markerEnd="url(#arrow)" />
      <rect x="130" y="50" width="60" height="30" rx="6" fill="none" stroke={GOLD} strokeWidth="2" />
      <text x="160" y="70" fontSize="12" textAnchor="middle" fill={GOLD}>FAQ</text>
      <rect x="130" y="90" width="60" height="30" rx="6" fill="none" stroke={MUTED} strokeWidth="2" />
      <text x="160" y="110" fontSize="12" textAnchor="middle" fill={MUTED}>Urgent</text>
      <path d="M190 105 L240 105" stroke={MUTED} strokeWidth="2" markerEnd="url(#arrow)" />
      <rect x="240" y="90" width="60" height="30" rx="6" fill="none" stroke={MUTED} strokeWidth="2" />
      <text x="270" y="110" fontSize="12" textAnchor="middle" fill={MUTED}>Agent</text>
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill={MUTED} />
        </marker>
      </defs>
    </svg>
  )
}

function LeadScoringDiagram() {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full">
      <rect x="30" y="70" width="90" height="40" rx="8" fill="none" stroke={MUTED} strokeWidth="2" />
      <text x="75" y="94" fontSize="12" textAnchor="middle" fill={MUTED}>New Lead</text>
      <path d="M120 90 L165 90" stroke={MUTED} strokeWidth="2" markerEnd="url(#arrow2)" />
      <circle cx="200" cy="90" r="35" fill="none" stroke={GOLD} strokeWidth="2" />
      <text x="200" y="86" fontSize="11" textAnchor="middle" fill={GOLD}>Score</text>
      <text x="200" y="100" fontSize="11" textAnchor="middle" fill={GOLD}>85%</text>
      <path d="M235 78 L280 55" stroke={MUTED} strokeWidth="2" markerEnd="url(#arrow2)" />
      <path d="M235 102 L280 125" stroke={MUTED} strokeWidth="2" markerEnd="url(#arrow2)" />
      <text x="290" y="52" fontSize="11" fill={MUTED}>Sales</text>
      <text x="290" y="130" fontSize="11" fill={MUTED}>Nurture</text>
      <defs>
        <marker id="arrow2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill={MUTED} />
        </marker>
      </defs>
    </svg>
  )
}

function SentimentDiagram() {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full">
      <circle cx="60" cy="60" r="20" fill="none" stroke={MUTED} strokeWidth="2" />
      <path d="M50 65 Q60 73 70 65" fill="none" stroke={MUTED} strokeWidth="2" strokeLinecap="round" />
      <circle cx="140" cy="90" r="20" fill="none" stroke={MUTED} strokeWidth="2" />
      <path d="M130 90 L150 90" fill="none" stroke={MUTED} strokeWidth="2" strokeLinecap="round" />
      <circle cx="220" cy="120" r="20" fill="none" stroke={GOLD} strokeWidth="2" />
      <path d="M210 126 Q220 116 230 126" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
      <path d="M245 120 L285 100" stroke={GOLD} strokeWidth="2" markerEnd="url(#arrow3)" />
      <text x="288" y="90" fontSize="11" fill={GOLD}>Escalate</text>
      <rect x="20" y="145" width="220" height="8" rx="4" fill="none" stroke={MUTED} strokeWidth="1.5" />
      <rect x="20" y="145" width="140" height="8" rx="4" fill={MUTED} opacity="0.4" />
      <rect x="160" y="145" width="80" height="8" rx="4" fill={GOLD} opacity="0.6" />
      <defs>
        <marker id="arrow3" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill={GOLD} />
        </marker>
      </defs>
    </svg>
  )
}

function DocExtractionDiagram() {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full">
      <rect x="30" y="50" width="70" height="90" rx="6" fill="none" stroke={MUTED} strokeWidth="2" />
      <line x1="42" y1="70" x2="88" y2="70" stroke={MUTED} strokeWidth="2" />
      <line x1="42" y1="85" x2="88" y2="85" stroke={MUTED} strokeWidth="2" />
      <line x1="42" y1="100" x2="70" y2="100" stroke={MUTED} strokeWidth="2" />
      <path d="M100 95 L150 95" stroke={MUTED} strokeWidth="2" markerEnd="url(#arrow4)" />
      <rect x="155" y="60" width="90" height="70" rx="8" fill="none" stroke={GOLD} strokeWidth="2" />
      <text x="200" y="90" fontSize="11" textAnchor="middle" fill={GOLD}>Vendor</text>
      <text x="200" y="106" fontSize="11" textAnchor="middle" fill={GOLD}>Total</text>
      <text x="200" y="122" fontSize="11" textAnchor="middle" fill={GOLD}>Date</text>
      <path d="M245 95 L285 95" stroke={MUTED} strokeWidth="2" markerEnd="url(#arrow4)" />
      <rect x="285" y="80" width="26" height="30" rx="4" fill="none" stroke={MUTED} strokeWidth="2" />
      <defs>
        <marker id="arrow4" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill={MUTED} />
        </marker>
      </defs>
    </svg>
  )
}

function CrmSyncDiagram() {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full">
      <circle cx="70" cy="50" r="24" fill="none" stroke={MUTED} strokeWidth="2" />
      <text x="70" y="54" fontSize="10" textAnchor="middle" fill={MUTED}>Billing</text>
      <circle cx="70" cy="130" r="24" fill="none" stroke={MUTED} strokeWidth="2" />
      <text x="70" y="134" fontSize="10" textAnchor="middle" fill={MUTED}>Support</text>
      <circle cx="200" cy="90" r="30" fill="none" stroke={GOLD} strokeWidth="2" />
      <text x="200" y="86" fontSize="10" textAnchor="middle" fill={GOLD}>CRM</text>
      <text x="200" y="100" fontSize="10" textAnchor="middle" fill={GOLD}>Sync</text>
      <path d="M94 55 L172 80" stroke={MUTED} strokeWidth="2" markerEnd="url(#arrow5)" />
      <path d="M94 125 L172 100" stroke={MUTED} strokeWidth="2" markerEnd="url(#arrow5)" />
      <path d="M230 90 L280 90" stroke={GOLD} strokeWidth="2" markerEnd="url(#arrow5)" />
      <circle cx="298" cy="90" r="14" fill="none" stroke={MUTED} strokeWidth="2" />
      <defs>
        <marker id="arrow5" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill={MUTED} />
        </marker>
      </defs>
    </svg>
  )
}

function OnboardingDiagram() {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full">
      <circle cx="40" cy="90" r="18" fill="none" stroke={MUTED} strokeWidth="2" />
      <text x="40" y="94" fontSize="10" textAnchor="middle" fill={MUTED}>Sign up</text>
      <path d="M60 90 L100 90" stroke={MUTED} strokeWidth="2" markerEnd="url(#arrow6)" />
      <rect x="105" y="70" width="70" height="40" rx="8" fill="none" stroke={GOLD} strokeWidth="2" />
      <text x="140" y="86" fontSize="10" textAnchor="middle" fill={GOLD}>Guide</text>
      <text x="140" y="100" fontSize="10" textAnchor="middle" fill={GOLD}>steps</text>
      <path d="M180 90 L220 90" stroke={MUTED} strokeWidth="2" markerEnd="url(#arrow6)" />
      <circle cx="245" cy="70" r="16" fill="none" stroke={MUTED} strokeWidth="2" />
      <text x="245" y="74" fontSize="9" textAnchor="middle" fill={MUTED}>Done</text>
      <path d="M255 85 L280 115" stroke={MUTED} strokeWidth="2" markerEnd="url(#arrow6)" />
      <rect x="230" y="118" width="70" height="30" rx="6" fill="none" stroke={GOLD} strokeWidth="2" />
      <text x="265" y="137" fontSize="10" textAnchor="middle" fill={GOLD}>Nudge</text>
      <defs>
        <marker id="arrow6" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill={MUTED} />
        </marker>
      </defs>
    </svg>
  )
}

const EXAMPLES = [
  {
    tag: 'Support',
    title: 'Ticket Triage & Auto-Reply',
    problem:
      'When every message — simple or urgent — lands in the same inbox, support teams spend more time sorting tickets than solving them, and easy questions wait just as long as hard ones.',
    workflow:
      'The agent reads each incoming message and works out what it actually is. Simple, recognizable questions (like "where is my order") get answered immediately from your existing knowledge base. Anything ambiguous or high-stakes gets tagged with the right category and priority, and handed to a person with the context already attached — no re-explaining required.',
    benefit:
      'Response time on simple questions drops to seconds, and your team only sees the tickets that actually need a human judgment call.',
    Diagram: TicketTriageDiagram,
    image: '/projects/ai-agent/example1-ticket-triage.webp',
  },
  {
    tag: 'Sales',
    title: 'Automated Lead Scoring',
    problem:
      'Not every form submission is a real buyer. Without a filter, sales reps waste hours chasing leads who were never going to convert, while promising ones sit unanswered.',
    workflow:
      'As soon as a lead comes in, the agent checks it against your criteria — company size, role, engagement, source — and assigns a score. High-scoring leads are routed straight to a sales rep with the full context attached. Lower-scoring ones are placed into an automated nurture sequence instead of being dropped entirely.',
    benefit:
      'Sales reps spend their time on people who are actually ready to talk, and no promising lead quietly falls through the cracks.',
    Diagram: LeadScoringDiagram,
    image: '/projects/ai-agent/example2-lead-scoring.webp',
  },
  {
    tag: 'Customer Experience',
    title: 'Sentiment-Based Escalation',
    problem:
      'A single unhappy customer, if missed, can churn quietly — most people don\u2019t complain loudly, they just leave.',
    workflow:
      'The agent reads the tone of incoming messages, reviews, or post-interaction surveys — not just the words, but the sentiment behind them. The moment something reads as frustrated or negative, it\u2019s flagged and routed to a person immediately, before the conversation ends, rather than waiting for a scheduled review.',
    benefit:
      'Problems get caught while there\u2019s still a chance to fix them, instead of showing up later as a lost customer.',
    Diagram: SentimentDiagram,
    image: '/projects/ai-agent/example3-sentiment-escalation.webp',
  },
  {
    tag: 'Operations',
    title: 'Document Data Extraction',
    problem:
      'Invoices, receipts, and contracts arrive as PDFs or photos — someone still has to open each one and retype the numbers by hand.',
    workflow:
      'The agent reads the document directly, identifies the fields that matter (vendor, total, due date, line items), and checks them against expected values. High-confidence extractions flow straight into your system; anything uncertain is flagged for a quick human check instead of being entered blind.',
    benefit:
      'Hours of manual data entry become a few seconds of review, with far fewer typing errors.',
    Diagram: DocExtractionDiagram,
    image: '/projects/ai-agent/example4-document-extraction.jpg',
  },
  {
    tag: 'Systems',
    title: 'Cross-System CRM Sync',
    problem:
      'When billing, support, and sales tools don\u2019t talk to each other, every team ends up with a slightly different, slightly outdated version of the same customer.',
    workflow:
      'The moment something changes in one system — a plan upgrade, a support ticket, a cancelled subscription — the agent picks it up and pushes the update everywhere it needs to be, mapping the right fields between each tool automatically.',
    benefit:
      'Every team sees the same, current picture of the customer, without anyone manually copying data between tabs.',
    Diagram: CrmSyncDiagram,
    image: '/projects/ai-agent/example5-crm-sync.jpg',
  },
  {
    tag: 'Retention',
    title: 'Proactive Onboarding & Behavior-Based Nudges',
    problem:
      'Most churn doesn\u2019t happen because a customer complains — it happens quietly, when someone signs up, never gets past the first setup step, and simply stops coming back. By the time a human notices, the customer is already gone.',
    workflow:
      'Instead of reacting to one event, this agent runs continuously. It walks new users through the first essential steps, then keeps a quiet eye on behavior — did they finish setup, connect an integration, invite a teammate? A hit milestone gets a well-timed nudge toward the next feature; a missed one gets escalated to a person, complete with the customer\u2019s activity history attached.',
    benefit:
      'New customers reach their "first win" faster and are far less likely to disappear silently, and your team only has to step in personally for the handful of cases that genuinely need it.',
    Diagram: OnboardingDiagram,
    image: '/projects/ai-agent/example6-onboarding.webp',
    long: true,
  },
]

function ExampleCard({
  example,
  index,
  onOpenImage,
}: {
  example: (typeof EXAMPLES)[number]
  index: number
  onOpenImage: (src: string, title: string) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'start 0.35'],
  })

  // "Shuffle" motion: cards start slightly rotated and offset, like a fanned
  // deck, then settle flat and in place as they scroll into view.
  const baseRotate = index % 2 === 0 ? -6 : 6
  const rotate = useTransform(scrollYProgress, [0, 1], [baseRotate, 0])
  const x = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -24 : 24, 0])
  const y = useTransform(scrollYProgress, [0, 1], [40, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1])

  return (
    <motion.div
      ref={ref}
      style={{ rotate, x, y, opacity, scale }}
      className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={() => onOpenImage(example.image, example.title)}
        className="group relative h-56 w-full border-b border-border bg-background/40"
      >
        <Image
          src={example.image}
          alt={example.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
          <span className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-black">
            <ZoomIn className="h-4 w-4" />
            View full diagram
          </span>
        </span>
      </button>
      <div className="flex flex-col gap-2 p-5 text-left">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">
          {example.tag}
        </span>
        <p className="font-heading text-lg font-bold text-foreground">{example.title}</p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground/80">The problem: </span>
          {example.problem}
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground/80">How the agent handles it: </span>
          {example.workflow}
        </p>
        <p className="text-sm leading-relaxed text-primary">{example.benefit}</p>
      </div>
    </motion.div>
  )
}

export function AiAgentExamples() {
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null)

  return (
    <div className="mt-14 w-full">
      <p className="mb-6 text-center font-mono text-xs uppercase tracking-[0.3em] text-primary">
        Why use an AI Agent — examples
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {EXAMPLES.map((example, i) => (
          <ExampleCard
            key={example.title}
            example={example}
            index={i}
            onOpenImage={(src, title) => setLightbox({ src, title })}
          />
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative max-h-[90vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={lightbox.title}
                className="max-h-[90vh] w-full rounded-2xl object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

