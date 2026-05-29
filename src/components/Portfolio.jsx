// src/components/Portfolio.jsx
import { useState, useEffect, useRef, useCallback } from 'react'
import preweddVideo from '../assets/video/prewedd_preview.mp4'

// ─── DATA GALERI — ganti dengan foto-foto kamu ───────────────────────────────
const GALLERY_ITEMS = [
  { id: 1, category: 'prewedding', label: 'Sesi Pantai',       alt: 'Foto pre-wedding sesi pantai oleh fotografer pernikahan weddstoryid Surabaya',       src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80', thumb: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&q=70' },
  { id: 2, category: 'wedding',    label: 'Akad Nikah',        alt: 'Foto dokumentasi akad nikah pernikahan oleh fotografer weddstoryid Surabaya',         src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80', thumb: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&q=70' },
  { id: 3, category: 'reception',  label: 'Grand Ballroom',    alt: 'Foto resepsi pernikahan grand ballroom oleh videografer weddstoryid Sidoarjo',       src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80', thumb: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=70' },
  { id: 4, category: 'prewedding', label: 'Golden Hour',       alt: 'Pre-wedding golden hour romantis oleh fotografer pernikahan weddstoryid Surabaya',    src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80', thumb: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&q=70' },
  { id: 5, category: 'wedding',    label: 'Prosesi Adat',      alt: 'Foto prosesi adat pernikahan Jawa oleh fotografer weddstoryid Surabaya Sidoarjo',    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', thumb: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=70' },
  { id: 6, category: 'reception',  label: 'Garden Party',      alt: 'Foto resepsi garden party pernikahan outdoor oleh weddstoryid',                       src: 'https://images.unsplash.com/photo-1511285560929-80b456503681?w=800&q=80', thumb: 'https://images.unsplash.com/photo-1511285560929-80b456503681?w=400&q=70' },
  { id: 7, category: 'prewedding', label: 'Urban Session',     alt: 'Pre-wedding urban session kota Surabaya oleh fotografer weddstoryid',                 src: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800&q=80', thumb: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=400&q=70' },
  { id: 8, category: 'wedding',    label: 'Intimate Ceremony', alt: 'Foto intimate wedding ceremony pernikahan sederhana oleh weddstoryid Surabaya',      src: 'https://images.unsplash.com/photo-1550005809-91ad75fb315f?w=800&q=80', thumb: 'https://images.unsplash.com/photo-1550005809-91ad75fb315f?w=400&q=70' },
  { id: 9, category: 'reception',  label: 'Dinner Reception',  alt: 'Foto dinner reception malam pernikahan mewah oleh fotografer weddstoryid Surabaya',   src: 'https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=800&q=80', thumb: 'https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=400&q=70' },
]

// Ganti dengan ID video YouTube highlight kamu
// Cara cari: buka youtube.com/watch?v=XXXXX — ambil bagian XXXXX
const VIDEO_EMBED_ID = 'erLbbextvlY'
// ─────────────────────────────────────────────────────────────────────────────

const FILTER_TABS = [
  { key: 'all',        label: 'Semua' },
  { key: 'prewedding', label: 'Pre-Wedding' },
  { key: 'wedding',    label: 'Pernikahan' },
  { key: 'reception',  label: 'Resepsi' },
]

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightbox,     setLightbox]     = useState(null)
  const [imgLoaded,    setImgLoaded]    = useState({})
  const sectionRef = useRef(null)
  const [visible,   setVisible]   = useState(false)

  const filtered = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(i => i.category === activeFilter)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (!lightbox) return
      if (e.key === 'Escape')     closeLightbox()
      if (e.key === 'ArrowRight') navigateLightbox(1)
      if (e.key === 'ArrowLeft')  navigateLightbox(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, filtered])

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  const openLightbox = (item, index) => setLightbox({ item, index })
  const closeLightbox = () => setLightbox(null)
  const navigateLightbox = useCallback((dir) => {
    if (!lightbox) return
    const next = (lightbox.index + dir + filtered.length) % filtered.length
    setLightbox({ item: filtered[next], index: next })
  }, [lightbox, filtered])

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="section"
      aria-label="Portofolio galeri foto & video pernikahan weddstoryid"
      style={{ background: 'var(--color-surface)', paddingBottom: '5rem' }}
    >
      <div className="container">

        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.7s ease',
        }}>
          <span className="section-label">Karya Kami</span>
          <h2>Galeri <em style={{ fontStyle: 'italic' }}>Portofolio</em></h2>
          <p style={{ maxWidth: '480px', margin: '0.75rem auto 0', fontSize: '0.9375rem' }}>
            Setiap foto adalah cerita. Temukan momen-momen berharga yang telah kami abadikan.
          </p>
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0',
          marginBottom: '2.5rem',
          borderBottom: '1px solid var(--color-border)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.7s ease 0.15s',
        }}>
          {FILTER_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                fontWeight: activeFilter === tab.key ? '500' : '400',
                letterSpacing: '0.05em',
                color: activeFilter === tab.key ? 'var(--color-accent)' : 'var(--color-text-muted)',
                background: 'none',
                border: 'none',
                borderBottom: activeFilter === tab.key
                  ? '2px solid var(--color-accent)'
                  : '2px solid transparent',
                padding: '0.625rem 1.5rem',
                cursor: 'pointer',
                marginBottom: '-1px',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '6px',
        }}>
          {filtered.map((item, i) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item, i)}
              style={{
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                height: i % 5 === 1 ? '380px' : i % 5 === 3 ? '300px' : '340px',
                background: 'var(--color-border)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s ease ${0.1 + i * 0.07}s, transform 0.6s ease ${0.1 + i * 0.07}s`,
              }}
            >
              <img
                src={item.thumb}
                alt={item.alt || `Foto ${item.label} — jasa foto pernikahan weddstoryid Surabaya & Sidoarjo`}
                loading="lazy"
                onLoad={() => setImgLoaded(p => ({ ...p, [item.id]: true }))}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  opacity: imgLoaded[item.id] ? 1 : 0,
                  transition: 'transform 0.6s ease, opacity 0.4s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />

              {!imgLoaded[item.id] && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(90deg, var(--color-border) 25%, var(--color-surface-2) 50%, var(--color-border) 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.5s infinite',
                }} />
              )}

              <div
                className="gallery-overlay"
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(61,43,31,0.75) 0%, transparent 55%)',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '1.25rem',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.style.opacity = '0'}
              >
                <div>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-accent)',
                    marginBottom: '0.2rem',
                  }}>
                    {FILTER_TABS.find(t => t.key === item.category)?.label}
                  </p>
                  <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: '#FFFAF5' }}>
                    {item.label}
                  </p>
                </div>
                <div style={{
                  marginLeft: 'auto',
                  width: '36px', height: '36px',
                  border: '1.5px solid rgba(255,250,245,0.5)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFAF5" strokeWidth="2">
                    <path d="M15 3h6m0 0v6m0-6l-7 7M9 21H3m0 0v-6m0 6l7-7"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Section */}
        <div style={{
          marginTop: '4rem',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.7s ease 0.4s',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="section-label">Video Highlight</span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
              Lihat <em style={{ fontStyle: 'italic' }}>Cinematic Story</em> Kami
            </h3>
          </div>
          <div style={{
            position: 'relative',
            paddingBottom: '56.25%',
            height: 0,
            overflow: 'hidden',
            borderRadius: '2px',
            background: '#1a1a1a',
          }}>
            <video
              src={preweddVideo}
              title="Pre Wedding Highlight Video"
              controls
              muted
              playsInline
              style={{
                position: 'absolute', top: 0, left: 0,
                width: '100%', height: '100%',
                border: '1px solid #C4B2A6',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>

      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(20,13,9,0.96)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'fadeIn 0.25s ease',
          }}
        >
          <img
            src={lightbox.item.src}
            alt={lightbox.item.label}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '90vw', maxHeight: '85vh',
              objectFit: 'contain',
              borderRadius: '2px',
              boxShadow: '0 25px 80px rgba(0,0,0,0.6)',
            }}
          />

          <div style={{
            position: 'absolute', bottom: '2rem', left: '50%',
            transform: 'translateX(-50%)', textAlign: 'center',
          }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', color: '#FFFAF5', marginBottom: '0.25rem' }}>
              {lightbox.item.label}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
              {FILTER_TABS.find(t => t.key === lightbox.item.category)?.label}
            </p>
          </div>

          <button onClick={closeLightbox} aria-label="Tutup lightbox" style={{
            position: 'absolute', top: '1.5rem', right: '1.5rem',
            background: 'rgba(255,250,245,0.1)', border: '1px solid rgba(255,250,245,0.2)',
            color: '#FFFAF5', fontSize: '1.25rem', width: '40px', height: '40px',
            borderRadius: '50%', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>×</button>

          {[{ dir: -1, label: '‹', side: 'left' }, { dir: 1, label: '›', side: 'right' }].map(btn => (
            <button key={btn.side}
              onClick={e => { e.stopPropagation(); navigateLightbox(btn.dir) }}
              style={{
                position: 'absolute', [btn.side]: '1.5rem',
                top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,250,245,0.1)', border: '1px solid rgba(255,250,245,0.2)',
                color: '#FFFAF5', fontSize: '1.75rem', width: '44px', height: '44px',
                borderRadius: '50%', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >{btn.label}</button>
          ))}

          <div style={{
            position: 'absolute', top: '1.5rem', left: '50%', transform: 'translateX(-50%)',
            fontFamily: 'var(--font-body)', fontSize: '0.75rem',
            color: 'rgba(255,250,245,0.5)', letterSpacing: '0.1em',
          }}>
            {lightbox.index + 1} / {filtered.length}
          </div>
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @media (max-width: 767px) {
          #portfolio .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          #portfolio .gallery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}