'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })

  const wordmarkY = useTransform(scrollYProgress, [0, 1], ['30%', '0%'])
  const wordmarkYSpring = useSpring(wordmarkY, { stiffness: 55, damping: 22 })
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])

  const cols = [
    {
      label: 'Studio',
      links: [
        { label: 'About',    href: '#about'   },
        { label: 'Process',  href: '#process' },
        { label: 'Careers',  href: '#contact' },
        { label: 'Press',    href: '#contact' },
      ],
    },
    {
      label: 'Work',
      links: [
        { label: 'Projects',     href: '#work'     },
        { label: 'Case Studies', href: '#work'     },
        { label: 'Services',     href: '#services' },
        { label: 'Clients',      href: '#work'     },
      ],
    },
    {
      label: 'Contact',
      links: [
        { label: 'New Business',   href: '#contact' },
        { label: 'Press Inquiries',href: '#contact' },
        { label: 'Partnerships',   href: '#contact' },
        { label: 'hello@nova.studio', href: 'mailto:hello@nova.studio' },
      ],
    },
  ]

  return (
    <footer
      ref={ref}
      style={{ background: '#0a0a0a', borderTop: '1px solid rgba(240,237,232,0.08)', overflow: 'hidden', position: 'relative' }}
    >
      {/* Giant wordmark */}
      <div className="section-pad" style={{ padding: '80px 40px 0', maxWidth: 1400, margin: '0 auto', position: 'relative' }}>
        <motion.div style={{ y: wordmarkYSpring, opacity: wordmarkOpacity, overflow: 'hidden' }}>
          <div style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: 'clamp(60px,14vw,200px)',
            letterSpacing: '-0.04em', lineHeight: 0.85,
            color: 'rgba(240,237,232,0.06)',
            userSelect: 'none', whiteSpace: 'nowrap',
          }}>
            NOVA STUDIO
          </div>
        </motion.div>
      </div>

      <div className="section-pad" style={{ maxWidth: 1400, margin: '0 auto', padding: '48px 40px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 64 }} className="footer-grid">

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ fontFamily: "'Archivo Black', sans-serif", color: '#c8ff00', fontSize: 20, letterSpacing: '-0.02em', marginBottom: 20 }}>
              NOVA
            </div>
            <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, lineHeight: 1.7, color: '#888880', margin: '0 0 24px 0', maxWidth: 260 }}>
              A creative studio building brands that move culture. Based in Berlin, working worldwide.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {['Instagram', 'LinkedIn', 'Dribbble'].map(s => (
                <a
                  key={s} href="#"
                  style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888880', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#c8ff00')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#888880')}
                >
                  {s}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {cols.map((col, colIdx) => (
            <motion.div
              key={col.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (colIdx + 1) * 0.1 }}
            >
              <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888880', marginBottom: 20 }}>
                {col.label}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.links.map(link => (
                  <a
                    key={link.label} href={link.href}
                    style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 14, color: '#f0ede8', textDecoration: 'none', opacity: 0.7, transition: 'opacity 0.2s, color 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = '#c8ff00' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.color = '#f0ede8' }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderTop: '1px solid rgba(240,237,232,0.08)', paddingTop: 28,
          flexWrap: 'wrap', gap: 12,
        }}>
          <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 12, color: '#888880' }}>
            © {new Date().getFullYear()} Nova Studio. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {['Privacy Policy', 'Impressum', 'Cookie Settings'].map(item => (
              <a
                key={item} href="#"
                style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 12, color: '#888880', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f0ede8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#888880')}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
