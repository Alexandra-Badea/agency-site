'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav
            style={{ borderBottom: '1px solid var(--border)' }}
            className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md"
        >
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="text-white font-semibold text-lg tracking-tight">
                    NOVA<span style={{ color: 'var(--accent)' }}>.</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="#services" className="text-sm text-zinc-400 hover:text-white transition-colors">
                        Services
                    </Link>
                    <Link href="#work" className="text-sm text-zinc-400 hover:text-white transition-colors">
                        Work
                    </Link>
                    <Link href="#contact" className="text-sm text-zinc-400 hover:text-white transition-colors">
                        Contact
                    </Link>
                    <a
                        href="#contact"
                        className="text-sm px-4 py-2 rounded-full text-white transition-colors"
                        style={{ background: 'var(--accent)' }}
                    >
                        Get in touch
                    </a>
                </div>

                <button
                    className="md:hidden text-zinc-400 hover:text-white"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? '✕' : '☰'}
                </button>
            </div>

            {menuOpen && (
                <div
                    className="md:hidden px-6 pb-6 flex flex-col gap-4"
                    style={{ borderTop: '1px solid var(--border)' }}
                >
                    <Link href="#services" className="text-sm text-zinc-400 hover:text-white transition-colors pt-4">
                        Services
                    </Link>
                    <Link href="#work" className="text-sm text-zinc-400 hover:text-white transition-colors">
                        Work
                    </Link>
                    <Link href="#contact" className="text-sm text-zinc-400 hover:text-white transition-colors">
                        Contact
                    </Link>
                    <a
                        href="#contact"
                        className="text-sm px-4 py-2 rounded-full text-white text-center transition-colors"
                        style={{ background: 'var(--accent)' }}
                    >
                        Get in touch
                    </a>
                </div>
            )}
        </nav>
    )
}