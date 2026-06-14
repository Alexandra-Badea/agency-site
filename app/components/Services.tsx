'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'

const servicesList = [
  {
    num: '01', title: 'Brand Strategy',
    desc: 'Positioning, narrative, and architecture. We define the space your brand occupies in culture and commerce before a single pixel is drawn.',
    tags: ['Positioning', 'Naming', 'Brand Architecture', 'Tone of Voice'],
  },
  {
    num: '02', title: 'Visual Identity',
    desc: 'Logotype, mark, color, typography, and the full system of visual language — designed to be unmistakably you across every surface.',
    tags: ['Logo Design', 'Type Systems', 'Color Systems', 'Style Guides'],
  },
  {
    num: '03', title: 'Digital Craft',
    desc: 'Websites, apps, and interactive experiences that perform as beautifully as they look. Built for speed, accessibility, and delight.',
    tags: ['Web Design', 'UI/UX', 'Motion Design', 'Prototyping'],
  },
  {
    num: '04', title: 'Campaigns & Editorial',
    desc: 'Art direction, photography, and content that earns attention. From product launches to seasonal campaigns and everything in between.',
    tags: ['Art Direction', 'Photography', 'Copywriting', 'Social'],
  },
  {
    num: '05', title: 'Environments',
    desc: 'Retail, pop-up, and experiential design that translates your brand into three dimensions and stays in memory long after the visit.',
    tags: ['Retail Design', 'Exhibition', 'Wayfinding', 'Pop-up'],
  },
]

interface SanityService {
  _id: string
  title: string
  description: string
  icon: string
  tags?: string[]
}

interface ServicesProps {
  services?: SanityService[] | null
}

export default function Services({ services }: ServicesProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgX = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
  const bgXSpring = useSpring(bgX, { stiffness: 60, damping: 25 })

  // Use Sanity data if available, otherwise fall back to hardcoded list
  const items = (services && services.length > 0)
    ? services.map((s, i) => ({
        num: String(i + 1).padStart(2, '0'),
        title: s.title,
        desc: s.description,
        tags: s.tags ?? [],
      }))
    : servicesList

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{ background: '#0a0a0a', borderTop: '1px solid rgba(240,237,232,0.08)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Parallax ghost text */}
      <motion.div
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', overflow: 'hidden',
          pointerEvents: 'none', x: bgXSpring, zIndex: 0,
        }}
      >
        <span style={{
          fontFamily: "'Archivo Black', sans-serif",
          fontSize: '22vw', letterSpacing: '-0.04em',
          color: 'rgba(200,255,0,0.025)', userSelect: 'none', whiteSpace: 'nowrap',
        }}>
          SERVICES
        </span>
      </motion.div>

      <div
        className="section-pad"
        style={{ maxWidth: 1400, margin: '0 auto', padding: '120px 40px', position: 'relative', zIndex: 1 }}
      >
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, marginBottom: 80, alignItems: 'end' }} className="services-header">
          <div>
            <div style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase',
              color: '#c8ff00', marginBottom: 16,
            }}>
              What We Do
            </div>
            <h2 style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: '#f0ede8', letterSpacing: '-0.03em', lineHeight: 0.95, margin: 0,
            }}>
              END-TO-END<br />CREATIVE<br />SERVICES.
            </h2>
          </div>
          <p style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: 16, lineHeight: 1.75, color: '#888880', margin: 0, maxWidth: 420,
          }}>
            We work best as a long-term creative partner — embedded in your team, aligned with your goals, and relentlessly focused on the work that actually moves the needle.
          </p>
        </div>

        {/* Accordion */}
        <div>
          {items.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              style={{ borderTop: '1px solid rgba(240,237,232,0.1)', overflow: 'hidden' }}
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
            >
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '32px 0', gap: 24,
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 32 }}>
                  <span style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: 12, letterSpacing: '0.1em', color: '#888880', minWidth: 28,
                  }}>
                    {service.num}
                  </span>
                  <motion.span
                    style={{
                      fontFamily: "'Archivo Black', sans-serif",
                      fontSize: 'clamp(22px, 3vw, 40px)',
                      color: activeIndex === i ? '#c8ff00' : '#f0ede8',
                      letterSpacing: '-0.02em', lineHeight: 1,
                      transition: 'color 0.2s', display: 'inline-block',
                    }}
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {service.title}
                  </motion.span>
                </div>
                <span style={{
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: 20,
                  color: activeIndex === i ? '#c8ff00' : '#888880',
                  transition: 'transform 0.3s, color 0.2s',
                  transform: activeIndex === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  display: 'inline-block', minWidth: 24, textAlign: 'center',
                }}>
                  +
                </span>
              </div>

              <div style={{
                maxHeight: activeIndex === i ? 300 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.45s ease',
              }}>
                <div style={{ paddingBottom: 36, paddingLeft: 60 }}>
                  <p style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: 15, lineHeight: 1.75, color: '#888880',
                    margin: '0 0 24px 0', maxWidth: 600,
                  }}>
                    {service.desc}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {service.tags.map(tag => (
                      <span key={tag} style={{
                        fontFamily: "'Instrument Sans', sans-serif",
                        fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
                        color: '#c8ff00', border: '1px solid rgba(200,255,0,0.3)', padding: '5px 12px',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          <div style={{ borderTop: '1px solid rgba(240,237,232,0.1)' }} />
        </div>
      </div>
    </section>
  )
}
