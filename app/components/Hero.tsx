'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'

interface HeroProps {
  subheadline: string
  ctaText: string
}

function SplitReveal({ text, delay = 0, style = {} }: { text: string; delay?: number; style?: React.CSSProperties }) {
  const words = text.split(' ')
  return (
    <span style={{ display: 'inline', ...style }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.85, delay: delay + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  )
}

export default function Hero({ subheadline, ctaText }: HeroProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const bgY       = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const titleY    = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const subtitleY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const opacity   = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const bgYSpring    = useSpring(bgY,    { stiffness: 80, damping: 30 })
  const titleYSpring = useSpring(titleY, { stiffness: 80, damping: 30 })

  return (
    <section
      ref={ref}
      id="hero"
      style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}
    >
      {/* Decorative grid lines + circles — parallax layer 0 */}
      <motion.div
        style={{ position: 'absolute', inset: 0, y: bgYSpring, pointerEvents: 'none', zIndex: 0 }}
      >
        {/* Acid green circles */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute', top: '12%', right: '8%',
            width: 320, height: 320,
            border: '1px solid rgba(200,255,0,0.12)', borderRadius: '50%',
          }}
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute', top: '12%', right: '8%',
            width: 200, height: 200,
            border: '1px solid rgba(200,255,0,0.08)', borderRadius: '50%',
            transform: 'translate(60px, 60px)',
          }}
        />

        {/* Vertical label */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          style={{
            position: 'absolute', top: '28%', right: '12%',
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(200,255,0,0.4)',
            writingMode: 'vertical-rl',
          }}
        >
          Berlin · 52°N
        </motion.div>
      </motion.div>

      {/* Main content — parallax layer 1 */}
      <motion.div
        style={{
          position: 'relative', zIndex: 1,
          y: titleYSpring, opacity,
          maxWidth: 1400, margin: '0 auto',
          padding: '0 40px', paddingTop: 160,
          display: 'grid', gridTemplateRows: '1fr auto',
          minHeight: '100vh',
        }}
        className="section-pad"
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', gap: 40 }}>
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase',
                color: '#c8ff00', marginBottom: 36,
                display: 'flex', alignItems: 'center', gap: 12,
              }}
            >
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: 32 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{ display: 'inline-block', height: 1, background: '#c8ff00', overflow: 'hidden' }}
              />
              Creative Studio — Est. 2026
            </motion.div>

            {/* Headline */}
            <h1
              style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: 'clamp(64px, 9vw, 140px)',
                lineHeight: 0.92, letterSpacing: '-0.03em',
                color: '#f0ede8', margin: 0, maxWidth: 900,
              }}
            >
              <div style={{ overflow: 'hidden', display: 'block' }}>
                <SplitReveal text="WE BUILD" delay={0.2} />
              </div>
              <div style={{ overflow: 'hidden', display: 'block' }}>
                <SplitReveal text="BRANDS" delay={0.35} style={{ color: '#c8ff00' }} />
              </div>
              <div style={{ overflow: 'hidden', display: 'block' }}>
                <SplitReveal text="THAT MOVE" delay={0.5} />
              </div>
              <div style={{ overflow: 'hidden', display: 'block' }}>
                <SplitReveal text="CULTURE." delay={0.65} />
              </div>
            </h1>
          </div>

          {/* Right side — subheadline + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
              gap: 24, paddingBottom: 8, minWidth: 240,
            }}
            className="hidden md:flex"
          >
            <p
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: 15, lineHeight: 1.7, color: '#888880',
                maxWidth: 220, textAlign: 'right', margin: 0,
              }}
            >
              {subheadline || 'Strategy, identity, and digital craft for brands that refuse to be average.'}
            </p>
            <button
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase',
                color: '#f0ede8', background: 'none',
                border: '1px solid rgba(240,237,232,0.25)',
                padding: '12px 28px',
                transition: 'border-color 0.3s, color 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#c8ff00'; e.currentTarget.style.color = '#c8ff00' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(240,237,232,0.25)'; e.currentTarget.style.color = '#f0ede8' }}
            >
              {ctaText || 'View Work'} ↓
            </button>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div style={{ y: subtitleY }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
              borderTop: '1px solid rgba(240,237,232,0.1)',
              paddingTop: 28, paddingBottom: 48, marginTop: 60,
              gap: 16, flexWrap: 'wrap',
            }}
          >
            {[
              { num: '120+', label: 'Projects Delivered' },
              { num: '14',   label: 'Countries Reached' },
              { num: '8×',   label: 'Award Winning' },
              { num: '2018', label: 'Founded in Berlin' },
            ].map((stat, i) => (
              <motion.div
                key={stat.num}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + i * 0.08 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 6 }}
              >
                <span style={{
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: 36, lineHeight: 1, color: '#f0ede8', letterSpacing: '-0.02em',
                }}>
                  {stat.num}
                </span>
                <span style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888880',
                }}>
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{
          position: 'absolute', bottom: 32, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 2,
        }}
      >
        <span style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888880',
        }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, #c8ff00, transparent)' }}
        />
      </motion.div>
    </section>
  )
}
