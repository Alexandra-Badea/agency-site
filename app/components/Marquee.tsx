'use client'

import { useRef, useEffect } from 'react'
import { useScroll, useVelocity, useTransform, useSpring, useAnimationFrame } from 'motion/react'

const clients = [
  'Adidas', 'Spotify', 'Notion', 'Figma', 'Linear', 'Stripe',
  'Vercel', 'Loewe', 'Aesop', 'Nubank', 'Rivian', 'Canva',
]

function VelocityMarquee({ direction = 1, speed = 60 }: { direction?: 1 | -1; speed?: number }) {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 60, stiffness: 200 })
  const velocityFactor = useTransform(smoothVelocity, [-3000, 0, 3000], [3, 1, 3])

  // Two refs: the outer wrapper (clips overflow) and the inner track
  const wrapperRef  = useRef<HTMLDivElement>(null)
  const trackRef    = useRef<HTMLDivElement>(null)
  const copyRef     = useRef<HTMLDivElement>(null)  // measures one copy's width
  const xPx         = useRef(0)
  const copyWidth   = useRef(0)

  // Measure one copy's pixel width after mount and on resize
  useEffect(() => {
    const measure = () => {
      if (copyRef.current) copyWidth.current = copyRef.current.offsetWidth
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useAnimationFrame((_, delta) => {
    if (!copyWidth.current) return

    const px = direction * speed * velocityFactor.get() * (delta / 1000)
    xPx.current -= px

    // Wrap by exactly one copy width — seam is invisible because copy B looks like copy A
    if (xPx.current <= -copyWidth.current) xPx.current += copyWidth.current
    if (xPx.current > 0)                  xPx.current -= copyWidth.current

    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${xPx.current}px)`
    }
  })

  const itemJSX = clients.map((client, i) => (
    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 56, flexShrink: 0 }}>
      <span style={{
        fontFamily: "'Archivo Black', sans-serif",
        fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase',
        color: '#888880', whiteSpace: 'nowrap',
      }}>
        {client}
      </span>
      <span style={{ color: '#c8ff00', fontSize: 7 }}>◆</span>
    </div>
  ))

  return (
    // Outer clips overflow
    <div ref={wrapperRef} style={{ overflow: 'hidden', width: '100%' }}>
      {/* Track: two identical copies side by side */}
      <div
        ref={trackRef}
        style={{ display: 'flex', willChange: 'transform' }}
      >
        {/* Copy A — measured for exact pixel width */}
        <div ref={copyRef} style={{ display: 'flex', gap: 56, flexShrink: 0, paddingRight: 56 }}>
          {itemJSX}
        </div>
        {/* Copy B — visually identical, fills the gap when A scrolls out */}
        <div style={{ display: 'flex', gap: 56, flexShrink: 0, paddingRight: 56 }}>
          {itemJSX}
        </div>
      </div>
    </div>
  )
}

export function Marquee() {
  return (
    <div style={{
      borderTop: '1px solid rgba(240,237,232,0.08)',
      borderBottom: '1px solid rgba(240,237,232,0.08)',
      overflow: 'hidden', background: '#0a0a0a', position: 'relative',
    }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, #0a0a0a, transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, #0a0a0a, transparent)', zIndex: 2, pointerEvents: 'none' }} />

      <div style={{ padding: '18px 0' }}>
        <VelocityMarquee direction={-1} speed={55} />
      </div>
      <div style={{ padding: '18px 0', borderTop: '1px solid rgba(240,237,232,0.05)' }}>
        <VelocityMarquee direction={1} speed={45} />
      </div>
    </div>
  )
}
