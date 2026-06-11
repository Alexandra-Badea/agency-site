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

const gradients = [
  'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)',
  'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
  'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #2d1b69 100%)',
]

export default function CaseStudies({ caseStudies }: CaseStudiesProps) {
  return (
    <section id="work" className="py-32 px-6" style={{ background: 'var(--background)' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header — matches Services spacing exactly */}
        <div className="mb-16">
          <p className="section-label text-sm font-medium tracking-widest uppercase mb-4" style={{ color: 'var(--accent)' }}>
            Our work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Case Studies
          </h2>
          <p className="text-lg max-w-2xl" style={{ color: 'var(--muted)', lineHeight: '1.75' }}>
            A selection of projects we&apos;re proud of — from early-stage startups to global brands.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((caseStudy, i) => (
            <div
              key={caseStudy._id}
              className="case-card rounded-2xl overflow-hidden cursor-pointer flex flex-col"
              style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
            >
              {/* Image placeholder */}
              <div
                className="w-full h-56 flex items-center justify-center relative overflow-hidden shrink-0"
                style={{ background: gradients[i % gradients.length] }}
              >
                <span
                  className="text-6xl font-bold text-white select-none"
                  style={{ opacity: 0.15, letterSpacing: '-0.05em' }}
                >
                  {caseStudy.client.charAt(0)}
                </span>
                {/* Grid overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />
                {/* Arrow badge */}
                <div
                  className="absolute bottom-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                  style={{
                    background: 'rgba(99,102,241,0.3)',
                    border: '1px solid rgba(99,102,241,0.5)',
                    color: '#a5b4fc',
                  }}
                >
                  ↗
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col grow">
                {/* Tags */}
                {caseStudy.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {caseStudy.tags.map((tag) => (
                      <span
                        key={tag}
                        className="tag-pill text-xs px-3 py-1 rounded-full"
                        style={{ background: 'var(--border)', color: 'var(--muted)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <h3 className="text-xl font-semibold text-white mb-2 tracking-tight">
                  {caseStudy.title}
                </h3>

                <p className="text-sm font-medium mb-4" style={{ color: 'var(--accent)' }}>
                  {caseStudy.client}
                </p>

                {caseStudy.summary && (
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {caseStudy.summary}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
