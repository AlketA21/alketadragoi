import Image from 'next/image'
import Link from 'next/link'

/**
 * The site logo/brand mark, styled as a persistent home button.
 * Used in the navbar (as "#hero" anchor) on the home page, and as a plain
 * link to "/" on project detail pages — same look, same "go home" function
 * everywhere in the site.
 */
export function SiteLogo({ href = '/' }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2">
      <Image
        src="/logo-ad.png"
        alt="Alketa Dragoi logo"
        width={40}
        height={28}
        className="h-8 w-auto object-contain sm:h-9"
        priority
      />
      <span className="hidden font-heading text-xl font-bold tracking-tight text-gradient sm:inline">
        Alketa Dragoi
      </span>
    </Link>
  )
}
