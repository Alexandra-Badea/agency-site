'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const links = ['Work', 'Services', 'About', 'Process', 'Contact']

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          background:    scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom:  scrolled ? '1px solid rgba(240,237,232,0.08)' : 'none',
          transition: 'background 0.3s, border-color 0.3s',
        }}
      >
        <div style={{
          maxWidth: 1400, margin: '0 auto', padding: '0 40px',
          height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              color: '#c8ff00', fontSize: 20, letterSpacing: '-0.02em',
              background: 'none', border: 'none', padding: 0,
            }}
          >
            NOVA
          </button>

          {/* Desktop */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 40 }} className="hidden md:flex">
            {links.map(l => (
              <button
                key={l}
                onClick={() => scrollTo(l)}
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: '#f0ede8', opacity: 0.7,
                  background: 'none', border: 'none', padding: 0,
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
              >
                {l}
              </button>
            ))}
            <button
              onClick={() => scrollTo('Contact')}
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase',
                color: '#0a0a0a', background: '#c8ff00',
                border: 'none', padding: '10px 22px',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Start a Project
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden"
            style={{ background: 'none', border: 'none', color: '#f0ede8', padding: 0 }}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <div style={{ width: 24, height: 2, background: 'currentColor', marginBottom: 6, transition: 'transform 0.2s', transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none' }} />
            <div style={{ width: 24, height: 2, background: 'currentColor', transition: 'opacity 0.2s', opacity: menuOpen ? 0 : 1 }} />
            <div style={{ width: 24, height: 2, background: 'currentColor', marginTop: 6, transition: 'transform 0.2s', transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', top: 72, left: 0, right: 0, zIndex: 49,
              background: '#0a0a0a',
              borderBottom: '1px solid rgba(240,237,232,0.1)',
              padding: '32px 40px 40px',
            }}
          >
            {links.map(l => (
              <div key={l} style={{ borderTop: '1px solid rgba(240,237,232,0.08)', padding: '20px 0' }}>
                <button
                  onClick={() => scrollTo(l)}
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: 28, color: '#f0ede8',
                    background: 'none', border: 'none', padding: 0,
                  }}
                >
                  {l}
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
