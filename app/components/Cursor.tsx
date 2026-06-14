'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export function Cursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const ringX = useSpring(mouseX, { stiffness: 120, damping: 22, mass: 0.6 })
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 22, mass: 0.6 })
  const dotX  = useSpring(mouseX, { stiffness: 800, damping: 40 })
  const dotY  = useSpring(mouseY, { stiffness: 800, damping: 40 })

  const ringScaleVal = useMotionValue(1)
  const ringScale    = useSpring(ringScaleVal, { stiffness: 300, damping: 30 })
  const dotOpacity   = useMotionValue(1)

  useEffect(() => {
    const onMove = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY) }
    const onEnter = (e: Event) => {
      const t = e.target as HTMLElement
      if (t.tagName === 'A' || t.tagName === 'BUTTON' || t.closest('a') || t.closest('button')) {
        ringScaleVal.set(2.2); dotOpacity.set(0)
      }
    }
    const onLeave = () => { ringScaleVal.set(1); dotOpacity.set(1) }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [mouseX, mouseY, ringScaleVal, dotOpacity])

  return (
    <>
      <motion.div
        data-cursor
        style={{
          position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999,
          x: ringX, y: ringY, translateX: '-50%', translateY: '-50%',
          width: 36, height: 36,
          border: '1px solid rgba(200,255,0,0.6)', borderRadius: '50%',
          scale: ringScale, mixBlendMode: 'difference',
        }}
      />
      <motion.div
        data-cursor
        style={{
          position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999,
          x: dotX, y: dotY, translateX: '-50%', translateY: '-50%',
          width: 5, height: 5, background: '#c8ff00', borderRadius: '50%',
          opacity: dotOpacity,
        }}
      />
    </>
  )
}
