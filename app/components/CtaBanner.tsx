'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'

export function CtaBanner() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const scale      = useTransform(scrollYProgress, [0, 0.4, 1], [0.88, 1, 1.04])
  const scaleSpring = useSpring(scale, { stiffness: 80, damping: 30 })
  const bgY        = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const bgYSpring   = useSpring(bgY, { stiffness: 60, damping: 25 })
  const textY      = useTransform(scrollYProgress, [0, 1], ['15%', '-15%'])
  const textYSpring = useSpring(textY, { stiffness: 60, damping: 25 })

  return (
    <div
      ref={ref}
      className="section-pad"
      style={{ padding: '80px 40px', maxWidth: 1400, margin: '0 auto' }}
    >
      <motion.div
        style={{
          scale: scaleSpring,
          position: 'relative', overflow: 'hidden',
          background: '#c8ff00',
          minHeight: 420,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {/* Parallax bg pattern */}
        <motion.div
          style={{ position: 'absolute', inset: '-20% 0', y: bgYSpring, zIndex: 0 }}
        />

        <motion.div
          style={{
            position: 'relative', zIndex: 1,
            textAlign: 'center',
            y: textYSpring,
            padding: '60px 40px',
          }}
        >
          <div style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'rgba(10,10,10,0.5)', marginBottom: 24,
          }}>
            Let&apos;s Create Something
          </div>
          <h2 style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: 'clamp(48px,7vw,100px)',
            letterSpacing: '-0.03em', lineHeight: 0.9,
            color: '#0a0a0a', margin: '0 0 40px 0',
          }}>
            YOUR BRAND.<br />AMPLIFIED.
          </h2>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: '#c8ff00', background: '#0a0a0a',
              border: 'none', padding: '18px 48px',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Start a Project →
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}
