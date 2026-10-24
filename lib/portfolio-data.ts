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
    'Next.js',
    'UI / UX Design',
    'Three.js',
    'Framer Motion',
    'Figma',
    'Tailwind CSS',
    'Power BI',
    'SQL',
    'Python',
    'Data Analysis',
  ],
  socials: [
    { label: 'GitHub', href: 'https://github.com/Adtcsc' },
    { label: 'GitHub', href: 'https://github.com/AlketA21' },
  ],
}

export type Project = {
  slug: string
  title: string
  category: string
  description: string
  gradient: string
  type: 'design' | 'social-media' | 'data'
  /** Optional external URL — when set, the project card links out to the live site instead of the internal case-study page. */
  liveUrl?: string
}

export const projects: Project[] = [
  // ── Design & Web ──────────────────────────────────────────────────────
  {
    slug: 'aurora-banking',
    title: 'Aurora Banking',
    category: 'Product Design',
    description: 'A calm, trustworthy mobile banking experience with focus on clarity and trust.',
    gradient: 'from-amber-300 via-orange-400 to-rose-400',
    type: 'design',
  },
  {
    slug: 'lumen-studio',
    title: 'Lumen Studio',
    category: 'Brand & Web',
    description: 'Full identity and website for a creative photography studio in Tirana.',
    gradient: 'from-cyan-300 via-sky-400 to-indigo-400',
    type: 'design',
  },
  {
    slug: 'verdant',
    title: 'Verdant',
    category: 'Web App',
    description: 'A plant-care companion with delightful micro-interactions and soft animations.',
    gradient: 'from-emerald-300 via-teal-400 to-cyan-500',
    type: 'design',
  },
  {
    slug: 'creppizza-pedonale',
    title: 'crePPizza Pedonale',
    category: 'Web Design & Development',
    description:
      'A bilingual (Albanian/English) online menu site for an artisan crêperie & pizzeria — built around clean category navigation, appetite-driven photography, and a fast, mobile-first ordering flow.',
    gradient: 'from-orange-300 via-red-400 to-amber-500',
    type: 'design',
    liveUrl: 'https://creppizza-pedonale.netlify.app/',
  },
  // ── Social Media ──────────────────────────────────────────────────────
  {
    slug: 'noura-cafe',
    title: 'Noura Café',
    category: 'Social Media',
    description: 'Monthly content strategy and visual identity for an artisan café in Tirana.',
    gradient: 'from-yellow-300 via-amber-400 to-orange-500',
    type: 'social-media',
  },
  {
    slug: 'moda-al',
    title: 'Moda AL',
    category: 'Social Media',
    description: 'Instagram reels, stories and feed design for a local fashion brand.',
    gradient: 'from-pink-300 via-rose-400 to-fuchsia-500',
    type: 'social-media',
  },
  {
    slug: 'terra-architects',
    title: 'Terra Architects',
    category: 'Social Media',
    description: 'LinkedIn and Instagram presence for an architecture studio — clean, minimal posts.',
    gradient: 'from-stone-300 via-zinc-400 to-slate-500',
    type: 'social-media',
  },
  // ── Data Analyst | BI Developer ───────────────────────────────────────
  {
    slug: 'sales-dashboard',
    title: 'Sales Performance Dashboard',
    category: 'Power BI',
    description: 'Interactive Power BI dashboard tracking KPIs, revenue trends and regional sales performance across multiple business units.',
    gradient: 'from-violet-400 via-purple-500 to-indigo-600',
    type: 'data',
  },
  {
    slug: 'hr-analytics',
    title: 'HR Analytics Report',
    category: 'Data Analysis',
    description: 'End-to-end analysis of employee retention, hiring trends and workforce distribution using Python and Power BI.',
    gradient: 'from-teal-400 via-emerald-500 to-green-600',
    type: 'data',
  },
  {
    slug: 'ecommerce-bi',
    title: 'E-Commerce BI Suite',
    category: 'BI Developer',
    description: 'Full business intelligence solution for an e-commerce client: data modelling, DAX measures and automated reporting pipeline.',
    gradient: 'from-blue-400 via-cyan-500 to-sky-600',
    type: 'data',
  },
]
