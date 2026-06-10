interface Service {
  _id: string
  title: string
  description: string
  icon: string
}

interface ServicesProps {
  services: Service[]
}

export default function Services({ services }: ServicesProps) {
  return (
    <section id="services" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="section-label text-sm font-medium tracking-widest uppercase mb-4" style={{ color: 'var(--accent)' }}>
            What we do
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Services
          </h2>
          <p className="mt-4 text-lg max-w-2xl" style={{ color: 'var(--muted)', lineHeight: '1.75' }}>
            We combine strategy, design, and technology to build products people love.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service._id}
              className={`service-card p-8 rounded-2xl animate-fade-up animate-delay-${Math.min(i * 100 + 100, 500)}`}
              style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-white font-bold text-lg shrink-0"
                style={{
                  background: 'linear-gradient(135deg, var(--accent) 0%, #818cf8 100%)',
                  boxShadow: '0 4px 16px var(--accent-glow)',
                }}
              >
                {service.icon || service.title.charAt(0)}
              </div>

              <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                {service.description}
              </p>

              {/* Bottom link */}
              <div className="mt-6 flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--accent)' }}>
                <span>Learn more</span>
                <span style={{ transition: 'transform 0.2s' }}>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
