// src/components/Contact.jsx
import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
// ─── KONFIGURASI — sesuaikan dengan info kamu ────────────────────────────────
const CONTACT_CONFIG = {
  // EmailJS — daftar gratis di emailjs.com, isi 3 nilai ini
  // Panduan: https://www.emailjs.com/docs/tutorial/overview/
  emailjs: {
    serviceId:  'YOUR_SERVICE_ID',   // dari EmailJS dashboard
    templateId: 'YOUR_TEMPLATE_ID',  // dari EmailJS > Email Templates
    publicKey:  'YOUR_PUBLIC_KEY',   // dari EmailJS > Account > Public Key
  },
  // Info kontak
  whatsapp:  '6281234567890',        // nomor WA (format internasional, tanpa +)
  email:     'studio@email.com',
  instagram: '@weddstoryid',
  location:  'Surabaya, Jawa Timur',
}

const WA_MESSAGE = 'Halo, saya tertarik dengan layanan foto & videografi pernikahan Anda.'
// ─────────────────────────────────────────────────────────────────────────────

const INITIAL_FORM = {
  name:     '',
  email:    '',
  phone:    '',
  date:     '',
  location: '',
  package:  '',
  message:  '',
}

const PACKAGES_OPTIONS = ['Silver', 'Gold', 'Platinum', 'Custom / Belum tau']

function InputField({ label, error, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
      <label style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.75rem',
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--color-text-muted)',
      }}>
        {label}
      </label>
      {children}
      {error && (
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#c0392b' }}>
          {error}
        </span>
      )}
    </div>
  )
}

const inputStyle = (focused, error) => ({
  fontFamily: 'var(--font-body)',
  fontSize: '0.9375rem',
  color: 'var(--color-text)',
  background: 'transparent',
  border: 'none',
  borderBottom: `1.5px solid ${error ? '#c0392b' : focused ? 'var(--color-accent)' : 'var(--color-border-strong)'}`,
  padding: '0.625rem 0',
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.2s',
  borderRadius: 0,
})

export default function Contact() {
  const sectionRef = useRef(null)
  const [visible,  setVisible]  = useState(false)
  const [form,     setForm]     = useState(INITIAL_FORM)
  const [errors,   setErrors]   = useState({})
  const [focused,  setFocused]  = useState(null)
  const [status,   setStatus]   = useState('idle') // idle | sending | success | error

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const set = (field) => (e) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const err = {}
    if (!form.name.trim())    err.name    = 'Nama wajib diisi'
    if (!form.email.trim())   err.email   = 'Email wajib diisi'
    else if (!/\S+@\S+\.\S+/.test(form.email)) err.email = 'Format email tidak valid'
    if (!form.phone.trim())   err.phone   = 'Nomor WA wajib diisi'
    if (!form.date)           err.date    = 'Tanggal pernikahan wajib diisi'
    return err
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validate()
    if (Object.keys(err).length > 0) { setErrors(err); return }
    setErrors({})
    setStatus('sending')

    try {
      // ── Integrasi EmailJS ──────────────────────────────────────────
      // Uncomment blok ini setelah mengisi CONTACT_CONFIG.emailjs di atas
      // dan install EmailJS: npm install @emailjs/browser
      //
      //
      await emailjs.send(
        CONTACT_CONFIG.emailjs.serviceId,
        CONTACT_CONFIG.emailjs.templateId,
        {
          from_name:    form.name,
          from_email:   form.email,
          phone:        form.phone,
          wedding_date: form.date,
          wedding_loc:  form.location,
          package:      form.package,
          message:      form.message,
        },
        CONTACT_CONFIG.emailjs.publicKey
      )
      // ──────────────────────────────────────────────────────────────

      setStatus('success')
      setForm(INITIAL_FORM)
    } catch {
      setStatus('error')
    }
  }

  const waUrl = `https://wa.me/${CONTACT_CONFIG.whatsapp}?text=${encodeURIComponent(WA_MESSAGE)}`

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section"
      aria-label="Hubungi weddstoryid — konsultasi jasa foto & videografi pernikahan Surabaya & Sidoarjo"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="container">

        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.7s ease',
        }}>
          <span className="section-label">Hubungi Kami</span>
          <h2>Mulai Cerita <em style={{ fontStyle: 'italic' }}>Anda</em></h2>
          <p style={{ maxWidth: '480px', margin: '0.75rem auto 0', fontSize: '0.9375rem' }}>
            Ceritakan hari spesial Anda. Kami siap membantu mewujudkan dokumentasi pernikahan impian Anda.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.6fr',
          gap: '5rem',
          alignItems: 'start',
        }}>

          {/* ── Kiri: Info kontak ─────────────────────────────────── */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-24px)',
            transition: 'all 0.8s ease 0.1s',
          }}>

            {/* WA CTA — utama */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                background: '#25D366',
                color: '#fff',
                borderRadius: '4px',
                padding: '1.25rem 1.5rem',
                textDecoration: 'none',
                marginBottom: '2rem',
                transition: 'all 0.25s ease',
                boxShadow: '0 4px 20px rgba(37,211,102,0.25)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(37,211,102,0.35)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.25)' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.121 1.523 5.853L0 24l6.324-1.496A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.007-1.371l-.36-.213-3.724.881.936-3.619-.234-.373A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
              </svg>
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.85, marginBottom: '0.1rem' }}>
                  Chat Langsung
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 500 }}>
                  WhatsApp Kami
                </div>
              </div>
              <svg style={{ marginLeft: 'auto' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>

            {/* Info kontak lain */}
            {[
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                ),
                label: 'Email',
                value: CONTACT_CONFIG.email,
                href: `mailto:${CONTACT_CONFIG.email}`,
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                ),
                label: 'Instagram',
                value: CONTACT_CONFIG.instagram,
                href: `https://instagram.com/${CONTACT_CONFIG.instagram.replace('@', '')}`,
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                ),
                label: 'Lokasi',
                value: CONTACT_CONFIG.location,
                href: null,
              },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 0',
                borderBottom: '1px solid var(--color-border)',
              }}>
                <div style={{
                  width: '38px', height: '38px', flexShrink: 0,
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-accent)',
                }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: 0 }}>
                    {item.label}
                  </p>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--color-text)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text)'}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--color-text)', margin: 0 }}>{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Response time note */}
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem 1.25rem',
              background: 'var(--color-surface)',
              borderRadius: '4px',
              border: '1px solid var(--color-border)',
              display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>⏱</span>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', margin: 0, lineHeight: 1.6 }}>
                Kami biasanya membalas dalam <strong style={{ color: 'var(--color-text)' }}>1×24 jam</strong>. Untuk respons lebih cepat, hubungi via WhatsApp.
              </p>
            </div>
          </div>

          {/* ── Kanan: Form ───────────────────────────────────────── */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(24px)',
            transition: 'all 0.8s ease 0.2s',
          }}>
            {status === 'success' ? (
              // Success state
              <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                background: 'var(--color-surface)',
                borderRadius: '4px',
                border: '1px solid var(--color-border)',
                animation: 'fadeIn 0.5s ease',
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1.25rem' }}>✦</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, marginBottom: '0.75rem' }}>
                  Pesan Terkirim!
                </h3>
                <p style={{ maxWidth: '340px', margin: '0 auto 2rem', fontSize: '0.9375rem' }}>
                  Terima kasih telah menghubungi kami. Kami akan segera membalas dalam 1×24 jam.
                </p>
                <button
                  className="btn btn-outline"
                  onClick={() => setStatus('idle')}
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              // Form
              <form onSubmit={handleSubmit} noValidate aria-label="Formulir pemesanan jasa foto & video pernikahan weddstoryid">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.75rem 2rem' }}>

                  <InputField label="Nama Lengkap *" error={errors.name}>
                    <input
                      type="text"
                      placeholder="Nama kamu"
                      value={form.name}
                      onChange={set('name')}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      style={inputStyle(focused === 'name', errors.name)}
                    />
                  </InputField>

                  <InputField label="Email *" error={errors.email}>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={form.email}
                      onChange={set('email')}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      style={inputStyle(focused === 'email', errors.email)}
                    />
                  </InputField>

                  <InputField label="Nomor WhatsApp *" error={errors.phone}>
                    <input
                      type="tel"
                      placeholder="08xxxxxxxxxx"
                      value={form.phone}
                      onChange={set('phone')}
                      onFocus={() => setFocused('phone')}
                      onBlur={() => setFocused(null)}
                      style={inputStyle(focused === 'phone', errors.phone)}
                    />
                  </InputField>

                  <InputField label="Tanggal Pernikahan *" error={errors.date}>
                    <input
                      type="date"
                      value={form.date}
                      onChange={set('date')}
                      onFocus={() => setFocused('date')}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle(focused === 'date', errors.date), colorScheme: 'light' }}
                    />
                  </InputField>

                  <InputField label="Lokasi Pernikahan">
                    <input
                      type="text"
                      placeholder="Kota / venue"
                      value={form.location}
                      onChange={set('location')}
                      onFocus={() => setFocused('location')}
                      onBlur={() => setFocused(null)}
                      style={inputStyle(focused === 'location', false)}
                    />
                  </InputField>

                  <InputField label="Paket yang Diminati">
                    <select
                      value={form.package}
                      onChange={set('package')}
                      onFocus={() => setFocused('package')}
                      onBlur={() => setFocused(null)}
                      style={{
                        ...inputStyle(focused === 'package', false),
                        cursor: 'pointer',
                        appearance: 'none',
                        background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237A6558' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E") no-repeat right center`,
                      }}
                    >
                      <option value="">Pilih paket...</option>
                      {PACKAGES_OPTIONS.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </InputField>

                  <InputField label="Ceritakan Impian Kamu" error={errors.message}>
                    <textarea
                      placeholder="Konsep, venue, tema, atau pertanyaan lainnya..."
                      value={form.message}
                      onChange={set('message')}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      rows={4}
                      style={{
                        ...inputStyle(focused === 'message', errors.message),
                        resize: 'vertical',
                        minHeight: '100px',
                        lineHeight: 1.7,
                      }}
                    />
                  </InputField>

                </div>

                {/* Error global */}
                {status === 'error' && (
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.875rem',
                    color: '#c0392b', marginTop: '1rem',
                  }}>
                    Terjadi kesalahan. Silakan coba lagi atau hubungi via WhatsApp.
                  </p>
                )}

                {/* Submit */}
                <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={status === 'sending'}
                    style={{
                      opacity: status === 'sending' ? 0.7 : 1,
                      cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                      minWidth: '160px',
                      justifyContent: 'center',
                    }}
                  >
                    {status === 'sending' ? (
                      <>
                        <svg style={{ animation: 'spin 1s linear infinite' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity=".25"/><path d="M21 12a9 9 0 01-9 9"/>
                        </svg>
                        Mengirim...
                      </>
                    ) : 'Kirim Pesan'}
                  </button>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: 0 }}>
                    atau langsung{' '}
                    <a href={waUrl} target="_blank" rel="noopener noreferrer"
                      style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>
                      chat via WA
                    </a>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 900px) {
          #contact .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
        @media (max-width: 600px) {
          #contact .form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}