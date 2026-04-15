import { useState, useEffect, useCallback, useRef } from 'react'
import './Contact.css'

function Contact() {
  const [parallaxY, setParallaxY] = useState(0)
  const lastScrollRef = useRef(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    file: null
  })

  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')
  const [focusedField, setFocusedField] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now()
      if (now - lastScrollRef.current >= 16) {
        lastScrollRef.current = now
        const section = document.querySelector('.contact')
        if (!section) return
        const rect = section.getBoundingClientRect()
        const offset = (rect.top * 0.08)
        setParallaxY(offset)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }))
    }
  }, [formErrors])

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setFormErrors(prev => ({ ...prev, file: 'El archivo no puede ser mayor a 10MB' }))
        return
      }
      const allowedTypes = ['.stl', '.obj', '.3mf', '.ply', '.x3d']
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase()
      if (!allowedTypes.includes(fileExtension)) {
        setFormErrors(prev => ({ ...prev, file: 'Formato de archivo no válido' }))
        return
      }
    }
    setFormData(prev => ({ ...prev, file }))
    if (formErrors.file) {
      setFormErrors(prev => ({ ...prev, file: '' }))
    }
  }, [formErrors])

  const validateForm = () => {
    const errors = {}

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'El nombre es requerido'
    } else if (formData.name.trim().length < 2) {
      errors.name = 'El nombre debe tener al menos 2 caracteres'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      errors.email = 'El email es requerido'
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Ingresa un email válido'
    }

    // Phone validation (optional but if provided should be valid)
    if (formData.phone.trim()) {
      const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/
      if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
        errors.phone = 'Ingresa un teléfono válido'
      }
    }

    // Service validation
    if (!formData.service) {
      errors.service = 'Selecciona un servicio'
    }

    // Message validation
    if (!formData.message.trim()) {
      errors.message = 'La descripción del proyecto es requerida'
    } else if (formData.message.trim().length < 10) {
      errors.message = 'La descripción debe tener al menos 10 caracteres'
    }

    return errors
  }

  const simulateEmailSend = async (formData) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Simulate random success/failure (90% success rate)
    if (Math.random() > 0.1) {
      return { success: true, message: 'Cotización enviada exitosamente' }
    } else {
      throw new Error('Error del servidor. Por favor intenta nuevamente.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('')

    try {
      // Simulate sending email
      await simulateEmailSend(formData)
      
      setSubmitStatus('success')
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          file: null
        })
        setSubmitStatus('')
      }, 3000)

    } catch (error) {
      setSubmitStatus('error')
      console.error('Error sending form:', error)
    } finally {
      setIsSubmitting(false)
    }
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
                  <p>contacto@fluxprint3d.com</p>
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
                  <p>+52 (55) 1234-5678</p>
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
                  <p>Benito Juárez, CDMX, México</p>
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
                  <p>Lun - Vie: 9:00 - 19:00<br/>Sáb: 10:00 - 15:00</p>
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
            {submitStatus === 'success' && (
              <div className="submit-feedback success">
                ✅ ¡Gracias! Hemos recibido tu cotización. Te contactaremos pronto.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="submit-feedback error">
                ❌ Hubo un error al enviar tu cotización. Por favor intenta nuevamente.
              </div>
            )}
            
            <form className="contact-form" onSubmit={handleSubmit} aria-label="Formulario de contacto">
              <div className="form-group">
                <label htmlFor="name">Nombre completo *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                  aria-required="true"
                  aria-describedby={formErrors.name ? 'name-error' : undefined}
                  placeholder="Tu nombre"
                  className={formErrors.name ? 'error' : ''}
                />
                {formErrors.name && <span id="name-error" className="error-text" role="alert">{formErrors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  aria-required="true"
                  aria-describedby={formErrors.email ? 'email-error' : undefined}
                  placeholder="tu@email.com"
                  className={formErrors.email ? 'error' : ''}
                />
                {formErrors.email && <span id="email-error" className="error-text" role="alert">{formErrors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  aria-describedby={formErrors.phone ? 'phone-error' : undefined}
                  placeholder="+52 (55) 1234-5678"
                  className={formErrors.phone ? 'error' : ''}
                />
                {formErrors.phone && <span id="phone-error" className="error-text" role="alert">{formErrors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="service">Servicio de interés *</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-describedby={formErrors.service ? 'service-error' : undefined}
                  className={formErrors.service ? 'error' : ''}
                >
                  <option value="">Selecciona un servicio</option>
                  <option value="fdm">Impresión 3D FDM</option>
                  <option value="resina">Impresión en Resina SLA</option>
                  <option value="prototipo">Prototipado Rápido</option>
                  <option value="diseño">Diseño 3D Personalizado</option>
                  <option value="serie">Producción en Serie</option>
                  <option value="personalizado">Proyecto Personalizado</option>
                </select>
                {formErrors.service && <span id="service-error" className="error-text" role="alert">{formErrors.service}</span>}
              </div>

              <div className="form-group full-width">
                <label htmlFor="message">Descripción del proyecto *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  aria-required="true"
                  aria-describedby={formErrors.message ? 'message-error' : 'message-hint'}
                  rows="4"
                  placeholder="Describe tu proyecto: dimensiones, materiales preferidos, cantidad, plazo de entrega, etc."
                  className={formErrors.message ? 'error' : ''}
                ></textarea>
                {formErrors.message ? (
                  <span id="message-error" className="error-text" role="alert">{formErrors.message}</span>
                ) : (
                  <small id="message-hint" className="form-help">Mínimo 10 caracteres</small>
                )}
              </div>

              <div className="form-group full-width">
                <label htmlFor="file" className="file-label">
                  <span className="file-icon">📎</span>
                  <span>{formData.file ? formData.file.name : 'Adjuntar archivo 3D (opcional)'}</span>
                  <small>STL, OBJ, 3MF, PLY, X3D - Máx. 10MB</small>
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleFileChange}
                  accept=".stl,.obj,.3mf,.ply,.x3d"
                  aria-describedby={formErrors.file ? 'file-error' : undefined}
                  className="file-input"
                />
                {formErrors.file && <span id="file-error" className="error-text" role="alert">{formErrors.file}</span>}
              </div>

              <button
                type="submit"
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner" aria-hidden="true"></span>
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar cotización
                    <span className="btn-arrow" aria-hidden="true">→</span>
                  </>
                )}
              </button>
              
              <p className="form-privacy">
                * Campos requeridos. Tu información está protegida y solo será usada para contactarte sobre tu proyecto.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
