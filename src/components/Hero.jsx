// src/components/Hero.jsx
import { useEffect, useRef } from 'react'
import heroBgImage from '../../public/wedd_bg_2.jpeg'

// ─── KONFIGURASI — sesuaikan dengan data kamu ───────────────────────────────
const HERO_CONFIG = {
  studioName: 'weddstoryid',
  tagline: 'Abadikan Setiap',
  taglineItal: 'Momen Berharga',
  subtext: 'Jasa foto & videografi pernikahan profesional dengan hasil berkualitas tinggi. Harga terjangkau untuk semua pasangan.',
  // Ganti URL di bawah dengan foto terbaik kamu (dari Cloudinary atau URL lain)
  // Tips: gunakan foto horizontal/landscape, resolusi minimal 1600px
  heroImage: heroBgImage,

  stats: [
    { value: '200+', label: 'Pasangan' },
    { value: '5', label: 'Tahun' },
    { value: '4.9★', label: 'Rating' },
  ],
}
// ─────────────────────────────────────────────────────────────────────────────

export default function Hero() {
  const textRef = useRef(null)

  // Animasi fade-up saat mount
  useEffect(() => {
    const els = textRef.current?.querySelectorAll('.hero-anim')
    els?.forEach((el, i) => {
      setTimeout(() => {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 200 + i * 150)
    })
  }, [])

  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      aria-label="Beranda — weddstoryid, Fotografer & Videografer Pernikahan Surabaya & Sidoarjo"
      style={{
        position: 'relative',
        height: '100dvh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background image — fetchpriority=high karena ini LCP element */}
      <img
        src={HERO_CONFIG.heroImage}
        alt="Foto pernikahan — weddstoryid fotografer pernikahan profesional Surabaya & Sidoarjo"
        fetchPriority="high"
        loading="eager"
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 30%',
          transform: 'scale(1.04)',
          pointerEvents: 'none',
        }}
      />

      {/* Overlay gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(105deg, rgba(61,43,31,0.72) 0%, rgba(61,43,31,0.35) 60%, rgba(61,43,31,0.15) 100%)',
      }} />

      {/* Konten */}
      <div className="container" ref={textRef} style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '680px' }}>

          {/* Label kecil */}
          <span
            className="hero-anim"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: '1.25rem',
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'all 0.6s ease',
              background: 'rgba(255,250,245,0.1)',
              padding: '0.35rem 0.9rem',
              borderRadius: '2px',
              border: '1px solid rgba(181,134,106,0.4)',
            }}
          >
            {HERO_CONFIG.studioName}
          </span>

          {/* Heading utama */}
          <h1
            className="hero-anim"
            style={{
              fontFamily: 'var(--font-heading)',
              color: '#FFFAF5',
              marginBottom: '1.25rem',
              opacity: 0,
              transform: 'translateY(24px)',
              transition: 'all 0.7s ease',
              textShadow: '0 2px 20px rgba(0,0,0,0.2)',
            }}
          >
            {HERO_CONFIG.tagline}<br />
            <em style={{ fontStyle: 'italic', color: '#F0C9AE' }}>
              {HERO_CONFIG.taglineItal}
            </em>
          </h1>

          {/* Divider line */}
          <div
            className="hero-anim"
            style={{
              width: '48px', height: '2px',
              background: 'var(--color-accent)',
              marginBottom: '1.5rem',
              opacity: 0,
              transform: 'translateY(16px)',
              transition: 'all 0.6s ease',
            }}
          />

          {/* Subtext */}
          <p
            className="hero-anim"
            style={{
              fontSize: '1rem',
              color: 'rgba(255,250,245,0.82)',
              lineHeight: 1.8,
              marginBottom: '2.5rem',
              maxWidth: '480px',
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'all 0.6s ease',
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
            }}
          >
            {HERO_CONFIG.subtext}
          </p>

          {/* CTA Buttons */}
          <div
            className="hero-anim"
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'all 0.6s ease',
            }}
          >
            <button
              className="btn btn-primary"
              onClick={scrollToPortfolio}
              aria-label="Lihat portofolio foto & video pernikahan kami"
              style={{ fontSize: '0.875rem' }}
            >
              Lihat Karya Kami
            </button>
            <button
              onClick={scrollToContact}
              aria-label="Hubungi kami untuk konsultasi jasa foto & video pernikahan"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                fontWeight: 500,
                letterSpacing: '0.05em',
                padding: '0.75rem 2rem',
                borderRadius: '2px',
                border: '1.5px solid rgba(255,250,245,0.6)',
                background: 'transparent',
                color: '#FFFAF5',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,250,245,0.12)'
                e.currentTarget.style.borderColor = '#FFFAF5'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.borderColor = 'rgba(255,250,245,0.6)'
              }}
            >
              Hubungi Kami
            </button>
          </div>

        </div>
      </div>

      {/* Stats bar — pojok kanan bawah */}
      <div
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          right: '0',
          display: 'flex',
          gap: '0',
          zIndex: 1,
        }}
      >
        {HERO_CONFIG.stats.map((stat, i) => (
          <div
            key={i}
            style={{
              padding: '1rem 1.75rem',
              background: i === 1 ? 'var(--color-accent)' : 'rgba(255,250,245,0.1)',
              backdropFilter: 'blur(8px)',
              borderTop: '1px solid rgba(255,250,245,0.15)',
              borderLeft: i === 0 ? '1px solid rgba(255,250,245,0.15)' : 'none',
              textAlign: 'center',
              minWidth: '90px',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.5rem',
              fontWeight: 400,
              color: '#FFFAF5',
              lineHeight: 1,
              marginBottom: '0.25rem',
            }}>
              {stat.value}
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              fontWeight: 400,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,250,245,0.7)',
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '2.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        zIndex: 1,
      }}>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.65rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'rgba(255,250,245,0.45)',
        }}>Scroll</span>
        <div style={{
          width: '1px',
          height: '40px',
          background: 'linear-gradient(to bottom, rgba(255,250,245,0.6), transparent)',
          animation: 'scrollPulse 2s ease-in-out infinite',
        }} />
      </div>

      {/* Keyframe untuk scroll indicator */}
      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50%       { opacity: 1;   transform: scaleY(1.15); }
        }
        @media (max-width: 767px) {
          #home .stats-bar { display: none; }
        }
      `}</style>
    </section>
  )
}