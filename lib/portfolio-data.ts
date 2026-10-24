export const profile = {
  name: 'Alketa Dragoi',
  role: 'Designer & Frontend Developer',
  location: 'Tirana, Albania',
  email: 'alketadragoi1@gmail.com',
  tagline: 'Crafting elegant, human-centered digital experiences.',
  bio: 'I design and build refined interfaces where motion, typography, and detail come together. I care about the small things, the easing of a transition, the rhythm of a layout, the warmth of a color. Because they add up to something that feels alive.',
  // Short line shown at the top of the page (hero), describing the work at a glance.
  servicesLine:
    'Brand-ready websites, product UI, social media design, and data-driven dashboards — built with clarity and care.',
  services: [
    'Web Design & Development',
    'UI / UX Design',
    'Social Media Design',
    'Data Analysis & BI',
  ],
  languages: ['Albanian', 'English', 'Italian'],
  education: 'B.Sc. in Computer Science, M.Sc. in Mathematics',
  skills: [
    'React',
    'TypeScript',
    'n8n',
    'Zapier',
    'Make.com',
    'Next.js',
    'UI / UX Design',
    'Three.js',
    'Framer Motion',
    'Figma',
    'Tailwind CSS',
    'Power BI',
    'SQL',
    'GHL',
    'Python',
    'Data Analysis',
  ],
  socials: [
    { label: 'GitHub (Adtcsc)', href: 'https://github.com/Adtcsc' },
    { label: 'GitHub (AlketA21)', href: 'https://github.com/AlketA21' },
  ],
}

export type Project = {
  slug: string
  title: string
  category: string
  description: string
  gradient: string
  type: 'design' | 'social-media' | 'data' | 'ai-agent'
  /** Optional external URL — when set, the project card links out to the live site instead of the internal case-study page. */
  liveUrl?: string
  /** Optional path to a real project photo/screenshot, e.g. '/projects/aurora-banking.jpg'.
   *  Place the actual image file in the `public/projects/` folder of the site and commit it
   *  to your repo so it stays visible after deploying to GitHub/Netlify.
   *  When omitted, the card falls back to the decorative gradient. */
  image?: string
  /** Optional extra photos shown in a gallery on the project's detail page. */
  gallery?: string[]
  /** Optional logo/brand mark shown as a small badge on the project's detail page. */
  logo?: string
  /** When true, uses the original 4-frame scattered visual + marquee (filled with
   *  real photos from `gallery`) instead of the single cover-photo + full gallery stack. */
  frameLayout?: boolean
  /** Optional path to a downloadable code file (e.g. a .sql script) shown as a
   *  "Download" link on the project's detail page. */
  codeFile?: string
  /** Short excerpt of the code file shown inline as a preview (the file itself
   *  may be much longer — mention the full length in the description). */
  codeExcerpt?: string
  /** Optional external link to the full source code (e.g. on GitHub) — shown
   *  as a small, optional "View source" link rather than embedded inline. */
  codeUrl?: string
  /** For detailed, ordered case studies: an alternating sequence of full-width
   *  images and their accompanying written explanation, shown in this exact
   *  order instead of the standard cover-photo + gallery layout. */
  caseStudy?: { image?: string; heading?: string; text: string }[]
  /** When true, this project is excluded from the Work grid, the sitemap, and
   *  static page generation (its detail page won't even build). Use this for
   *  unfilled placeholders you're not ready to show yet — flip it off once
   *  you have real content, no need to delete/retype the entry. */
  hidden?: boolean
}

export const projects: Project[] = [
  // ── Design & Web ──────────────────────────────────────────────────────
  {
    slug: 'omiros-ai',
    title: 'OMIROS AI',
    category: 'Web App Design & Development',
    description:
      'A modern fitness and nutrition web application that helps users reach their health goals through AI-powered tools — a BMI calculator, personalized meal and workout generators, an AI fitness coach, and a progress tracker, all wrapped in a clean, responsive, and intuitive interface.',
    gradient: 'from-rose-500 via-red-500 to-neutral-900',
    type: 'design',
    liveUrl: 'https://omiros-app.vercel.app/',
    image: '/projects/omiros-ai/cover.webp',
    gallery: [
      '/projects/omiros-ai/cover2.webp',
      '/projects/omiros-ai/om1.webp',
      '/projects/omiros-ai/om2.webp',
      '/projects/omiros-ai/om3.webp',
      '/projects/omiros-ai/om4.webp',
      '/projects/omiros-ai/om5.webp',
      '/projects/omiros-ai/om6.webp',
    ],
  },
  {
    slug: 'aurora-banking',
    title: 'Aurora Banking',
    category: 'Product Design',
    description: 'A calm, trustworthy mobile banking experience with focus on clarity and trust.',
    gradient: 'from-amber-300 via-orange-400 to-rose-400',
    type: 'design',
    hidden: true,
  },
  {
    slug: 'olympiad-mind',
    title: 'Olympiad Mind',
    category: 'Brand Identity & Social Media',
    description:
      'A full brand identity and Instagram carousel system for an olympiad-prep education brand — built around three pillars (π-Mind for Mathematics, e-Mind for English, Σ-Mind for Science), with a consistent orange-and-graphite visual language.',
    gradient: 'from-orange-400 via-amber-500 to-neutral-800',
    type: 'design',
    frameLayout: true,
    liveUrl: 'https://proventusal.com',
    image: '/projects/olympiad-mind/mockup-1.jpg',
    logo: '/projects/olympiad-mind/logo.webp',
    gallery: [
      '/projects/olympiad-mind/brand-guide.jpg',
      '/projects/olympiad-mind/mockup-2.jpg',
      '/projects/olympiad-mind/mockup-3.jpg',
      '/projects/olympiad-mind/slide-cover.jpg',
      '/projects/olympiad-mind/slide-ending.jpg',
      '/projects/olympiad-mind/brand-page.jpg',
      '/projects/olympiad-mind/slide-pi-mind.jpg',
      '/projects/olympiad-mind/slide-e-mind.jpg',
      '/projects/olympiad-mind/slide-sigma-mind.jpg',
    ],
  },
  {
    slug: 'lumen-studio',
    title: 'Lumen Studio',
    category: 'Brand & Web',
    description: 'Full identity and website for a creative photography studio in Tirana.',
    gradient: 'from-cyan-300 via-sky-400 to-indigo-400',
    type: 'design',
    hidden: true,
  },
  {
    slug: 'verdant',
    title: 'Verdant',
    category: 'Web App',
    description: 'A plant-care companion with delightful micro-interactions and soft animations.',
    gradient: 'from-emerald-300 via-teal-400 to-cyan-500',
    type: 'design',
    hidden: true,
  },
  {
    slug: 'creppizza-pedonale',
    title: 'crePPiZZa Pedonale',
    category: 'Web Design & Development',
    description:
      'A bilingual (Albanian/English) online menu site for an artisan crêperie & pizzeria — built around clean category navigation, appetite-driven photography, and a fast, mobile-first ordering flow.',
    gradient: 'from-orange-300 via-red-400 to-amber-500',
    type: 'design',
    liveUrl: 'https://creppizza-pedonale.netlify.app/',
    image: '/projects/creppizza-pedonale/cover.jpg',
    gallery: [
      '/projects/creppizza-pedonale/menu.jpg',
      '/projects/creppizza-pedonale/foto-1.jpg',
      '/projects/creppizza-pedonale/foto-2.jpg',
    ],
    logo: '/projects/creppizza-pedonale/logo-transparent.webp',
  },
  // ── Social Media ──────────────────────────────────────────────────────
  {
    slug: 'ai-tool-cheat-sheet',
    title: 'AI Tool Cheat Sheet — Carousel Design',
    category: 'Social Media',
    description:
      'A 5-slide Instagram carousel breaking down AI tools by audience — creators, marketers, writers, and developers — complete with its own visual system (chartreuse accent, Tusker Grotesk + Proxima Nova) and mockup presentation.',
    gradient: 'from-lime-300 via-yellow-400 to-neutral-900',
    type: 'social-media',
    image: '/projects/ai-tool-cheat-sheet/phone-mockup.webp',
    gallery: [
      '/projects/ai-tool-cheat-sheet/cover-slide.jpg',
      '/projects/ai-tool-cheat-sheet/style-guide.jpg',
      '/projects/ai-tool-cheat-sheet/floating-cards.webp',
      '/projects/ai-tool-cheat-sheet/full-carousel.jpg',
      '/projects/ai-tool-cheat-sheet/tagline-cards.webp',
    ],
  },
  {
    slug: 'moda-al',
    title: 'Moda AL',
    category: 'Social Media',
    description: 'Instagram reels, stories and feed design for a local fashion brand.',
    gradient: 'from-pink-300 via-rose-400 to-fuchsia-500',
    type: 'social-media',
    hidden: true,
  },
  {
    slug: 'terra-architects',
    title: 'Terra Architects',
    category: 'Social Media',
    description: 'LinkedIn and Instagram presence for an architecture studio — clean, minimal posts.',
    gradient: 'from-stone-300 via-zinc-400 to-slate-500',
    type: 'social-media',
    hidden: true,
  },
  // ── Data Analyst | BI Developer ───────────────────────────────────────
  {
    slug: 'revenue-analysis-dashboard',
    title: 'SQL & Power BI — Revenue Analysis Dashboard',
    category: 'Power BI Developer',
    description:
      'Built for Iridium in my role as a Power BI Developer, recreated here with dummy metrics for confidentiality.',
    gradient: 'from-amber-400 via-orange-500 to-slate-800',
    type: 'data',
    image: '/projects/revenue-analysis-dashboard/overview-dashboard.png',
    // Direct download — the SQL file itself, no GitHub dependency needed.
    codeFile: '/projects/revenue-analysis-dashboard/BC_Analysis_Script.sql',
    caseStudy: [
      {
        image: '/projects/revenue-analysis-dashboard/overview-dashboard.png',
        heading: 'Overview',
        text: 'Built for Iridium in my role as a Power BI Developer (recreated here with dummy metrics for confidentiality). This report replaced two twice-weekly manual processes, saving the company 152+ hours a year and adding filtering the old process never had.\n\nIt answers three business questions: what are the current month and previous month balances, along with variance, variance %, and monthly averages; what are the aging totals by individual service; and what are the totals by service type.',
      },
      {
        image: '/projects/revenue-analysis-dashboard/data-model.png',
        heading: 'SQL Script & Power BI Model',
        text: 'The underlying SQL script is 1,300+ lines long and uses a CTE for improved performance. That data is loaded into Power BI, where 14 tables were modeled from the primary source using Power Query.',
      },
      {
        image: '/projects/revenue-analysis-dashboard/service-charts.png',
        heading: '12 Service Reports',
        text: '12 individual reports were built to track revenue for each service — an overview tab plus one tab per service, each styled the same way but tracking metrics specific to that service. Every chart shown was a direct requirement from leadership, and each tab uses a "Day" and "Year/Month" slicer to drill down between bill cycles.',
      },
      {
        image: '/projects/revenue-analysis-dashboard/dax-measures.png',
        heading: '144 DAX Measures',
        text: '12 DAX measures were built for each of the 12 report tabs — 144 in total. Each service has 4 fee types, and each fee type gets 3 measures, for 12 measures per service.',
      },
      {
        image: '/projects/revenue-analysis-dashboard/super-calendar.jpg',
        heading: 'Custom Calendar',
        text: 'A custom calendar table was built in Power Query to properly represent date logic across every chart in the report.',
      },
      {
        heading: 'Conclusion',
        text: 'Overall, this project streamlined revenue reporting, replacing a manual process previously built in Excel and saving the company significant time every year.\n\nThe full SQL script is available on request — optional to view, since the story above already covers what it does and why.',
      },
    ],
  },
  // ── AI Agent ──────────────────────────────────────────────────────────
  {
    slug: 'ai-agent-solutions',
    title: 'AI Agent Solutions',
    category: 'AI Agent',
    description:
      'Custom AI agents and automations built around real workflows — from chatbots and task automation to multi-step agents that chain research, decisions, and actions end-to-end.',
    gradient: 'from-fuchsia-400 via-purple-500 to-indigo-600',
    type: 'ai-agent',
    hidden: false,
  },
]

/** Use this everywhere the site *displays* or *generates pages for* projects
 *  (Work grid, sitemap, generateStaticParams). Keeps hidden placeholders out
 *  of the live site entirely, while `projects` still has them for later. */
export const visibleProjects = projects.filter((p) => !p.hidden)
