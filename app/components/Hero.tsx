interface HeroProps {
    headline: string
    subheadline: string
    ctaText: string
}

export default function Hero({ headline, subheadline, ctaText }: HeroProps) {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 overflow-hidden">

            {/* Grid background */}
            <div className="absolute inset-0 hero-grid pointer-events-none" />

            {/* Radial glow blob */}
            <div
                className="absolute pointer-events-none"
                style={{
                    width: '600px',
                    height: '600px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -60%)',
                    background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                }}
            />

            <div className="relative z-10 max-w-4xl mx-auto">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 mb-8 animate-fade-up">
                    <span
                        className="text-xs font-medium tracking-widest uppercase px-4 py-2 rounded-full"
                        style={{
                            background: 'var(--accent-light)',
                            border: '1px solid rgba(99,102,241,0.3)',
                            color: '#a5b4fc',
                        }}
                    >
                        ✦ Creative Agency
                    </span>
                </div>

                {/* Headline */}
                <h1
                    className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6 animate-fade-up animate-delay-100 gradient-text"
                >
                    {headline}
                </h1>

                {/* Subheadline */}
                <p
                    className="text-lg md:text-xl mb-10 max-w-2xl mx-auto animate-fade-up animate-delay-200"
                    style={{ color: 'var(--muted-light)', lineHeight: '1.75' }}
                >
                    {subheadline}
                </p>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animate-delay-300">
                    <a
                        href="#work"
                        className="btn-primary px-8 py-4 rounded-full text-white font-medium"
                        style={{ background: 'var(--accent)' }}
                    >
                        {ctaText} →
                    </a>
                    <a
                        href="#contact"
                        className="btn-secondary px-8 py-4 rounded-full font-medium text-white"
                        style={{ border: '1px solid var(--border)' }}
                    >
                        Get in touch
                    </a>
                </div>

                {/* Scroll hint */}
                <div
                    className="absolute animate-fade-up animate-delay-500"
                    style={{ bottom: '-120px', left: '50%', transform: 'translateX(-50%)' }}
                >
                    <div className="flex flex-col items-center gap-2" style={{ color: 'var(--muted)' }}>
                        <span className="text-xs tracking-widest uppercase">Scroll</span>
                        <div
                            className="w-px h-8"
                            style={{ background: 'linear-gradient(to bottom, var(--muted), transparent)' }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
