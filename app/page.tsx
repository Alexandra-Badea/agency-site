import { client } from '@/sanity/lib/client'
import { HERO_QUERY, SERVICES_QUERY, CASE_STUDIES_QUERY } from '@/sanity/lib/queries'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import CaseStudies from './components/CaseStudies'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default async function Home() {
  const hero = await client.fetch(HERO_QUERY)
  const services = await client.fetch(SERVICES_QUERY)
  const caseStudies = await client.fetch(CASE_STUDIES_QUERY)
  return (
    <main>
      <Navbar />
      <Hero
        headline={hero?.headline ?? ''}
        subheadline={hero?.subheadline ?? ''}
        ctaText={hero?.ctaText ?? ''}
      />

      <Services services={services} />

      <CaseStudies caseStudies={caseStudies} />

      <Contact />

      <Footer />
    </main>
  );
}
