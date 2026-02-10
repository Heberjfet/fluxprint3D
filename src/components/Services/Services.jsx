import { useEffect, useRef, useState } from 'react'
import './Services.css'

const services = [
  {
    title: 'Impresión 3D FDM',
    description: 'Tecnología de modelado por deposición fundida para piezas resistentes y funcionales.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    features: ['Alta resistencia', 'Múltiples materiales', 'Gran volumen']
  },
  {
    title: 'Impresión en Resina',
    description: 'Precisión extrema y acabados de alta calidad para proyectos detallados.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ),
    features: ['Detalles finos', 'Superficie lisa', 'Alta precisión']
  },
  {
    title: 'Prototipado Rápido',
    description: 'De la idea al prototipo en tiempo récord para acelerar tu desarrollo.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    features: ['Entrega rápida', 'Iteraciones ágiles', 'Validación rápida']
  },
  {
    title: 'Diseño 3D',
    description: 'Servicio completo de modelado y optimización para impresión.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
      </svg>
    ),
    features: ['CAD profesional', 'Optimización', 'Renderizado']
  },
  {
    title: 'Producción en Serie',
    description: 'Manufactura de volúmenes medianos con consistencia y calidad.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="3" width="15" height="13"/>
        <path d="M16 8h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/>
        <rect x="6" y="8" width="4" height="4"/>
      </svg>
    ),
    features: ['Escalabilidad', 'Calidad constante', 'Control de lotes']
  },
  {
    title: 'Personalización',
    description: 'Piezas únicas adaptadas a tus necesidades específicas.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
        <line x1="7" y1="7" x2="7.01" y2="7"/>
      </svg>
    ),
    features: ['100% personalizado', 'Sin moldes', 'Diseño único']
  }
]

function Services() {
  const sectionRef = useRef(null)
  const [parallaxY, setParallaxY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector('.services')
      if (!section) return

      const rect = section.getBoundingClientRect()
      const offset = (rect.top * 0.1)
      setParallaxY(offset)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current.querySelectorAll('.service-card')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="services section" id="servicios" ref={sectionRef}>
      <div className="container">
        <div className="services-header">
          <h2 className="section-title">Nuestros Servicios</h2>
          <p className="section-subtitle">
            Soluciones completas de impresión 3D para cada necesidad
          </p>
        </div>
        
        <div className="services-grid" style={{ transform: `translateY(${parallaxY}px)` }}>
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>
                    <span className="check-icon">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
