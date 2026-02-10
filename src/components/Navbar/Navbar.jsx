import { useState, useEffect } from 'react'
import './Navbar.css'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Clientes', href: '#clientes' },
    { name: 'Galería', href: '#galeria' },
    { name: 'Contacto', href: '#contacto' }
  ]

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container container">
        <a href="#inicio" className="navbar-logo">
          jafet<span className="logo-highlight">FC</span>
        </a>
        
        <ul className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link, index) => (
            <li key={index}>
              <a href={link.href} onClick={handleLinkClick}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        
        <a href="#contacto" className="navbar-cta">Cotizar</a>
        
        <button 
          className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
