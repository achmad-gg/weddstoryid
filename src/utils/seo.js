// src/utils/seo.js
// ─── SEO Helper Functions & Constants ────────────────────────────────────────

export const STUDIO_NAME = 'weddstoryid'
export const STUDIO_CITY = 'Surabaya & Sidoarjo'
export const STUDIO_REGION = 'Jawa Timur'

/** Keyword utama untuk SEO */
export const KEYWORDS = [
  'fotografer pernikahan Surabaya',
  'fotografer pernikahan Sidoarjo',
  'videografer wedding Surabaya',
  'videografer wedding Sidoarjo',
  'jasa foto pernikahan Surabaya',
  'jasa foto pernikahan Sidoarjo',
  'paket foto wedding murah Surabaya',
  'paket foto wedding murah Sidoarjo',
  'pre-wedding Surabaya',
  'pre-wedding Sidoarjo',
  'foto wedding profesional Surabaya',
  'dokumentasi pernikahan Surabaya',
  'dokumentasi pernikahan Sidoarjo',
  'videografi pernikahan Jawa Timur',
  'fotografer pernikahan profesional',
  'jasa foto wedding terbaik Surabaya',
  'cinematic wedding Surabaya',
  'paket foto video pernikahan',
  'weddstoryid',
]

/**
 * Generate page title dengan format SEO-friendly.
 * @param {string} pageName - Nama halaman / section
 * @returns {string} - "Pagename | Nama Studio | Kota"
 */
export function generatePageTitle(pageName) {
  if (!pageName) return `${STUDIO_NAME} | Fotografer & Videografer Pernikahan ${STUDIO_CITY}`
  return `${pageName} | ${STUDIO_NAME} | ${STUDIO_CITY}`
}

/**
 * Generate meta description dinamis.
 * @param {string} service - Nama layanan (opsional)
 * @param {string} location - Lokasi (opsional)
 * @returns {string} - Deskripsi 150–160 karakter
 */
export function generateDescription(service, location) {
  const svc = service || 'Foto & Videografi Pernikahan'
  const loc = location || STUDIO_CITY
  return `${STUDIO_NAME} — ${svc} profesional di ${loc}. Abadikan momen pernikahan impian Anda dengan hasil berkualitas tinggi & harga terjangkau.`
}

/** Default meta description (≤160 karakter) */
export const DEFAULT_DESCRIPTION =
  'weddstoryid — Fotografer & Videografer Pernikahan profesional di Surabaya & Sidoarjo. Paket foto wedding terjangkau, hasil berkualitas. Hubungi kami sekarang!'

/** Canonical base URL — ganti dengan domain asli saat deploy */
export const SITE_URL = 'https://yourdomain.com'
