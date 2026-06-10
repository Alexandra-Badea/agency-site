import Link from 'next/link'

interface HeroProps {
    headline: string
    subheadline: string
    ctaText: string
}

export default function Hero({ headline, subheadline, ctaText }: HeroProps) {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16">
            <div className="max-w-4xl mx-auto">
                <p className="text-sm font-medium mb-6 tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
                    Creative Agency
                </p>
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
                    {headline}
                </h1>
                <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
                    {subheadline}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="#work"
                        className="px-8 py-4 rounded-full text-white font-medium transition-colors"
                        style={{ background: 'var(--accent)' }}
                    >
                        {ctaText}
                    </a>
                    <a
                        href="#contact"
                        className="px-8 py-4 rounded-full font-medium text-white transition-colors"
                        style={{ border: '1px solid var(--border)' }}
                    >
                        Get in touch
                    </a>
                </div>
            </div>
        </section>
    )
}