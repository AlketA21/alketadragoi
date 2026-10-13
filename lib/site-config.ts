// Real deployed domain. Every SEO file (metadata, sitemap, robots, JSON-LD)
// reads from here, so changing this one line updates the whole site.
// Can also be overridden with the NEXT_PUBLIC_SITE_URL env var on Netlify.
// IMPORTANT: no trailing slash.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://alketadragoi.netlify.app'
).replace(/\/+$/, '')
