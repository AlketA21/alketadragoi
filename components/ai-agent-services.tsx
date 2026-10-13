import { MessageCircle, Workflow, Plug, Bot } from 'lucide-react'
import { profile } from '@/lib/portfolio-data'

const SERVICES = [
  {
    icon: MessageCircle,
    label: 'Simple Chatbot / Automation',
    title: 'AI Chatbot & Task Automation',
    description: 'Handles FAQs and routine requests instantly, 24/7.',
  },
  {
    icon: Workflow,
    label: 'Custom AI Workflow Agent',
    title: 'Custom AI Workflow Agent',
    description: 'Reads, decides, and acts across multiple steps of your process.',
  },
  {
    icon: Plug,
    label: 'AI API Integration',
    title: 'AI API Integration',
    description: 'Wires AI directly into your website, app, or existing tools.',
  },
  {
    icon: Bot,
    label: 'Advanced Multi-Step AI Agent',
    title: 'Advanced Multi-Step Agent',
    description: 'Chains research, processing, and reporting end-to-end.',
  },
]

export function AiAgentServices() {
  return (
    <div className="mt-10 flex w-full flex-col items-center">
      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {SERVICES.map((service) => (
          <div
            key={service.title}
            className="flex flex-col items-start gap-2 rounded-2xl border border-border bg-card/60 p-4 text-left backdrop-blur-sm"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
              <service.icon className="h-4 w-4" />
            </span>
            <p className="font-heading text-sm font-bold leading-tight text-foreground">
              {service.title}
            </p>
            <p className="text-xs leading-snug text-muted-foreground">
              {service.description}
            </p>
          </div>
        ))}
      </div>

      <a
        href={`mailto:${profile.email}?subject=${encodeURIComponent('AI Agent project inquiry')}`}
        className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-[0_12px_30px_-8px_var(--gold)] transition-transform hover:scale-105 active:scale-95 sm:px-10 sm:py-5 sm:text-xl"
      >
        Request your AI Agent
      </a>
    </div>
  )
}
