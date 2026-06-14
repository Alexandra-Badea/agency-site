'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'

interface ProcessStep {
  _id?: string
  num: string
  title: string
  duration?: string
  description?: string
}

interface ProcessProps {
  steps?: ProcessStep[] | null
}

const defaultSteps: ProcessStep[] = [
  { num: '01', title: 'Discovery', duration: '1–2 Weeks', description: 'We immerse ourselves in your world — category, competition, culture, and customer. No guesswork.' },
  { num: '02', title: 'Strategy',  duration: '2 Weeks',   description: 'Positioning, narrative, and creative direction. The north star that every decision traces back to.' },
  { num: '03', title: 'Design',    duration: '4–8 Weeks', description: 'Concept, craft, and iteration. We move fast, show our work early, and refine with purpose.' },
  { num: '04', title: 'Delivery',  duration: '1–2 Weeks', description: 'Assets, guidelines, and a handoff that empowers your team to carry the work forward.' },
]

const testimonials = [
  { quote: "They didn't just redesign our brand — they rebuilt our confidence in it. The work opened doors we didn't know existed.", author: 'Sarah Lin',      company: 'CEO, Canva APAC' },
  { quote: "The most collaborative, rigorous team I've worked with in 15 years of brand work. They ask the right questions before they ever open Figma.", author: 'Marcus Osei',    company: 'CMO, Nubank' },
  { quote: "In six months they became an extension of our internal team. The quality and speed were remarkable.", author: 'Elena Vasquez', company: 'Brand Director, Rivian' },
]

function HorizontalDriftBand() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rawX = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])
  const x = useSpring(rawX, { stiffness: 60, damping: 25 })
  const tags = ['Strategy', 'Identity', 'Digital', 'Motion', 'Editorial', 'Space', 'Print', 'Experience']

  return (
    <div ref={ref} style={{ overflow: 'hidden', marginBottom: 80 }}>
      <motion.div style={{ display: 'flex', gap: 40, x, willChange: 'transform', width: '120%' }}>
        {tags.map((tag, i) => (
          <span key={i} style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: 'clamp(36px, 5vw, 72px)',
            letterSpacing: '-0.03em', lineHeight: 1,
            color: i % 2 === 0 ? 'rgba(240,237,232,0.06)' : 'rgba(200,255,0,0.08)',
            whiteSpace: 'nowrap',
          }}>
            {tag}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function Process({ steps: sanitySteps }: ProcessProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '6%'])
  const bgYSpring = useSpring(bgY, { stiffness: 80, damping: 30 })

  const steps = sanitySteps?.length ? sanitySteps : defaultSteps

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{ borderTop: '1px solid rgba(240,237,232,0.08)', background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}
    >
      {/* Ghost text */}
      <motion.div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        y: bgYSpring, zIndex: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      }}>
        <span style={{
          fontFamily: "'Archivo Black', sans-serif",
          fontSize: '22vw', letterSpacing: '-0.04em',
          color: 'rgba(200,255,0,0.025)', userSelect: 'none', whiteSpace: 'nowrap',
        }}>
          PROCESS
        </span>
      </motion.div>

      <div className="section-pad" style={{ maxWidth: 1400, margin: '0 auto', padding: '120px 40px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: 60 }}>
          <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c8ff00', marginBottom: 16 }}>
            How We Work
          </div>
          <h2 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 'clamp(36px,5vw,64px)', color: '#f0ede8', letterSpacing: '-0.03em', lineHeight: 0.95, margin: 0 }}>
            {['A PROCESS', 'BUILT FOR', 'CLARITY.'].map((line, i) => (
              <div key={i} style={{ overflow: 'hidden' }}>
                <motion.div
                  initial={{ y: '100%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.85, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'block' }}
                >
                  {line}
                </motion.div>
              </div>
            ))}
          </h2>
        </div>

        <HorizontalDriftBand />

        {/* Steps grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
          gap: 0,
          borderTop: '1px solid rgba(240,237,232,0.1)',
          borderLeft: '1px solid rgba(240,237,232,0.1)',
        }} className="process-grid">
          {steps.map((step, i) => (
            <motion.div
              key={step._id ?? step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: '48px 36px',
                borderRight: '1px solid rgba(240,237,232,0.1)',
                borderBottom: '1px solid rgba(240,237,232,0.1)',
                position: 'relative', overflow: 'hidden',
              }}
            >
              <div style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: 80, color: 'rgba(200,255,0,0.05)',
                position: 'absolute', top: -10, right: 20,
                lineHeight: 1, letterSpacing: '-0.04em',
                pointerEvents: 'none', userSelect: 'none',
              }}>
                {step.num}
              </div>
              <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#c8ff00', marginBottom: 20 }}>
                {step.num}{step.duration ? ` · ${step.duration}` : ''}
              </div>
              <h3 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 28, color: '#f0ede8', letterSpacing: '-0.02em', lineHeight: 1, margin: '0 0 20px 0' }}>
                {step.title}
              </h3>
              {step.description && (
                <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 14, lineHeight: 1.7, color: '#888880', margin: 0 }}>
                  {step.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            marginTop: 80,
            display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 40,
            borderTop: '1px solid rgba(240,237,232,0.1)', paddingTop: 60,
          }}
          className="testimonials-grid"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, lineHeight: 1.75, color: '#f0ede8', marginBottom: 24, fontStyle: 'italic' }}>
                &ldquo;{t.quote}&rdquo;
              </div>
              <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 14, color: '#c8ff00', letterSpacing: '-0.01em' }}>{t.author}</div>
              <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 12, color: '#888880', marginTop: 4 }}>{t.company}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
