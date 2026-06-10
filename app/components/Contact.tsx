'use client'

import { useState } from 'react'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
    }

    return (
        <section id="contact" className="py-32 px-6">
            <div className="max-w-2xl mx-auto">
                <div className="mb-16">
                    <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: 'var(--accent)' }}>
                        Contact
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        Let&apos;s work together
                    </h2>
                    <p className="mt-4 text-lg" style={{ color: 'var(--muted)' }}>
                        Tell us about your project and we&apos;ll get back to you within 24 hours.
                    </p>
                </div>

                {submitted ? (
                    <div
                        className="p-8 rounded-2xl text-center"
                        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
                    >
                        <p className="text-2xl font-semibold text-white mb-2">Message sent!</p>
                        <p style={{ color: 'var(--muted)' }}>We&apos;ll be in touch shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Your name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-5 py-4 rounded-xl text-white placeholder:text-zinc-600 outline-none focus:ring-1"
                            style={{
                                background: 'var(--card)',
                                border: '1px solid var(--border)',
                            }}
                        />
                        <input
                            type="email"
                            placeholder="Your email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-5 py-4 rounded-xl text-white placeholder:text-zinc-600 outline-none focus:ring-1"
                            style={{
                                background: 'var(--card)',
                                border: '1px solid var(--border)',
                            }}
                        />
                        <textarea
                            placeholder="Tell us about your project"
                            required
                            rows={6}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full px-5 py-4 rounded-xl text-white placeholder:text-zinc-600 outline-none focus:ring-1 resize-none"
                            style={{
                                background: 'var(--card)',
                                border: '1px solid var(--border)',
                            }}
                        />
                        <button
                            type="submit"
                            className="w-full py-4 rounded-full text-white font-medium transition-colors"
                            style={{ background: 'var(--accent)' }}
                        >
                            Send message
                        </button>
                    </form>
                )}
            </div>
        </section>
    )
}