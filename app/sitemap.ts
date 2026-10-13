import type { MetadataRoute } from 'next'
import { visibleProjects } from '@/lib/portfolio-data'
import { SITE_URL } from '@/lib/site-config'

// Update this date when you make meaningful content changes.
const LAST_UPDATED = new Date('2026-10-13')

export default function sitemap(): MetadataRoute.Sitemap {
  const projectUrls = visibleProjects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projectUrls,
  ]
}
