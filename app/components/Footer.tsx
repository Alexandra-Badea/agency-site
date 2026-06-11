export default function Footer() {
  return (
    <footer
      className="px-6 pb-8"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <p className="text-lg font-semibold text-white tracking-tight mb-1">
              NOVA<span style={{ color: 'var(--accent)' }}>.</span>
            </p>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Strategy, design &amp; digital.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-6">
            {['Services', 'Work', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-link hover-white text-sm transition-colors"
                style={{ color: 'var(--muted)' }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {[
              { label: 'Twitter', href: '#', icon: '𝕏' },
              { label: 'LinkedIn', href: '#', icon: 'in' },
              { label: 'GitHub', href: '#', icon: '⌥' },
            ].map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover-white-border w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all"
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  color: 'var(--muted)',
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px" style={{ background: 'var(--border)' }} />

        {/* Bottom row */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            © {new Date().getFullYear()} Nova Agency. All rights reserved.
          </p>
          <div className="flex gap-4">
            {['Privacy', 'Terms'].map((item) => (
              <a
                key={item}
                href="#"
                className="hover-white text-xs transition-colors"
                style={{ color: 'var(--muted)' }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
