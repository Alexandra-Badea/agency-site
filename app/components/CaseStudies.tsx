'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import Image from 'next/image'

interface SanityImage {
  asset?: { url?: string }
}

interface CaseStudy {
  _id: string
  title: string
  client: string
  year?: string
  tags?: string[]
  summary?: string
  accentColor?: string
  size?: 'large' | 'portrait' | 'medium' | 'wide'
  order?: number
  coverImage?: SanityImage
}

interface CaseStudiesProps {
  caseStudies?: CaseStudy[] | null
}

// Fallback data — used when Sanity has no entries
const fallback: CaseStudy[] = [
  { _id: '1', client: 'Rivian',  title: 'Brand Identity System',    tags: ['Brand Identity', 'Campaign'], summary: 'Complete visual identity system and launch campaign.',  year: '2024', accentColor: '#c8ff00', size: 'large',   order: 1 },
  { _id: '2', client: 'Loewe',   title: 'Seasonal Editorial',        tags: ['Editorial', 'Art Direction'],  summary: 'Art direction for seasonal lookbook.',                  year: '2024', accentColor: '#ff6b35', size: 'portrait', order: 2 },
  { _id: '3', client: 'Nubank',  title: 'Digital Product Redesign',  tags: ['Digital', 'UX'],               summary: 'Redesign of the core banking experience.',              year: '2023', accentColor: '#a855f7', size: 'medium',  order: 3 },
  { _id: '4', client: 'Aesop',   title: 'Packaging System',          tags: ['Packaging', 'Identity'],       summary: 'Packaging system for three new product lines.',         year: '2023', accentColor: '#e8d5a3', size: 'medium',  order: 4 },
  { _id: '5', client: 'Linear',  title: 'Motion Design System',      tags: ['Motion', 'Digital'],           summary: 'Motion design system and product launch video.',        year: '2022', accentColor: '#5e6ad2', size: 'wide',    order: 5 },
]

// Gradient backgrounds keyed by accent color
const gradients: Record<string, string> = {
  '#c8ff00': 'linear-gradient(135deg,#1e1b4b 0%,#2d3a1e 100%)',
  '#ff6b35': 'linear-gradient(135deg,#1a0e0a 0%,#3a1e14 100%)',
  '#a855f7': 'linear-gradient(135deg,#1a0a2e 0%,#2d1b4b 100%)',
  '#e8d5a3': 'linear-gradient(135deg,#1a1810 0%,#2e2a1a 100%)',
  '#5e6ad2': 'linear-gradient(135deg,#0f0f2e 0%,#1b1b4b 100%)',
}

function getGradient(accent: string) {
  return gradients[accent] ?? `linear-gradient(135deg,#1a1a2e 0%,#16213e 100%)`
}

function getAspectRatio(size?: string) {
  if (size === 'portrait') return '3/4'
  if (size === 'wide')     return '16/9'
  return '4/3'
}

function ParallaxCard({ project, index }: { project: CaseStudy; index: number }) {
  const [hovered, setHovered] = useState(false)
  const accent    = project.accentColor || '#c8ff00'
  const imageUrl  = project.coverImage?.asset?.url

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', overflow: 'hidden', background: '#141414' }}
    >
      {/* Image / gradient area */}
      <div style={{
        overflow: 'hidden', position: 'relative',
        aspectRatio: getAspectRatio(project.size),
        background: getGradient(accent),
      }}>
        {/* Real image if available */}
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            style={{ objectFit: 'cover', filter: 'brightness(0.75)' }}
          />
        )}

        {/* Subtle grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)',
          backgroundSize: '40px 40px', zIndex: 1,
        }} />

        {/* Client initial when no image */}
        {!imageUrl && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
            <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 120, color: '#f0ede8', opacity: 0.06, letterSpacing: '-0.05em', userSelect: 'none' }}>
              {project.client.charAt(0)}
            </span>
          </div>
        )}

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top,rgba(10,10,10,0.9) 0%,rgba(10,10,10,0.2) 50%,transparent 100%)',
          zIndex: 2,
        }} />

        {/* Hover color wash */}
        <motion.div
          animate={{ opacity: hovered ? 0.15 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ position: 'absolute', inset: 0, background: accent, zIndex: 2 }}
        />

        {/* Card label */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px', zIndex: 3 }}>
          <motion.div animate={{ y: hovered ? -4 : 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
            <div style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: accent, marginBottom: 8,
            }}>
              {project.tags?.[0] ?? 'Work'}{project.year ? ` · ${project.year}` : ''}
            </div>
            <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 22, color: '#f0ede8', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              {project.client}
            </div>
          </motion.div>
        </div>

        {/* Arrow — slides in on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -12 }}
          transition={{ duration: 0.35 }}
          style={{
            position: 'absolute', top: 20, right: 20, zIndex: 3,
            width: 36, height: 36,
            border: '1px solid rgba(240,237,232,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Archivo Black', sans-serif", fontSize: 16, color: '#f0ede8',
          }}
        >
          ↗
        </motion.div>
      </div>

      {/* Summary — reveals on hover */}
      <motion.div
        animate={{ height: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0 }}
        initial={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: 'hidden' }}
      >
        {project.summary && (
          <div style={{ padding: '16px 28px 20px' }}>
            <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 14, lineHeight: 1.6, color: '#888880', margin: 0 }}>
              {project.summary}
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

// Grid slot definitions — order matches display position
const gridSlots = [
  { col: '1 / 8',   cls: 'work-col-large'   },
  { col: '8 / 13',  cls: 'work-col-portrait' },
  { col: '1 / 5',   cls: 'work-col-small'   },
  { col: '5 / 9',   cls: 'work-col-small'   },
  { col: '9 / 13',  cls: 'work-col-wide'    },
]

export default function CaseStudies({ caseStudies }: CaseStudiesProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  const headingX       = useTransform(scrollYProgress, [0, 1], ['-3%', '0%'])
  const headingXSpring = useSpring(headingX, { stiffness: 80, damping: 30 })

  // Use Sanity data if available, otherwise fall back
  const projects = (caseStudies && caseStudies.length > 0 ? caseStudies : fallback)
    .slice(0, 5) // grid only has 5 slots

  return (
    <section
      ref={ref}
      id="work"
      style={{ maxWidth: 1400, margin: '0 auto', padding: '120px 40px' }}
      className="section-pad"
    >
      {/* Header */}
      <motion.div
        style={{ x: headingXSpring }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          marginBottom: 64, borderBottom: '1px solid rgba(240,237,232,0.1)',
          paddingBottom: 32, flexWrap: 'wrap', gap: 24,
        }}>
          <div>
            <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c8ff00', marginBottom: 16 }}>
              Selected Work
            </div>
            <h2 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 'clamp(36px, 5vw, 64px)', color: '#f0ede8', letterSpacing: '-0.03em', lineHeight: 0.95, margin: 0 }}>
              PROJECTS THAT<br />DEFINE BRANDS.
            </h2>
          </div>
          <button
            style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888880', background: 'none', border: 'none', padding: 0, transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#c8ff00')}
            onMouseLeave={e => (e.currentTarget.style.color = '#888880')}
          >
            All Projects →
          </button>
        </div>
      </motion.div>

      {/* Asymmetric 12-col grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: 16 }}>
        {projects.map((project, i) => {
          const slot = gridSlots[i]
          return (
            <div key={project._id} className={slot.cls} style={{ gridColumn: slot.col }}>
              <ParallaxCard project={project} index={i} />
            </div>
          )
        })}
      </div>
    </section>
  )
}
