import { HomeClient } from '@/components/home-client'
import { profile } from '@/lib/portfolio-data'

// Server component: the markup below is in the initial HTML, so Google and AI
// crawlers can read it without running JavaScript.
export default function Home() {
  return (
    <>
      <h1 className="sr-only">
        {profile.name} — {profile.role}, {profile.location}
      </h1>
      <p className="sr-only">{profile.servicesLine}</p>
      <HomeClient />
    </>
  )
}
