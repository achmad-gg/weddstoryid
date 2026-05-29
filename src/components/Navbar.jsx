// src/components/Navbar.jsx
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Beranda',     href: '#home' },
  { label: 'Portofolio',  href: '#portfolio' },
  { label: 'Paket',       href: '#packages' },
  { label: 'Tentang',     href: '#about' },
  { label: 'Kontak',      href: '#contact' },
]

const WA_NUMBER = '6281515046988'
const WA_MESSAGE = 'Halo, saya tertarik dengan layanan foto & videografi pernikahan Anda.'
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [activeLink,  setActiveLink]  = useState('#home')

  // Ubah background navbar saat scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Tutup menu mobile saat resize ke desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Highlight link aktif berdasarkan section yang sedang terlihat
  useEffect(() => {
    const sectionIds = NAV_LINKS.map(l => l.href.replace('#', ''))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveLink(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href) => {
    setActiveLink(href)
    setMenuOpen(false)
  }

  return (
    <>
      <nav
        aria-label="Navigasi utama weddstoryid"
        role="navigation"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          padding: scrolled ? '0.875rem 0' : '1.375rem 0',
          background: scrolled ? 'rgba(255,250,245,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
          transition: 'all 0.35s ease',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <a href="/" style={{ textDecoration: 'none' }} onClick={() => handleNavClick('#home')}>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.375rem',
              fontWeight: 400,
              color: scrolled ? 'var(--color-text)' : 'var(--color-text-on-dark)',
              letterSpacing: '0.04em',
            }}>
              weddstoryid
            </span>
          </a>

          {/* Desktop nav links */}
          <ul style={{
            display: 'flex',
            gap: '2.5rem',
            listStyle: 'none',
            alignItems: 'center',
          }} className="desktop-nav">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8125rem',
                    fontWeight: activeLink === link.href ? '500' : '400',
                    letterSpacing: '0.06em',
                    color: activeLink === link.href 
                      ? (scrolled ? 'var(--color-accent)' : 'var(--color-text-on-dark-active)') 
                      : (scrolled ? 'var(--color-text)' : 'var(--color-text-on-dark)'),
                    textDecoration: 'none',
                    borderBottom: activeLink === link.href 
                      ? (scrolled ? '1.5px solid var(--color-accent)' : '1.5px solid var(--color-text-on-dark-active)') 
                      : '1.5px solid transparent',
                    paddingBottom: '2px',
                    transition: 'all 0.2s',
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA WhatsApp — desktop */}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary desktop-nav"
            style={{ fontSize: '0.8125rem', padding: '0.625rem 1.5rem' }}
          >
            {/* Icon WA sederhana */}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.121 1.523 5.853L0 24l6.324-1.496A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.007-1.371l-.36-.213-3.724.881.936-3.619-.234-.373A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
            </svg>
            WhatsApp
          </a>

          {/* Hamburger button — mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}
          >
            <span style={{
              display: 'block', width: '22px', height: '1.5px',
              background: scrolled ? 'var(--color-text)' : 'var(--color-text-on-dark)',
              transition: 'all 0.3s',
              transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
            }} />
            <span style={{
              display: 'block', width: '22px', height: '1.5px',
              background: scrolled ? 'var(--color-text)' : 'var(--color-text-on-dark)',
              transition: 'all 0.3s',
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block', width: '22px', height: '1.5px',
              background: scrolled ? 'var(--color-text)' : 'var(--color-text-on-dark)',
              transition: 'all 0.3s',
              transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
            }} />
          </button>

        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 99,
        background: 'rgba(255,250,245,0.98)',
        backdropFilter: 'blur(12px)',
        paddingTop: '5rem',
        paddingBottom: '2rem',
        transform: menuOpen ? 'translateY(0)' : 'translateY(-110%)',
        transition: 'transform 0.35s ease',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <div className="container">
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0' }}>
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.125rem',
                    fontWeight: '400',
                    color: activeLink === link.href ? 'var(--color-accent)' : 'var(--color-text)',
                    textDecoration: 'none',
                    padding: '0.875rem 0',
                    borderBottom: '1px solid var(--color-border)',
                    transition: 'color 0.2s',
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}
          >
            WhatsApp Kami
          </a>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (min-width: 768px) {
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}