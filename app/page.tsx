import { client } from '@/sanity/lib/client'
import { HERO_QUERY, SERVICES_QUERY, CASE_STUDIES_QUERY } from '@/sanity/lib/queries'

export default async function Home() {
  const hero = await client.fetch(HERO_QUERY)
  const services = await client.fetch(SERVICES_QUERY)
  const caseStudies = await client.fetch(CASE_STUDIES_QUERY)
  return (
    <main>
      <section>
        <h1>{hero?.headline}</h1>
        <p>{hero?.subheadline}</p>
        <button>{hero?.ctaText}</button>
      </section>

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
