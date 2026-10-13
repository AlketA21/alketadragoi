'use client'

import { Moon, Sun, Mail } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '@/components/theme-provider'
import { profile } from '@/lib/portfolio-data'
import { useWorkVisibility } from '@/components/work-visibility-context'
import { SiteLogo } from '@/components/site-logo'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
]

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { openWork } = useWorkVisibility()

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav className="mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-full border border-border/60 bg-card/50 px-4 py-2.5 shadow-lg shadow-black/5 backdrop-blur-2xl sm:mx-auto sm:px-6 [width:calc(100%-1.5rem)] sm:[width:auto]">
        <SiteLogo href="#hero" />

        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 sm:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={
                    link.href === '#work'
                      ? (e) => {
                          e.preventDefault()
                          openWork()
                        }
                      : undefined
                  }
                  className="group relative rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                  <span className="absolute inset-x-3.5 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-[oklch(0.6_0.22_295)] via-[oklch(0.65_0.18_245)] to-[oklch(0.78_0.15_195)] transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          {/* Single, prominent contact CTA — replaces the old "Contact" nav link */}
          <a
            href={`mailto:${profile.email}`}
            aria-label={`Send an email to ${profile.email}`}
            className="ml-1 inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-transform duration-300 hover:scale-105 active:scale-95 sm:px-4"
          >
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Email Me</span>
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            }
            className="ml-1 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === 'dark' ? (
                <motion.span
                  key="sun"
                  initial={{ rotate: -90, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sun className="h-[18px] w-[18px]" />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ rotate: 90, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: -90, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Moon className="h-[18px] w-[18px]" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>
    </header>
  )
}
