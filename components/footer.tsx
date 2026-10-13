import Link from 'next/link'
import { profile, visibleProjects } from '@/lib/portfolio-data'

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-10">
      {/* Real <a> links to every project: helps visitors AND search engines
          discover the case-study pages. */}
      <nav aria-label="Projects" className="mx-auto mb-6 flex max-w-4xl flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
        {visibleProjects.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            {p.title}
          </Link>
        ))}
      </nav>
      <p className="text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
      </p>
    </footer>
  )
}
