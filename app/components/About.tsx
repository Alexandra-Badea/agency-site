'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'

interface TeamMember { name: string; role: string; since: string }
interface Stat        { label: string; value: string }

interface AboutProps {
  data?: {
    heading?: string[]
    paragraphs?: string[]
    availabilityHeading?: string
    availabilitySubtext?: string
    teamMembers?: TeamMember[]
    stats?: Stat[]
  } | null
}

const defaultHeading    = ["WE'RE A STUDIO", 'OBSESSED WITH', 'REMARKABLE WORK.']
const defaultParagraphs = [
  'Founded with a single conviction: that design is a business tool, not a decoration. We built a studio around that belief — rigorous in strategy, uncompromising in craft, and fiercely curious about culture.',
  'Today we work across identity, digital, editorial, and space. Our clients are founders, CMOs, and creative directors who understand that the best work comes from genuine partnership — not a brief and a deadline.',
]
const defaultTeam: TeamMember[] = [
  { name: 'Mira Voss',    role: 'Founder & Creative Director', since: '2018' },
  { name: 'Jonas Ekberg', role: 'Head of Strategy',            since: '2019' },
  { name: 'Priya Nair',   role: 'Lead Designer',               since: '2020' },
  { name: 'Félix Moreau', role: 'Digital Director',            since: '2021' },
]
const defaultStats: Stat[] = [
  { label: 'Studio Size',     value: '14 People' },
  { label: 'Avg. Engagement', value: '4 Months'  },
  { label: 'HQ',              value: 'Berlin, DE' },
  { label: 'Remote-ready',    value: 'Worldwide'  },
]

function ClipReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ y: '100%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export function About({ data }: AboutProps) {
  const imageRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start end', 'end start'] })
  const rawY   = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const imageY = useSpring(rawY, { stiffness: 80, damping: 30 })

  const heading             = data?.heading?.length             ? data.heading             : defaultHeading
  const paragraphs          = data?.paragraphs?.length          ? data.paragraphs          : defaultParagraphs
  const team                = data?.teamMembers?.length         ? data.teamMembers         : defaultTeam
  const stats               = data?.stats?.length               ? data.stats               : defaultStats
  const availabilityHeading = data?.availabilityHeading         || 'Open for 2026 Projects'
  const availabilitySubtext = data?.availabilitySubtext         || 'We accept 6–8 client engagements per year. Reach out early.'

  return (
    <section id="about" style={{ background: '#141414', borderTop: '1px solid rgba(240,237,232,0.08)' }}>
      <div className="section-pad" style={{ maxWidth: 1400, margin: '0 auto', padding: '120px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }} className="about-grid">

          {/* Left */}
          <div>
            <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c8ff00', marginBottom: 16 }}>
              About the Studio
            </div>

            <h2 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 'clamp(36px,4.5vw,58px)', color: '#f0ede8', letterSpacing: '-0.03em', lineHeight: 0.95, margin: '0 0 40px 0' }}>
              {heading.map((line, i) => (
                <ClipReveal key={i} delay={i * 0.1}>
                  <span style={{ display: 'block' }}>{line}</span>
                </ClipReveal>
              ))}
            </h2>

            {paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
                style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, lineHeight: 1.8, color: '#888880', margin: i < paragraphs.length - 1 ? '0 0 20px 0' : 0 }}
              >
                {para}
              </motion.p>
            ))}

            {/* Team */}
            <div style={{ marginTop: 60 }}>
              <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#888880', marginBottom: 24 }}>
                The Team
              </div>
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', borderTop: '1px solid rgba(240,237,232,0.08)', gap: 16 }}
                >
                  <div>
                    <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 16, color: '#f0ede8', letterSpacing: '-0.01em' }}>{member.name}</div>
                    <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 12, color: '#888880', marginTop: 3 }}>{member.role}</div>
                  </div>
                  <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 11, color: '#c8ff00', letterSpacing: '0.1em' }}>
                    Since &apos;{member.since}
                  </div>
                </motion.div>
              ))}
              <div style={{ borderTop: '1px solid rgba(240,237,232,0.08)' }} />
            </div>
          </div>

          {/* Right — image placeholder + stats */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div ref={imageRef} style={{ position: 'relative', overflow: 'hidden' }}>
              <motion.div
                style={{
                  width: '100%', paddingBottom: '125%',
                  background: 'linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)',
                  y: imageY, scale: 1.15, willChange: 'transform', position: 'relative',
                }}
              >
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 160, color: '#f0ede8', opacity: 0.04, letterSpacing: '-0.05em', userSelect: 'none' }}>N</span>
                </div>
              </motion.div>

              <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, padding: '20px 24px', background: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(8px)', border: '1px solid rgba(240,237,232,0.1)' }}>
                <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 18, color: '#c8ff00', marginBottom: 4 }}>{availabilityHeading}</div>
                <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, color: '#888880' }}>{availabilitySubtext}</div>
              </div>
            </div>

            <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {stats.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  style={{ background: '#1c1c1c', padding: '20px 24px', border: '1px solid rgba(240,237,232,0.06)' }}
                >
                  <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888880', marginBottom: 8 }}>{item.label}</div>
                  <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 20, color: '#f0ede8', letterSpacing: '-0.01em' }}>{item.value}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
