'use client'

import { useState } from 'react'

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitted(true)
    }

    return (
        <section
            id="contact"
            className="py-32 px-6 relative overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #0d0d0f 0%, var(--background) 100%)' }}
        >
            {/* Glow */}
            <div
                className="absolute pointer-events-none"
                style={{
                    width: '500px', height: '500px',
                    bottom: '-100px', right: '-100px',
                    background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                }}
            />

            <div className="relative z-10 max-w-2xl mx-auto">
                {/* Header — matches Services/CaseStudies spacing */}
                <div className="mb-16">
                    <p className="section-label text-sm font-medium tracking-widest uppercase mb-4" style={{ color: 'var(--accent)' }}>
                        Contact
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                        Let&apos;s work together
                    </h2>
                    <p className="text-lg" style={{ color: 'var(--muted)', lineHeight: '1.75' }}>
                        Tell us about your project and we&apos;ll get back to you within 24 hours.
                    </p>
                </div>

                {submitted ? (
                    <div
                        className="p-12 rounded-2xl text-center"
                        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
                    >
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6"
                            style={{ background: 'var(--accent-light)', border: '1px solid rgba(99,102,241,0.4)' }}
                        >
                            <span style={{ color: 'var(--accent)', fontSize: '1.25rem' }}>✓</span>
                        </div>
                        <p className="text-2xl font-semibold text-white mb-3 tracking-tight">Message sent!</p>
                        <p style={{ color: 'var(--muted)' }}>We&apos;ll be in touch shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* Name + email — stack on mobile, side by side on md+ */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}
                             className="md:grid-cols-2">
                            <input
                                type="text"
                                placeholder="Your name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="form-input w-full px-5 py-4 rounded-xl text-white outline-none"
                                style={{ background: 'var(--card)', border: '1px solid var(--border)', color: '#fff', fontSize: '0.9375rem' }}
                                onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-light)'; }}
                                onBlur={e =>  { e.currentTarget.style.borderColor = 'var(--border)';  e.currentTarget.style.boxShadow = 'none'; }}
                            />
                            <input
                                type="email"
                                placeholder="Your email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="form-input w-full px-5 py-4 rounded-xl text-white outline-none"
                                style={{ background: 'var(--card)', border: '1px solid var(--border)', color: '#fff', fontSize: '0.9375rem' }}
                                onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-light)'; }}
                                onBlur={e =>  { e.currentTarget.style.borderColor = 'var(--border)';  e.currentTarget.style.boxShadow = 'none'; }}
                            />
                        </div>

                        <textarea
                            placeholder="Tell us about your project"
                            required
                            rows={6}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="form-input w-full px-5 py-4 rounded-xl text-white outline-none resize-none"
                            style={{ background: 'var(--card)', border: '1px solid var(--border)', color: '#fff', fontSize: '0.9375rem', lineHeight: '1.6' }}
                            onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-light)'; }}
                            onBlur={e =>  { e.currentTarget.style.borderColor = 'var(--border)';  e.currentTarget.style.boxShadow = 'none'; }}
                        />

                        <button
                            type="submit"
                            className="btn-primary w-full py-4 rounded-full text-white font-medium flex items-center justify-center gap-2"
                            style={{ background: 'var(--accent)', fontSize: '0.9375rem' }}
                        >
                            Send message <span>→</span>
                        </button>

                        <p className="text-xs text-center" style={{ color: 'var(--muted)', marginTop: '0.25rem' }}>
                            No spam. We&apos;ll only contact you about your project.
                        </p>
                    </form>
                )}
            </div>
        </section>
    )
}
