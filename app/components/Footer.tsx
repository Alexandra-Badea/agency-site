export default function Footer() {
  return (
    <footer
      className="py-8 px-6"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm font-semibold text-white tracking-tight">
          NOVA<span style={{ color: 'var(--accent)' }}>.</span>
        </p>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          © {new Date().getFullYear()} Nova. All rights reserved.
        </p>
      </div>
    </footer>
  )
}