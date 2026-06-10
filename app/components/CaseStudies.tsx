interface CaseStudy {
  _id: string
  title: string
  client: string
  tags: string[]
  summary: string
}

interface CaseStudiesProps {
  caseStudies: CaseStudy[]
}

export default function CaseStudies({ caseStudies }: CaseStudiesProps) {
  return (
    <section id="work" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: 'var(--accent)' }}>
            Our work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Case Studies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((caseStudy) => (
            <div
              key={caseStudy._id}
              className="p-8 rounded-2xl group cursor-pointer transition-all"
              style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
            >
              <div
                className="w-full h-48 rounded-xl mb-6 flex items-center justify-center"
                style={{ background: 'var(--border)' }}
              >
                <span className="text-4xl font-bold text-white opacity-20">
                  {caseStudy.client.charAt(0)}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {caseStudy.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ background: 'var(--border)', color: 'var(--muted)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">
                {caseStudy.title}
              </h3>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                {caseStudy.client}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}