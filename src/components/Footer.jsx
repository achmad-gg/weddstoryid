// src/components/Footer.jsx

const FOOTER_CONFIG = {
  studioName: 'weddstoryid',   // ← ganti nama studio
  tagline:    'Mengabadikan setiap momen berharga dalam hidup Anda.',
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'TikTok',    href: 'https://tiktok.com/' },
  ],
  year: new Date().getFullYear(),
}

export default function Footer() {
  return (
    <footer
      aria-label="Footer weddstoryid — fotografer pernikahan Surabaya & Sidoarjo"
      style={{
        background: 'var(--color-text)',
        color: 'rgba(255,250,245,0.6)',
        padding: '3rem 0 2rem',
      }}
    >
      <div className="container">

        {/* Atas */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '2rem',
          paddingBottom: '2rem',
          borderBottom: '1px solid rgba(255,250,245,0.1)',
          marginBottom: '1.5rem',
        }}>
          {/* Logo & tagline */}
          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.5rem',
              fontWeight: 400,
              color: '#FFFAF5',
              letterSpacing: '0.04em',
              marginBottom: '0.5rem',
            }}>
              {FOOTER_CONFIG.studioName}
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'rgba(255,250,245,0.5)',
              maxWidth: '280px',
              lineHeight: 1.7,
              margin: 0,
            }}>
              {FOOTER_CONFIG.tagline}
            </p>
          </div>

          {/* Nav & sosmed */}
          <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
            <nav aria-label="Navigasi footer">
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,250,245,0.35)', marginBottom: '0.875rem' }}>
                Navigasi
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[['#portfolio', 'Portofolio'], ['#packages', 'Paket'], ['#about', 'Tentang'], ['#contact', 'Kontak']].map(([href, label]) => (
                  <a key={href} href={href} aria-label={`Navigasi ke section ${label}`} style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.875rem',
                    color: 'rgba(255,250,245,0.55)', textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FFFAF5'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,250,245,0.55)'}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </nav>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,250,245,0.35)', marginBottom: '0.875rem' }}>
                Sosial Media
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {FOOTER_CONFIG.socials.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.875rem',
                    color: 'rgba(255,250,245,0.55)', textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FFFAF5'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,250,245,0.55)'}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bawah */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', margin: 0 }}>
            © {FOOTER_CONFIG.year} {FOOTER_CONFIG.studioName}. All rights reserved.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', margin: 0 }}>
            Made with ♥ in Surabaya
          </p>
        </div>
      </div>
    </footer>
  )
}