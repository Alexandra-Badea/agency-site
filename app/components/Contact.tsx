'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', budget: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })

  const headingY = useTransform(scrollYProgress, [0, 0.5], ['8%', '0%'])
  const headingYSpring = useSpring(headingY, { stiffness: 70, damping: 28 })
  const headingOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1])

  const ghostY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])
  const ghostYSpring = useSpring(ghostY, { stiffness: 55, damping: 22 })

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'rgba(255,255,255,0.04)', border: 'none',
    borderBottom: '1px solid rgba(240,237,232,0.3)',
    padding: '14px 0',
    fontFamily: "'Instrument Sans', sans-serif",
    fontSize: 15, color: '#f0ede8', outline: 'none',
    transition: 'border-color 0.2s', boxSizing: 'border-box',
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{ background: '#141414', borderTop: '1px solid rgba(240,237,232,0.08)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Ghost heading parallax */}
      <motion.div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
        overflow: 'hidden', pointerEvents: 'none',
        y: ghostYSpring, zIndex: 0, paddingRight: '5%',
      }}>
        <span style={{
          fontFamily: "'Archivo Black', sans-serif",
          fontSize: 'clamp(80px,18vw,260px)',
          letterSpacing: '-0.04em',
          color: 'rgba(200,255,0,0.03)',
          userSelect: 'none', whiteSpace: 'nowrap', lineHeight: 1,
        }}>
          CONTACT
        </span>
      </motion.div>

      <div className="section-pad" style={{ maxWidth: 1400, margin: '0 auto', padding: '120px 40px', position: 'relative', zIndex: 1 }}>
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

          {/* Left */}
          <div>
            <motion.div style={{ y: headingYSpring, opacity: headingOpacity }}>
              <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c8ff00', marginBottom: 16 }}>
                Get In Touch
              </div>
              <h2 style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: 'clamp(44px,6vw,88px)',
                color: '#f0ede8', letterSpacing: '-0.03em', lineHeight: 0.9,
                margin: '0 0 48px 0',
              }}>
                LET&apos;S<br />BUILD<br />SOMETHING<br />BOLD.
              </h2>
              <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, lineHeight: 1.75, color: '#888880', margin: '0 0 48px 0', maxWidth: 400 }}>
                Tell us about your project and we&apos;ll get back to you within 48 hours.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {[
                  { label: 'New Business', value: 'hello@nova.studio' },
                  { label: 'Press & Media', value: 'press@nova.studio' },
                  { label: 'Location', value: 'Mitte, Berlin DE 10117' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888880', marginBottom: 6 }}>
                      {item.label}
                    </div>
                    <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 14, color: '#f0ede8' }}>
                      {item.value}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {submitted ? (
              <div style={{ border: '1px solid rgba(200,255,0,0.3)', padding: '60px 40px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 48, color: '#c8ff00', marginBottom: 20 }}>✓</div>
                <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 24, color: '#f0ede8', letterSpacing: '-0.02em', marginBottom: 16 }}>
                  Message Received
                </div>
                <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 14, color: '#888880', margin: 0 }}>
                  We&apos;ll review your brief and follow up within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }} className="form-row">
                  {[
                    { label: 'Full Name *', key: 'name', type: 'text', placeholder: 'Your name', required: true },
                    { label: 'Email *', key: 'email', type: 'email', placeholder: 'you@company.com', required: true },
                  ].map(field => (
                    <div key={field.key}>
                      <label style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888880', display: 'block', marginBottom: 8 }}>
                        {field.label}
                      </label>
                      <input
                        required={field.required}
                        type={field.type}
                        value={form[field.key as keyof typeof form]}
                        onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                        placeholder={field.placeholder}
                        style={inputStyle}
                        onFocus={e => (e.target.style.borderBottomColor = '#c8ff00')}
                        onBlur={e  => (e.target.style.borderBottomColor = 'rgba(240,237,232,0.3)')}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888880', display: 'block', marginBottom: 8 }}>
                    Company / Brand
                  </label>
                  <input
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                    placeholder="Where do you work?"
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderBottomColor = '#c8ff00')}
                    onBlur={e  => (e.target.style.borderBottomColor = 'rgba(240,237,232,0.3)')}
                  />
                </div>

                <div>
                  <label style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888880', display: 'block', marginBottom: 16 }}>
                    Budget Range
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {['< €25k', '€25–75k', '€75–150k', '€150k+'].map(range => (
                      <button
                        type="button"
                        key={range}
                        onClick={() => setForm({ ...form, budget: range })}
                        style={{
                          fontFamily: "'Instrument Sans', sans-serif",
                          fontSize: 12, letterSpacing: '0.08em',
                          color: form.budget === range ? '#0a0a0a' : '#888880',
                          background: form.budget === range ? '#c8ff00' : 'transparent',
                          border: `1px solid ${form.budget === range ? '#c8ff00' : 'rgba(240,237,232,0.15)'}`,
                          padding: '8px 16px', transition: 'all 0.2s',
                        }}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888880', display: 'block', marginBottom: 8 }}>
                    Tell Us About Your Project *
                  </label>
                  <textarea
                    required
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="What are you trying to achieve? What's the timeline?"
                    rows={4}
                    style={{
                      ...inputStyle,
                      resize: 'none', borderBottom: 'none',
                      border: '1px solid rgba(240,237,232,0.3)',
                      padding: '14px 16px',
                    }}
                    onFocus={e => (e.target.style.borderColor = '#c8ff00')}
                    onBlur={e  => (e.target.style.borderColor = 'rgba(240,237,232,0.3)')}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: '#0a0a0a', background: '#c8ff00',
                    border: 'none', padding: '18px 40px',
                    alignSelf: 'flex-start',
                  }}
                >
                  Send Brief →
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
