import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import { visibleProjects } from '@/lib/portfolio-data'
import { SITE_URL } from '@/lib/site-config'
import { ProjectHeroVisual, ProjectMarquee } from '@/components/project-placeholder-visuals'
import { GlassHeroBox } from '@/components/glass-hero-box'
import { AiAgentServices } from '@/components/ai-agent-services'
import { AiAgentExamples } from '@/components/ai-agent-examples'
import { SiteLogo } from '@/components/site-logo'
import { ProjectGalleryStack } from '@/components/project-gallery-stack'
import { ExternalLink } from 'lucide-react'
import { BackToTop } from '@/components/back-to-top'

// Hidden (unfilled) projects are excluded here, so their detail pages don't
// even get built — and dynamicParams=false makes visiting the URL directly
// 404 instead of silently rendering on demand.
export function generateStaticParams() {
  return visibleProjects.map((p) => ({ slug: p.slug }))
}
export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = visibleProjects.find((p) => p.slug === slug)
  if (!project) return {}

  // The root layout's title template already appends " | Alketa Dragoi"
  const title = project.title
  const description = project.description.split('\n\n')[0]
  const url = `${SITE_URL}/projects/${project.slug}`
  const image = project.image ? `${SITE_URL}${project.image}` : undefined

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: image ? [{ url: image, alt: project.title }] : [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : [`${SITE_URL}/og-image.png`],
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = visibleProjects.find((p) => p.slug === slug)

  if (!project) notFound()


  const pageUrl = `${SITE_URL}/projects/${project.slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${pageUrl}#work`,
        name: project.title,
        description: project.description.split('\n\n')[0],
        url: pageUrl,
        genre: project.category,
        image: project.image ? `${SITE_URL}${project.image}` : undefined,
        author: { '@type': 'Person', name: 'Alketa Dragoi', url: SITE_URL },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: project.title, item: pageUrl },
        ],
      },
    ],
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="fixed inset-x-0 top-0 z-40">
        <nav className="mx-auto mt-3 flex max-w-6xl items-center rounded-full border border-border/60 bg-card/50 px-4 py-2.5 shadow-lg shadow-black/5 backdrop-blur-2xl sm:mx-auto sm:px-6 [width:calc(100%-1.5rem)] sm:[width:auto]">
          <SiteLogo />
        </nav>
      </header>

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
      />

      {/* Social Media category — soft illustrated background, low opacity in
          light mode, darkened further in dark mode so it never fights the content. */}
      {project.type === 'social-media' && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        >
          <Image
            src="/social-bg.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-top opacity-50 dark:opacity-20 dark:brightness-75"
          />
        </div>
      )}

      {project.logo && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden"
        >
          <Image
            src={project.logo}
            alt=""
            width={600}
            height={600}
            sizes="(max-width: 640px) 70vh, 90vh"
            className="h-[70vh] w-[70vh] max-w-none object-contain opacity-[0.06] sm:h-[90vh] sm:w-[90vh]"
          />
        </div>
      )}

      <Link
        href="/#work"
        className="relative z-10 mt-8 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-card/50 px-4 py-2 text-sm font-medium text-foreground shadow-[0_0_20px_-4px_var(--gold)] backdrop-blur-md transition-colors hover:bg-card/80"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Portfolio
      </Link>

      <div
        className={`relative z-10 mx-auto flex flex-col items-center text-center ${
          project.type === 'ai-agent' ? 'mt-8 max-w-5xl sm:mt-10' : 'mt-10 max-w-3xl sm:mt-14'
        }`}
      >
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          {project.category}
        </p>
        <h1 className="mt-4 font-heading text-5xl font-bold sm:text-7xl text-balance">
          <span className="text-gradient">{project.title}</span>
        </h1>

        {project.caseStudy ? null : project.frameLayout ? (
          // ── Keep the original 4-frame scattered visual + marquee, filled with real photos ──
          <ProjectHeroVisual project={project} images={project.gallery?.slice(0, 4)} />
        ) : project.image ? (
          // ── Real photo — reveal animation on load (scale-in + fade, like a premium case-study opener) ──
          <div className="project-reveal relative mt-12 h-72 w-full overflow-hidden rounded-3xl border border-border sm:h-[28rem]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            {project.logo && (
              <div className="absolute bottom-4 left-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/95 p-2 shadow-lg backdrop-blur-sm sm:h-20 sm:w-20">
                <Image
                  src={project.logo}
                  alt={`${project.title} logo`}
                  width={64}
                  height={64}
                  className="h-full w-full object-contain"
                />
              </div>
            )}
          </div>
        ) : project.type === 'ai-agent' ? (
          // ── AI Agent category, no photo yet — glass-effect "AI AGENT" box + services breakdown ──
          <GlassHeroBox />
        ) : (
          // ── No photo yet — designed placeholder visuals instead of a plain color box ──
          <>
            <ProjectHeroVisual project={project} />
            <p className="mt-6 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground sm:hidden">
              Content coming soon — check back later.
            </p>
          </>
        )}

        {project.caseStudy ? (
          <div className="mt-8 flex w-full max-w-2xl flex-col gap-10 text-left">
            {project.caseStudy.map((section, i) => (
              <div key={i}>
                {section.image && (
                  // Plain <img> on purpose: each screenshot has a different
                  // natural aspect ratio, and this guarantees it fills the
                  // exact width of the box with zero cropping (next/image's
                  // width/height props would force one fixed ratio for all).
                  <img
                    src={section.image}
                    alt={section.heading ?? `${project.title} — ${i + 1}`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="mb-4 h-auto w-full rounded-2xl border border-border"
                  />
                )}
                {section.heading && (
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                    {section.heading}
                  </p>
                )}
                <p className="mt-2 whitespace-pre-line text-pretty leading-relaxed text-muted-foreground">
                  {section.text}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 max-w-2xl text-left">
            {project.description.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-pretty leading-relaxed text-muted-foreground [&:not(:first-child)]:mt-4">
                {paragraph}
              </p>
            ))}
            {!project.image && !project.frameLayout && project.type !== 'ai-agent' && (
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                This case study is being written. Soon you&apos;ll find the full process, visuals, and outcomes here.
              </p>
            )}
          </div>
        )}

        {project.codeFile && (
          project.codeExcerpt ? (
            <div className="mt-8 w-full max-w-2xl text-left">
              <div className="flex items-center justify-between rounded-t-2xl border border-b-0 border-border bg-card/80 px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <a
                  href={project.codeFile}
                  download
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
                >
                  Download full SQL script
                </a>
              </div>
              <pre className="overflow-x-auto rounded-b-2xl border border-border bg-[#0d1117] p-4 text-xs leading-relaxed text-slate-200">
                <code>{project.codeExcerpt}</code>
              </pre>
            </div>
          ) : (
            <a
              href={project.codeFile}
              download
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:border-primary"
            >
              <ExternalLink className="h-4 w-4" />
              Download full SQL script
            </a>
          )
        )}

        {!project.image && project.type === 'ai-agent' && (
          <>
            <AiAgentServices />
            <AiAgentExamples />
          </>
        )}

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-[0_12px_30px_-8px_var(--gold)] transition-transform hover:scale-105 active:scale-95 sm:px-10 sm:py-5 sm:text-xl"
          >
            Visit live site
          </a>
        )}

        {project.frameLayout ? (
          <ProjectMarquee project={project} images={project.gallery} />
        ) : (
          project.gallery &&
          project.gallery.length > 0 && (
            <ProjectGalleryStack images={project.gallery} title={project.title} />
          )
        )}
      </div>

      {!project.image && !project.frameLayout && project.type !== 'ai-agent' && (
        <ProjectMarquee project={project} />
      )}
      <BackToTop />
    </main>
  )
}
