'use client'

import { useEffect, useRef, useState } from 'react'

interface HeroProps {
    headline: string
    subheadline: string
    ctaText: string
}

export default function Hero({ headline, subheadline, ctaText }: HeroProps) {
    const [scrollY, setScrollY] = useState(0)
    const rafRef = useRef<number | null>(null)

    useEffect(() => {
        const onScroll = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            rafRef.current = requestAnimationFrame(() => setScrollY(window.scrollY))
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', onScroll)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [])

    const s = scrollY

    return (
        <section
            className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16"
            style={{ overflow: 'clip' }}
        >

            {/* ── Layer -1: Grid — near static ── */}
            <div
                className="absolute inset-0 hero-grid pointer-events-none"
                style={{ transform: `translateY(${s * 0.1}px) scale(${1 + s * 0.0002})`, willChange: 'transform', opacity: Math.max(0, 1 - s * 0.002) }}
            />

            {/* ── Floating orbs — each moves in a unique direction ── */}

            {/* Orb A: top-left, drifts right + down slowly */}
            <div className="absolute pointer-events-none" style={{
                width: '500px', height: '500px',
                top: '10%', left: '-10%',
                transform: `translate(${s * 0.18}px, ${s * 0.12}px)`,
                background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 65%)',
                filter: 'blur(60px)',
                willChange: 'transform',
            }} />

            {/* Orb B: top-right, drifts left + down */}
            <div className="absolute pointer-events-none" style={{
                width: '600px', height: '600px',
                top: '-5%', right: '-15%',
                transform: `translate(${s * -0.22}px, ${s * 0.3}px)`,
                background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 65%)',
                filter: 'blur(80px)',
                willChange: 'transform',
            }} />

            {/* Orb C: bottom-center, rises up */}
            <div className="absolute pointer-events-none" style={{
                width: '400px', height: '400px',
                bottom: '0%', left: '30%',
                transform: `translate(${s * 0.08}px, ${s * -0.4}px)`,
                background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 65%)',
                filter: 'blur(70px)',
                willChange: 'transform',
            }} />

            {/* ── Floating geometric shapes ── */}

            {/* Shape 1: rotating square, top-left */}
            <div className="absolute pointer-events-none" style={{
                width: '80px', height: '80px',
                top: '18%', left: '8%',
                border: '1px solid rgba(99,102,241,0.25)',
                borderRadius: '12px',
                transform: `translateY(${s * -0.55}px) rotate(${s * 0.08}deg)`,
                willChange: 'transform',
            }} />

            {/* Shape 2: small circle, top-right */}
            <div className="absolute pointer-events-none" style={{
                width: '28px', height: '28px',
                top: '22%', right: '12%',
                borderRadius: '50%',
                border: '1px solid rgba(139,92,246,0.35)',
                transform: `translateY(${s * -0.7}px) translateX(${s * -0.1}px)`,
                willChange: 'transform',
            }} />

            {/* Shape 3: large ring, bottom-right */}
            <div className="absolute pointer-events-none" style={{
                width: '160px', height: '160px',
                bottom: '15%', right: '7%',
                borderRadius: '50%',
                border: '1px solid rgba(99,102,241,0.15)',
                transform: `translateY(${s * -0.35}px) rotate(${s * -0.05}deg)`,
                willChange: 'transform',
            }} />

            {/* Shape 4: tiny dot cluster, left */}
            <div className="absolute pointer-events-none flex flex-col gap-2" style={{
                top: '45%', left: '5%',
                transform: `translateY(${s * -0.45}px)`,
                willChange: 'transform',
            }}>
                {[0,1,2].map(i => (
                    <div key={i} style={{
                        width: '4px', height: '4px',
                        borderRadius: '50%',
                        background: `rgba(99,102,241,${0.4 - i * 0.1})`,
                        marginLeft: `${i * 6}px`,
                    }} />
                ))}
            </div>

            {/* Shape 5: horizontal line, right side */}
            <div className="absolute pointer-events-none" style={{
                width: '60px', height: '1px',
                top: '55%', right: '6%',
                background: 'linear-gradient(to right, transparent, rgba(99,102,241,0.5))',
                transform: `translateY(${s * -0.6}px) scaleX(${1 + s * 0.001})`,
                willChange: 'transform',
            }} />

            {/* ── Layer 2: Hero content — medium depth ── */}
            <div
                className="relative z-10 max-w-4xl mx-auto"
                style={{
                    transform: `translateY(${s * 0.4}px)`,
                    opacity: Math.max(0, 1 - s * 0.0025),
                    willChange: 'transform, opacity',
                }}
            >
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

                {/* Headline — words split at different depths */}
                <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6 animate-fade-up animate-delay-100">
                    {headline.split(' ').map((word, i) => (
                        <span
                            key={i}
                            className="inline-block gradient-text"
                            style={{
                                // Each word moves at a slightly different vertical speed
                                transform: `translateY(${s * (0.04 + i * 0.015) * -1}px)`,
                                marginRight: '0.3em',
                                willChange: 'transform',
                                display: 'inline-block',
                            }}
                        >
                            {word}
                        </span>
                    ))}
                </h1>

                {/* Subheadline */}
                <p
                    className="text-lg md:text-xl mb-10 max-w-2xl mx-auto animate-fade-up animate-delay-200"
                    style={{
                        color: 'var(--muted-light)',
                        lineHeight: '1.75',
                        transform: `translateY(${s * -0.06}px)`,
                        willChange: 'transform',
                    }}
                >
                    {subheadline}
                </p>

                {/* CTA buttons */}
                <div
                    className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animate-delay-300"
                    style={{
                        transform: `translateY(${s * -0.08}px)`,
                        willChange: 'transform',
                    }}
                >
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
            </div>

            {/* ── Layer 3: Scroll indicator — foreground, rushes away ── */}
            <div
                className="absolute left-1/2 z-20 pointer-events-none flex flex-col items-center gap-3"
                style={{
                    bottom: '2.5rem',
                    transform: `translateX(-50%) translateY(${s * 1.2}px)`,
                    opacity: Math.max(0, 1 - s / 140),
                    willChange: 'transform, opacity',
                }}
            >
                <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.2em' }}>
                    Scroll
                </span>
                <div style={{ width: '1px', height: '56px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{
                        position: 'absolute', top: 0, left: 0,
                        width: '1px', height: '100%',
                        background: 'linear-gradient(to bottom, transparent, var(--muted-light) 40%, var(--accent) 100%)',
                        animation: 'scroll-line 1.6s ease-in-out infinite',
                    }} />
                </div>
            </div>
        </section>
    )
}
