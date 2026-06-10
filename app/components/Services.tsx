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
        <div className="mb-16">
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: 'var(--accent)' }}>
            What we do
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="p-8 rounded-2xl transition-colors"
              style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-6 text-white font-bold text-sm"
                style={{ background: 'var(--accent)' }}
              >
                {service.title.charAt(0)}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}