// src/App.jsx
import './index.css'
import SEOHead   from './components/SEOHead'
import Navbar    from './components/Navbar'
import Hero      from './components/Hero'
import Portfolio from './components/Portfolio'
import Packages  from './components/Packages'
import About     from './components/About'
import Contact   from './components/Contact'
import Footer    from './components/Footer'

export default function App() {
  return (
    <>
      {/* Inject meta tags ke <head> secara dinamis */}
      <SEOHead />

      {/* Navbar — wrapped dalam <header> untuk semantik HTML yang benar */}
      <header role="banner">
        <Navbar />
      </header>

      {/* Konten utama halaman */}
      <main id="main-content" role="main">
        <Hero />
        <Portfolio />
        <Packages />
        <About />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}