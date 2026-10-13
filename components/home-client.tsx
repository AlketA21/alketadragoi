'use client'

import { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Navbar } from '@/components/navbar'
import { HeroFolder } from '@/components/hero-folder'
import { AboutSection } from '@/components/about-section'
import { WorkSection } from '@/components/work-section'
import { PricingSection } from '@/components/pricing-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { WorkVisibilityProvider } from '@/components/work-visibility-context'

// Non-critical, client-only extras — loaded lazily so the first paint is fast.
const IntroScreen = dynamic(() => import('@/components/intro-screen').then((m) => m.IntroScreen), { ssr: false })
const MouseTrail = dynamic(() => import('@/components/mouse-trail').then((m) => m.MouseTrail), { ssr: false })
const CustomCursor = dynamic(() => import('@/components/custom-cursor').then((m) => m.CustomCursor), { ssr: false })
const ParticleBackground = dynamic(() => import('@/components/particle-background').then((m) => m.ParticleBackground), { ssr: false })
const BackToTop = dynamic(() => import('@/components/back-to-top').then((m) => m.BackToTop), { ssr: false })

export function HomeClient() {
  const [showIntro, setShowIntro] = useState(false)
  const [extras, setExtras] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    // `intro-pending` is set by the boot script in layout.tsx on the first
    // visit of the session (never for crawlers / speed-test bots).
    if (root.classList.contains('intro-pending')) {
      setShowIntro(true)
      try {
        sessionStorage.setItem('intro-seen', 'true')
      } catch {
        // ignore — worst case the intro shows again next visit
      }
    } else {
      setExtras(true)
    }
  }, [])

  const finishIntro = useCallback(() => {
    document.documentElement.classList.remove('intro-pending')
    setShowIntro(false)
    setExtras(true)
  }, [])

  return (
    <WorkVisibilityProvider>
      {showIntro && <IntroScreen onDone={finishIntro} />}

      {extras && (
        <>
          <MouseTrail />
          <CustomCursor />
          <ParticleBackground />
          <BackToTop />
        </>
      )}

      {/* Content is always in the HTML; it is only visually held back while
          the intro splash plays (see `.intro-gate` in globals.css). */}
      <main className="intro-gate relative min-h-screen">
        <Navbar />
        <HeroFolder />
        <AboutSection />
        <WorkSection />
        <PricingSection />
        <ContactSection />
        <Footer />
      </main>
    </WorkVisibilityProvider>
  )
}
