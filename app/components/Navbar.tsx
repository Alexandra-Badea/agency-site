'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 transition-all"
            style={{
                background: scrolled ? 'rgba(10,10,10,0.9)' : 'rgba(10,10,10,0.6)',
                backdropFilter: 'blur(16px)',
                borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
                boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.4)' : 'none',
            }}
        >
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-white font-semibold text-lg tracking-tight select-none">
                    NOVA<span style={{ color: 'var(--accent)' }}>.</span>
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-8">
                    {['Services', 'Work', 'Contact'].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="nav-link text-sm transition-colors"
                            style={{ color: 'var(--muted-light)' }}
                            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-light)')}
                        >
                            {item}
                        </Link>
                    ))}
                    <a
                        href="#contact"
                        className="btn-primary text-sm px-5 py-2 rounded-full text-white font-medium"
                        style={{ background: 'var(--accent)' }}
                    >
                        Get in touch
                    </a>
                </div>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden flex flex-col justify-center items-center gap-1 w-8 h-8"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span
                        className="block h-px w-5 transition-all"
                        style={{
                            background: 'var(--muted-light)',
                            transform: menuOpen ? 'rotate(45deg) translate(2px, 2px)' : 'none',
                        }}
                    />
                    <span
                        className="block h-px w-5 transition-all"
                        style={{
                            background: 'var(--muted-light)',
                            opacity: menuOpen ? 0 : 1,
                        }}
                    />
                    <span
                        className="block h-px w-5 transition-all"
                        style={{
                            background: 'var(--muted-light)',
                            transform: menuOpen ? 'rotate(-45deg) translate(2px, -2px)' : 'none',
                        }}
                    />
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div
                    className="md:hidden px-6 pb-6 flex flex-col gap-4"
                    style={{ borderTop: '1px solid var(--border)' }}
                >
                    {['Services', 'Work', 'Contact'].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm pt-4 transition-colors"
                            style={{ color: 'var(--muted-light)' }}
                            onClick={() => setMenuOpen(false)}
                        >
                            {item}
                        </Link>
                    ))}
                    <a
                        href="#contact"
                        className="text-sm px-4 py-3 rounded-full text-white text-center font-medium"
                        style={{ background: 'var(--accent)' }}
                        onClick={() => setMenuOpen(false)}
                    >
                        Get in touch
                    </a>
                </div>
            )}
        </nav>
    )
}
