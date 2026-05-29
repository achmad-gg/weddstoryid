// src/components/Packages.jsx
import { useEffect, useRef, useState } from 'react'

// ─── DATA PAKET — sesuaikan dengan layanan & harga kamu ──────────────────────
const PACKAGES = [
  {
    id:       'silver',
    name:     'Silver',
    price:    'Rp 3.500.000',
    desc:     'Cocok untuk pernikahan intimate & sederhana',
    highlight: false,
    features: [
      { text: '8 jam dokumentasi',         included: true  },
      { text: '1 fotografer profesional',  included: true  },
      { text: '150 foto hasil edit',        included: true  },
      { text: 'Galeri digital online',      included: true  },
      { text: 'Videografer',               included: false },
      { text: 'Album fisik',               included: false },
      { text: 'Video highlight',           included: false },
      { text: 'Drone aerial',              included: false },
    ],
  },
  {
    id:       'gold',
    name:     'Gold',
    price:    'Rp 7.500.000',
    desc:     'Paket terlengkap & paling diminati',
    highlight: true, // ← kartu ini akan di-highlight
    badge:    'Terpopuler',
    features: [
      { text: '12 jam dokumentasi',        included: true },
      { text: '2 fotografer profesional',  included: true },
      { text: '300 foto hasil edit',        included: true },
      { text: 'Galeri digital online',      included: true },
      { text: '1 videografer',             included: true },
      { text: 'Album fisik premium',       included: true },
      { text: 'Video highlight 5 menit',   included: true },
      { text: 'Drone aerial',             included: false },
    ],
  },
  {
    id:       'platinum',
    name:     'Platinum',
    price:    'Rp 14.000.000',
    desc:     'Dokumentasi paling komprehensif & sinematik',
    highlight: false,
    features: [
      { text: 'Full day dokumentasi',      included: true },
      { text: '3 fotografer profesional',  included: true },
      { text: 'Foto tak terbatas edit',     included: true },
      { text: 'Galeri digital online',      included: true },
      { text: '2 videografer',             included: true },
      { text: 'Album fisik premium (x2)',  included: true },
      { text: 'Video cinematic 10 menit',  included: true },
      { text: 'Drone aerial shot',         included: true },
    ],
  },
]

// Catatan tambahan di bawah kartu paket
const NOTES = [
  'Harga belum termasuk biaya transportasi luar kota',
  'Free konsultasi sebelum hari H',
  'Bisa request paket custom sesuai kebutuhan',
]
// ─────────────────────────────────────────────────────────────────────────────

function CheckIcon({ included }) {
  return included ? (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-2)" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ) : (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-light)" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

export default function Packages() {
  const sectionRef = useRef(null)
  const [visible,  setVisible]  = useState(false)
  const [hovered,  setHovered]  = useState(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="packages"
      ref={sectionRef}
      className="section"
      aria-label="Paket harga jasa foto & videografi pernikahan weddstoryid Surabaya & Sidoarjo"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="container">

        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3.5rem',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.7s ease',
        }}>
          <span className="section-label">Harga & Layanan</span>
          <h2>Pilih Paket <em style={{ fontStyle: 'italic' }}>Impian Anda</em></h2>
          <p style={{ maxWidth: '480px', margin: '0.75rem auto 0', fontSize: '0.9375rem' }}>
            Kualitas profesional dengan harga yang bersahabat. Semua paket sudah termasuk konsultasi gratis.
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
          alignItems: 'start',
        }}>
          {PACKAGES.map((pkg, i) => (
            <div
              key={pkg.id}
              onMouseEnter={() => setHovered(pkg.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative',
                background: pkg.highlight ? 'var(--color-accent)' : 'var(--color-surface)',
                border: pkg.highlight
                  ? 'none'
                  : `1.5px solid ${hovered === pkg.id ? 'var(--color-accent)' : 'var(--color-border)'}`,
                borderRadius: '4px',
                padding: pkg.highlight ? '2.5rem 2rem' : '2rem',
                // Kartu highlight sedikit lebih tinggi
                marginTop: pkg.highlight ? '-1rem' : '0',
                marginBottom: pkg.highlight ? '-1rem' : '0',
                transition: 'all 0.3s ease',
                transform: hovered === pkg.id && !pkg.highlight ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: pkg.highlight
                  ? '0 20px 60px rgba(181,134,106,0.35)'
                  : hovered === pkg.id
                    ? '0 12px 40px rgba(61,43,31,0.1)'
                    : 'none',
                opacity: visible ? 1 : 0,
                animationDelay: `${i * 0.15}s`,
                transitionProperty: 'opacity, transform, box-shadow, border-color',
                transitionDuration: `0.7s, 0.3s, 0.3s, 0.3s`,
                transitionDelay: `${i * 0.12}s, 0s, 0s, 0s`,
              }}
            >
              {/* Badge terpopuler */}
              {pkg.badge && (
                <div style={{
                  position: 'absolute',
                  top: '-14px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--color-text)',
                  color: '#FFFAF5',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '0.3rem 1rem',
                  borderRadius: '2px',
                  whiteSpace: 'nowrap',
                }}>
                  {pkg.badge}
                </div>
              )}

              {/* Nama paket */}
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: pkg.highlight ? 'rgba(255,250,245,0.75)' : 'var(--color-accent)',
                marginBottom: '0.5rem',
              }}>
                {pkg.name}
              </p>

              {/* Harga */}
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                fontWeight: 400,
                color: pkg.highlight ? '#FFFAF5' : 'var(--color-text)',
                lineHeight: 1.1,
                marginBottom: '0.5rem',
              }}>
                {pkg.price}
              </div>

              {/* Deskripsi */}
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: pkg.highlight ? 'rgba(255,250,245,0.7)' : 'var(--color-text-muted)',
                marginBottom: '1.75rem',
                lineHeight: 1.6,
              }}>
                {pkg.desc}
              </p>

              {/* Divider */}
              <div style={{
                height: '1px',
                background: pkg.highlight ? 'rgba(255,250,245,0.2)' : 'var(--color-border)',
                marginBottom: '1.75rem',
              }} />

              {/* Feature list */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '2rem' }}>
                {pkg.features.map((feat, j) => (
                  <li key={j} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    opacity: feat.included ? 1 : 0.45,
                  }}>
                    <span style={{ flexShrink: 0 }}>
                      <CheckIcon included={feat.included} />
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: pkg.highlight ? '#FFFAF5' : 'var(--color-text)',
                      textDecoration: feat.included ? 'none' : 'line-through',
                    }}>
                      {feat.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={scrollToContact}
                style={{
                  width: '100%',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  padding: '0.875rem',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  ...(pkg.highlight ? {
                    background: '#FFFAF5',
                    color: 'var(--color-accent)',
                    border: 'none',
                  } : {
                    background: 'transparent',
                    color: 'var(--color-accent)',
                    border: '1.5px solid var(--color-accent)',
                  }),
                }}
                onMouseEnter={e => {
                  if (pkg.highlight) {
                    e.currentTarget.style.background = 'var(--color-surface-2)'
                  } else {
                    e.currentTarget.style.background = 'var(--color-accent)'
                    e.currentTarget.style.color = '#FFFAF5'
                  }
                }}
                onMouseLeave={e => {
                  if (pkg.highlight) {
                    e.currentTarget.style.background = '#FFFAF5'
                  } else {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--color-accent)'
                  }
                }}
              >
                Pilih Paket {pkg.name}
              </button>
            </div>
          ))}
        </div>

        {/* Catatan & custom package */}
        <div style={{
          marginTop: '3rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.7s ease 0.4s',
        }}>
          {/* Catatan */}
          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '4px',
            padding: '1.5rem',
          }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              marginBottom: '1rem',
            }}>
              Catatan
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {NOTES.map((note, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }}>•</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                    {note}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Custom package CTA */}
          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '4px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                marginBottom: '0.5rem',
              }}>
                Paket Custom
              </p>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, marginBottom: '0.5rem' }}>
                Tidak ada yang cocok?
              </h4>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                Ceritakan kebutuhan spesifik Anda. Kami akan menyusun paket yang pas dengan budget dan keinginan Anda.
              </p>
            </div>
            <button
              className="btn btn-primary"
              onClick={scrollToContact}
              style={{ marginTop: '1.25rem', justifyContent: 'center' }}
            >
              Diskusi Paket Custom
            </button>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          #packages .pkg-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 767px) {
          #packages .note-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}