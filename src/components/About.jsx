// src/components/About.jsx
import { useEffect, useRef, useState } from 'react'

// ─── DATA — sesuaikan dengan info studio kamu ─────────────────────────────────
const ABOUT_CONFIG = {
  studioName: 'weddstoryid',
  tagline:    'Mengabadikan Cinta dengan Sepenuh Hati',
  story: [
    'Kami adalah tim fotografer dan videografer yang lahir dari kecintaan mendalam terhadap momen-momen manusia yang paling jujur. Berdiri sejak 2019 di Surabaya, kami percaya bahwa setiap pernikahan menyimpan keindahan yang unik.',
    'Dengan pendekatan yang hangat dan tidak kaku, kami hadir bukan hanya sebagai fotografer — tapi sebagai teman yang menemani hari paling spesial dalam hidup Anda.',
  ],
  // Ganti dengan foto tim / foto behind-the-scenes kamu dari Cloudinary
  studioImage: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=900&q=85',
  values: [
    {
      icon: '◇',
      title: 'Autentik',
      desc:  'Kami menangkap momen apa adanya — tawa yang tulus, air mata haru, dan semua keindahan di antaranya.',
    },
    {
      icon: '◈',
      title: 'Detail',
      desc:  'Dari buket bunga hingga tatapan penuh cinta, tidak ada momen kecil yang luput dari perhatian kami.',
    },
    {
      icon: '◉',
      title: 'Terjangkau',
      desc:  'Kualitas studio profesional tidak harus mahal. Kami hadir untuk semua pasangan, bukan hanya yang berbudget besar.',
    },
  ],
}

const STATS = [
  { value: '200+', label: 'Pasangan' },
  { value: '5',    label: 'Tahun' },
  { value: '15+',  label: 'Kota' },
  { value: '4.9',  label: 'Rating' },
]

const TEAM = [
  {
    name:  'Nama Fotografer',       // ← ganti nama
    role:  'Lead Photographer',
    // Ganti dengan foto profil dari Cloudinary
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio:   '5 tahun pengalaman, spesialis candid & outdoor.',
  },
  {
    name:  'Nama Videografer',      // ← ganti nama
    role:  'Cinematographer',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    bio:   'Spesialis video cinematic & drone aerial.',
  },
  {
    name:  'Nama Editor',           // ← ganti nama
    role:  'Photo & Video Editor',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    bio:   'Ahli color grading & retouching natural.',
  },
]
// ─────────────────────────────────────────────────────────────────────────────

// Counter animasi angka
function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const num = parseFloat(target)
        const duration = 1800
        const steps = 50
        const increment = num / steps
        let current = 0
        const timer = setInterval(() => {
          current += increment
          if (current >= num) {
            setCount(num)
            clearInterval(timer)
          } else {
            setCount(parseFloat(current.toFixed(1)))
          }
        }, duration / steps)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])

  const display = Number.isInteger(parseFloat(target))
    ? Math.floor(count)
    : count.toFixed(1)

  return <span ref={ref}>{display}{suffix}</span>
}

export default function About() {
  const sectionRef = useRef(null)
  const [visible,  setVisible]  = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section"
      aria-label="Tentang kami — tim fotografer & videografer pernikahan weddstoryid Surabaya"
      style={{ background: 'var(--color-surface)' }}
    >
      <div className="container">

        {/* ── Baris 1: Foto + Cerita ───────────────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'center',
          marginBottom: '5rem',
        }}>

          {/* Foto studio */}
          <div style={{
            position: 'relative',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-32px)',
            transition: 'all 0.8s ease',
          }}>
            {/* Frame dekoratif */}
            <div style={{
              position: 'absolute',
              top: '-16px', left: '-16px',
              right: '16px', bottom: '16px',
              border: '1.5px solid var(--color-border-strong)',
              borderRadius: '2px',
              zIndex: 0,
            }} />
            <div style={{ position: 'relative', zIndex: 1, overflow: 'hidden', borderRadius: '2px' }}>
              {!imgLoaded && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'var(--color-border)',
                  animation: 'shimmer 1.5s infinite',
                }} />
              )}
              <img
                src={ABOUT_CONFIG.studioImage}
                alt="Tim fotografer & videografer pernikahan weddstoryid Surabaya — profesional berpengalaman 5 tahun"
                onLoad={() => setImgLoaded(true)}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '480px',
                  objectFit: 'cover',
                  display: 'block',
                  opacity: imgLoaded ? 1 : 0,
                  transition: 'opacity 0.5s',
                }}
              />
            </div>

            {/* Badge pengalaman */}
            <div style={{
              position: 'absolute',
              bottom: '-20px', right: '-20px',
              zIndex: 2,
              background: 'var(--color-accent)',
              color: '#FFFAF5',
              padding: '1.25rem 1.5rem',
              borderRadius: '2px',
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(181,134,106,0.4)',
            }}>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.25rem',
                fontWeight: 400,
                lineHeight: 1,
              }}>
                {STATS[1].value}
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginTop: '0.25rem',
                opacity: 0.85,
              }}>
                Tahun Pengalaman
              </div>
            </div>
          </div>

          {/* Teks cerita */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(32px)',
            transition: 'all 0.8s ease 0.15s',
          }}>
            <span className="section-label">Tentang Kami</span>
            <h2 style={{ marginBottom: '1rem' }}>
              {ABOUT_CONFIG.tagline.split(' ').slice(0, 2).join(' ')}{' '}
              <em style={{ fontStyle: 'italic' }}>
                {ABOUT_CONFIG.tagline.split(' ').slice(2).join(' ')}
              </em>
            </h2>
            <div className="divider" />

            {ABOUT_CONFIG.story.map((para, i) => (
              <p key={i} style={{ marginBottom: i < ABOUT_CONFIG.story.length - 1 ? '1rem' : '2rem' }}>
                {para}
              </p>
            ))}

            {/* Values */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {ABOUT_CONFIG.values.map((val, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{
                    flexShrink: 0,
                    width: '36px', height: '36px',
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '2px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--color-accent)',
                    fontSize: '1rem',
                    marginTop: '2px',
                  }}>
                    {val.icon}
                  </div>
                  <div>
                    <h4 style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 500,
                      fontSize: '0.9375rem',
                      marginBottom: '0.25rem',
                      color: 'var(--color-text)',
                    }}>
                      {val.title}
                    </h4>
                    <p style={{ fontSize: '0.875rem', margin: 0 }}>{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Stats bar ────────────────────────────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          background: 'var(--color-bg)',
          border: '1px solid var(--color-border)',
          borderRadius: '4px',
          marginBottom: '5rem',
          overflow: 'hidden',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.7s ease 0.3s',
        }}>
          {STATS.map((stat, i) => (
            <div key={i} style={{
              padding: '2rem 1.5rem',
              textAlign: 'center',
              borderRight: i < STATS.length - 1 ? '1px solid var(--color-border)' : 'none',
            }}>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 3vw, 2.75rem)',
                fontWeight: 400,
                color: 'var(--color-accent)',
                lineHeight: 1,
                marginBottom: '0.5rem',
              }}>
                <AnimatedCounter
                  target={stat.value.replace(/[^0-9.]/g, '')}
                  suffix={stat.value.replace(/[0-9.]/g, '')}
                />
              </div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                margin: 0,
              }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Tim ──────────────────────────────────────────────────────── */}
        <div style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.7s ease 0.4s',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-label">Kenali Tim Kami</span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
              Orang-orang di Balik <em style={{ fontStyle: 'italic' }}>Setiap Momen</em>
            </h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }}>
            {TEAM.map((member, i) => (
              <div key={i} style={{
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: '4px',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${0.45 + i * 0.1}s`,
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 12px 36px rgba(61,43,31,0.1)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ height: '260px', overflow: 'hidden' }}>
                  <img
                    src={member.photo}
                    alt={`${member.name} — ${member.role} di weddstoryid, jasa foto pernikahan Surabaya & Sidoarjo`}
                    loading="lazy"
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.6s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                <div style={{ padding: '1.25rem 1.5rem' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 400,
                    fontSize: '1.125rem',
                    marginBottom: '0.2rem',
                  }}>
                    {member.name}
                  </h4>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-accent)',
                    marginBottom: '0.625rem',
                  }}>
                    {member.role}
                  </p>
                  <p style={{ fontSize: '0.875rem', margin: 0, lineHeight: 1.6 }}>
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @media (max-width: 900px) {
          #about .story-grid    { grid-template-columns: 1fr !important; }
          #about .stats-grid    { grid-template-columns: repeat(2, 1fr) !important; }
          #about .team-grid     { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          #about .stats-grid    { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}