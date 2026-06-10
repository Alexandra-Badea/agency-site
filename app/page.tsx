import { client } from '@/sanity/lib/client'
import { HERO_QUERY, SERVICES_QUERY, CASE_STUDIES_QUERY } from '@/sanity/lib/queries'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

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

      <section>
        {services.map((service) => (
          <div key={service._id}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </section>

      <section>
        {caseStudies.map((caseStudy) => (
          <div key={caseStudy._id}>
            <h3>{caseStudy.title}</h3>
            <p>{caseStudy.client}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
