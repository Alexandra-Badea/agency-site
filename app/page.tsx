import { client } from '@/sanity/lib/client'
import { HERO_QUERY, SERVICES_QUERY, CASE_STUDIES_QUERY, ABOUT_QUERY, PROCESS_QUERY } from '@/sanity/lib/queries'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { Marquee } from './components/Marquee'
import CaseStudies from './components/CaseStudies'
import Services from './components/Services'
import { About } from './components/About'
import { Process } from './components/Process'
import { CtaBanner } from './components/CtaBanner'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { Cursor } from './components/Cursor'
import { Grain } from './components/Grain'

export default async function Home() {
  const [hero, services, caseStudies, about, processSteps] = await Promise.all([
    client.fetch(HERO_QUERY),
    client.fetch(SERVICES_QUERY),
    client.fetch(CASE_STUDIES_QUERY),
    client.fetch(ABOUT_QUERY),
    client.fetch(PROCESS_QUERY),
  ])

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', overflowX: 'hidden' }}>
      <Cursor />
      <Grain />
      <Navbar />
      <Hero
        subheadline={hero?.subheadline ?? ''}
        ctaText={hero?.ctaText ?? ''}
      />
      <Marquee />
      <CaseStudies caseStudies={caseStudies ?? []} />
      <Services services={services ?? []} />
      <About data={about ?? null} />
      <Process steps={processSteps ?? []} />
      <CtaBanner />
      <Contact />
      <Footer />
    </div>
  )
}
