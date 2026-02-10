import { useState, useEffect } from 'react'
import './Contact.css'

function Contact() {
  const [parallaxY, setParallaxY] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    file: null
  })

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector('.contact')
      if (!section) return

      const rect = section.getBoundingClientRect()
      const offset = (rect.top * 0.08)
      setParallaxY(offset)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, file: e.target.files[0] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica de envío del formulario
    console.log('Form submitted:', formData)
    alert('¡Gracias por tu interés! Te contactaremos pronto.')
  }

  return (
    <section className="contact section" id="contacto">
      <div className="container">
        <div className="contact-content">
          <div className="contact-info" style={{ transform: `translateY(${parallaxY}px)` }}>
            <h2 className="section-title">Cotiza tu Proyecto</h2>
            <p className="section-subtitle">
              Estamos listos para hacer realidad tus ideas
            </p>
            
            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className="info-text">
                  <h4>Email</h4>
                  <p>contacto@jafetfc.com</p>
                </div>
              </div>
              
              <div className="info-card">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div className="info-text">
                  <h4>Teléfono</h4>
                  <p>+52 123 456 7890</p>
                </div>
              </div>
              
              <div className="info-card">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="info-text">
                  <h4>Ubicación</h4>
                  <p>Ciudad de México, México</p>
                </div>
              </div>
              
              <div className="info-card">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div className="info-text">
                  <h4>Horario</h4>
                  <p>Lun - Vie: 9:00 - 18:00</p>
                </div>
              </div>
            </div>
            
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="contact-form-wrapper" style={{ transform: `translateY(${parallaxY * 0.7}px)` }}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nombre completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tu@email.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+52 123 456 7890"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="service">Servicio de interés</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona un servicio</option>
                  <option value="fdm">Impresión 3D FDM</option>
                  <option value="resina">Impresión en Resina</option>
                  <option value="prototipo">Prototipado Rápido</option>
                  <option value="diseño">Diseño 3D</option>
                  <option value="serie">Producción en Serie</option>
                  <option value="personalizado">Personalización</option>
                </select>
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="message">Descripción del proyecto</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Cuéntanos sobre tu proyecto..."
                ></textarea>
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="file" className="file-label">
                  <span className="file-icon">📎</span>
                  <span>{formData.file ? formData.file.name : 'Adjuntar archivo STL (opcional)'}</span>
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleFileChange}
                  accept=".stl,.obj,.3mf"
                  className="file-input"
                />
              </div>
              
              <button type="submit" className="submit-btn">
                Enviar cotización
                <span className="btn-arrow">→</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
