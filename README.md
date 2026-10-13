# Portfolio — Alketa Dragoi

Next.js 16 · Tailwind CSS 4 · Framer Motion · Three.js

## Nisja lokale
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # kontrollo para çdo push
```

## Ku ndryshohen tekstet
- Pjesa më e madhe: `lib/portfolio-data.ts` (profili + projektet; `hidden: true` e fsheh një projekt)
- Çmimet: `components/pricing-section.tsx`
- SEO (titull/përshkrim): `app/layout.tsx`
- URL e faqes: `lib/site-config.ts` (ose variabla `NEXT_PUBLIC_SITE_URL` në Netlify)

## Deploy në Netlify
1. Push në GitHub (`git add . && git commit -m "..." && git push`)
2. Netlify → Add new site → Import from GitHub → zgjidh repo-n
3. `netlify.toml` e ka konfigurimin gati (build: `npm run build`, plugin Next.js)
4. Pas deploy: Google Search Console → shto faqen → dërgo `/sitemap.xml`
