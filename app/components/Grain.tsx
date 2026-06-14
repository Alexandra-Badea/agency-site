'use client'

import { useEffect, useRef } from 'react'

export function Grain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef  = useRef<number>(0)
  const lastTime  = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = window.innerWidth
    let h = window.innerHeight
    canvas.width  = w
    canvas.height = h

    const resize = () => {
      w = window.innerWidth; h = window.innerHeight
      canvas.width = w; canvas.height = h
    }
    window.addEventListener('resize', resize)

    const draw = (ts: number) => {
      if (ts - lastTime.current < 80) { frameRef.current = requestAnimationFrame(draw); return }
      lastTime.current = ts
      const img  = ctx.createImageData(w, h)
      const data = img.data
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255
        data[i] = v; data[i+1] = v; data[i+2] = v
        data[i+3] = Math.random() * 18
      }
      ctx.putImageData(img, 0, 0)
      frameRef.current = requestAnimationFrame(draw)
    }
    frameRef.current = requestAnimationFrame(draw)

    return () => { cancelAnimationFrame(frameRef.current); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 9998,
        mixBlendMode: 'overlay', opacity: 0.35,
      }}
    />
  )
}
