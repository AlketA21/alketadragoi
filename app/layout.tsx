import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { GrainOverlay } from '@/components/grain-overlay'
import { SITE_URL } from '@/lib/site-config'
import { profile } from '@/lib/portfolio-data'
import './globals.css'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
})
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const title = 'Alketa Dragoi — UI/UX Designer, Frontend Developer & Data Analyst'
const description =
  'Portfolio of Alketa Dragoi, a UI/UX designer, frontend developer and Power BI data analyst in Tirana, Albania — websites, dashboards and AI automation.'

// Runs before first paint: applies the saved/system theme (no flash) and
// decides whether to show the intro splash (first visit of the session only;
// skipped for crawlers and speed-test bots so they see the content at once).
const bootScript = `(function(){try{var d=document.documentElement;var t=null;try{t=localStorage.getItem('ad-theme')}catch(e){}
if(t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches))d.classList.add('dark');
var bot=/bot|crawl|spider|slurp|lighthouse|pagespeed|headless|gtmetrix/i.test(navigator.userAgent)||navigator.webdriver;
if(!bot&&!sessionStorage.getItem('intro-seen'))d.classList.add('intro-pending')}catch(e){}})();`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${profile.name}`,
  },
  description,
  applicationName: 'Alketa Dragoi Portfolio',
  category: 'portfolio',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  // Google Search Console verification token
  verification: { google: 'V6EbkP28388IMg5cmdxRvwZuV8t5SXuqSaSi1nfF0Lg' },
  keywords: [
    profile.name,
    'UI/UX designer',
    'frontend developer',
    'web design portfolio',
    'Power BI developer',
    'data analyst',
    'AI automation',
    'Tirana Albania designer',
    ...profile.skills,
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: 'Alketa Dragoi — Portfolio',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-light-32x32.png', sizes: '32x32', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', media: '(prefers-color-scheme: dark)' },
    ],
    apple: [{ url: '/apple-icon.png' }],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ebe6dc' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1917' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: profile.name,
        jobTitle: profile.role,
        url: SITE_URL,
        address: {
          '@type': 'PostalAddress',
          addressLocality: profile.location,
        },
        email: profile.email,
        knowsLanguage: profile.languages,
        knowsAbout: profile.skills,
        image: `${SITE_URL}/og-image.png`,
        sameAs: profile.socials.map((s) => s.href),
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: title,
        description,
        publisher: { '@id': `${SITE_URL}/#person` },
        inLanguage: 'en',
      },
    ],
  }

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} bg-background`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>{children}</ThemeProvider>
        <GrainOverlay />
      </body>
    </html>
  )
}
