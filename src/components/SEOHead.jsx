// src/components/SEOHead.jsx
// Mengatur meta tags secara dinamis menggunakan vanilla JS (tanpa react-helmet).
// Cukup render <SEOHead /> sekali di App.jsx — sudah otomatis apply ke <head>.

import { useEffect } from 'react'
import {
  STUDIO_NAME,
  STUDIO_CITY,
  KEYWORDS,
  DEFAULT_DESCRIPTION,
  SITE_URL,
} from '../utils/seo'

const SEO_CONFIG = {
  title: `${STUDIO_NAME} | Fotografer & Videografer Pernikahan ${STUDIO_CITY}`,
  description: DEFAULT_DESCRIPTION,
  keywords: KEYWORDS.join(', '),
  url: SITE_URL,
  // Ganti dengan URL gambar OG yang sebenarnya (1200×630px)
  ogImage: `${SITE_URL}/og-image.jpg`,
  author: STUDIO_NAME,
  locale: 'id_ID',
  twitterHandle: '@weddstoryid',
}

/** Set atau buat sebuah <meta> tag di dalam <head> */
function setMeta(selector, attribute, content) {
  let el = document.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    // Tentukan atribut identifier (name, property, atau http-equiv)
    const attr = selector.match(/\[([^=]+)=/)?.[1]
    if (attr) {
      const val = selector.match(/="([^"]+)"/)?.[1]
      if (attr && val) el.setAttribute(attr, val)
    }
    document.head.appendChild(el)
  }
  el.setAttribute(attribute, content)
}

/** Set atau buat sebuah <link> tag di dalam <head> */
function setLink(rel, href, extra = {}) {
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
  Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v))
}

export default function SEOHead() {
  useEffect(() => {
    const { title, description, keywords, url, ogImage, author, locale, twitterHandle } = SEO_CONFIG

    // ── Title ──────────────────────────────────────────────────────────────
    document.title = title

    // ── Standard meta ──────────────────────────────────────────────────────
    setMeta('meta[name="description"]',         'content', description)
    setMeta('meta[name="keywords"]',             'content', keywords)
    setMeta('meta[name="author"]',               'content', author)
    setMeta('meta[name="robots"]',               'content', 'index, follow, max-image-preview:large')
    setMeta('meta[name="theme-color"]',          'content', '#B5866A')

    // ── Open Graph ─────────────────────────────────────────────────────────
    setMeta('meta[property="og:title"]',         'content', title)
    setMeta('meta[property="og:description"]',   'content', description)
    setMeta('meta[property="og:url"]',           'content', url)
    setMeta('meta[property="og:type"]',          'content', 'website')
    setMeta('meta[property="og:image"]',         'content', ogImage)
    setMeta('meta[property="og:image:width"]',   'content', '1200')
    setMeta('meta[property="og:image:height"]',  'content', '630')
    setMeta('meta[property="og:locale"]',        'content', locale)
    setMeta('meta[property="og:site_name"]',     'content', STUDIO_NAME)

    // ── Twitter Card ───────────────────────────────────────────────────────
    setMeta('meta[name="twitter:card"]',         'content', 'summary_large_image')
    setMeta('meta[name="twitter:site"]',         'content', twitterHandle)
    setMeta('meta[name="twitter:title"]',        'content', title)
    setMeta('meta[name="twitter:description"]',  'content', description)
    setMeta('meta[name="twitter:image"]',        'content', ogImage)

    // ── Canonical ──────────────────────────────────────────────────────────
    setLink('canonical', url)
  }, [])

  // Komponen ini tidak me-render apapun ke DOM — hanya efek samping ke <head>
  return null
}
