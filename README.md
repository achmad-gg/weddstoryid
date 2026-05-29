# Weddstory ID - Wedding Photography & Videography Portfolio

Sebuah website portofolio *Single Page Application* (SPA) yang elegan, modern, dan sangat dioptimalkan untuk SEO. Website ini dirancang khusus untuk studio fotografi dan videografi pernikahan **weddstoryid** yang berlokasi di Surabaya & Sidoarjo.

## 🌟 Fitur Utama

*   **Desain Premium & Modern:** Antarmuka pengguna yang memukau dengan nuansa hangat (warm tone), tipografi elegan, dan animasi halus yang memberikan kesan mewah.
*   **SEO Teroptimasi (SEO-Friendly):**
    *   Meta tags dinamis (Title, Description, Keywords).
    *   Open Graph & Twitter Card untuk visualisasi *share* sosial media yang optimal.
    *   Structured Data (JSON-LD) untuk LocalBusiness, Service (Paket Harga), dan FAQPage.
    *   Implementasi Semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`).
    *   Navigasi dan elemen interaktif yang aksesibel (Aria-labels).
    *   Optimasi *Largest Contentful Paint* (LCP) dengan `fetchpriority="high"`.
    *   File `sitemap.xml` dan `robots.txt` yang siap digunakan.
*   **Performa Tinggi:** Dibangun menggunakan React 18 dan Vite dengan konfigurasi *chunk splitting* untuk mempercepat waktu muat halaman.
*   **Formulir Kontak Terintegrasi:** Terhubung langsung dengan **EmailJS** untuk pengiriman pesan tanpa perlu setup *backend*, serta tombol *Call-to-Action* (CTA) langsung ke WhatsApp.
*   **Galeri Interaktif:** Portofolio foto dengan fitur *filter* kategori (Semua, Pre-Wedding, Pernikahan, Resepsi) dan *lightbox* untuk melihat foto resolusi tinggi.
*   **Responsif Sepenuhnya:** Tampilan yang menyesuaikan dengan mulus di berbagai ukuran layar (Desktop, Tablet, dan Mobile).

## 🛠️ Teknologi yang Digunakan

*   **Framework:** [React 18](https://reactjs.org/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Styling:** Vanilla CSS (dengan dukungan variabel CSS untuk konsistensi tema) & TailwindCSS (jika diaktifkan).
*   **Email Service:** [EmailJS](https://www.emailjs.com/) (`@emailjs/browser`)

## 📂 Struktur Proyek

```text
weddstory/
├── public/
│   ├── og-image.jpg         # Gambar preview untuk sosial media (Open Graph)
│   ├── robots.txt           # Aturan akses *crawler* mesin pencari
│   ├── sitemap.xml          # Peta situs untuk mempermudah indeksasi SEO
│   └── ... (ikon & aset statis lainnya)
├── src/
│   ├── assets/              # Gambar dan aset lokal
│   ├── components/
│   │   ├── About.jsx        # Bagian "Tentang Kami" & profil tim
│   │   ├── Contact.jsx      # Formulir kontak & info hubungi kami
│   │   ├── Footer.jsx       # Bagian bawah situs (Hak cipta, navigasi footer)
│   │   ├── Hero.jsx         # Layar utama (Banner, taglines, CTA)
│   │   ├── Navbar.jsx       # Menu navigasi atas
│   │   ├── Packages.jsx     # Daftar paket & harga
│   │   ├── Portfolio.jsx    # Galeri karya & video highlight
│   │   └── SEOHead.jsx      # Komponen injeksi Meta Tags dinamis (Vanilla JS)
│   ├── utils/
│   │   └── seo.js           # Fungsi pembantu & konfigurasi keyword utama SEO
│   ├── App.jsx              # Komponen root yang menyatukan semua *section*
│   ├── index.css            # Gaya global & variabel tema
│   └── main.jsx             # Titik masuk (entry point) React
├── index.html               # File HTML utama dengan pre-configured Meta & JSON-LD
├── vite.config.js           # Konfigurasi Vite (termasuk optimasi chunking)
└── README.md
```

## 🚀 Persiapan & Menjalankan Proyek Lokal

1.  **Kloning repositori:**
    ```bash
    git clone https://github.com/achmad-gg/weddstory.git
    cd weddstory
    ```

2.  **Instalasi dependensi:**
    ```bash
    npm install
    ```

3.  **Konfigurasi EmailJS (Opsional tapi penting untuk Form Kontak):**
    *   Buka file `src/components/Contact.jsx`.
    *   Cari variabel `CONTACT_CONFIG.emailjs` di bagian atas file.
    *   Ganti nilai `serviceId`, `templateId`, dan `publicKey` dengan data dari akun EmailJS Anda.

4.  **Menjalankan *Development Server*:**
    ```bash
    npm run dev
    ```
    Buka peramban (browser) dan akses URL yang ditampilkan (biasanya `http://localhost:5173/` atau `http://localhost:5174/`).

## ⚙️ Persiapan *Deployment* (Produksi)

Sebelum melakukan *deploy* (misalnya ke Vercel, Netlify, atau hosting lainnya), pastikan Anda melakukan hal berikut:

1.  Buka file **`index.html`** dan **`public/sitemap.xml`**.
2.  Cari dan ganti semua teks `https://yourdomain.com` dengan URL domain asli Anda yang akan digunakan.
3.  Jalankan perintah *build*:
    ```bash
    npm run build
    ```
    Folder `dist/` akan dihasilkan dan siap untuk diunggah ke layanan *hosting* Anda.

## 📝 Lisensi

Proyek ini dibuat untuk keperluan portofolio komersial weddstoryid.
