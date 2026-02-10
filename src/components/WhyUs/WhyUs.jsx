import { useEffect, useRef, useState } from 'react'
import './WhyUs.css'

const reasons = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: 'Precisión Milimétrica',
    description: 'Tecnología de última generación que garantiza tolerancias de hasta ±0.1mm en cada pieza.'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: 'Entregas Rápidas',
    description: 'Producción 24/7 y procesos optimizados para cumplir con los plazos más exigentes.'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Atención Personalizada',
    description: 'Cada proyecto recibe asesoría experta desde el diseño hasta el acabado final.'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
      </svg>
    ),
    title: 'Tecnología de Punta',
    description: 'Impresoras industriales de última generación y materiales certificados premium.'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'Acabados Profesionales',
    description: 'Post-procesado especializado para resultados de calidad industrial.'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54M7 3.34V5a3 3 0 0 0 3 3v0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2v0a2 2 0 0 0 2-2v0c0-1.1.9-2 2-2h3.17M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"/>
        <circle cx="12" cy="12" r="10"/>
      </svg>
    ),
    title: 'Compromiso Ambiental',
    description: 'Uso de materiales biodegradables y procesos sostenibles.'
  }
]

function WhyUs() {
  const sectionRef = useRef(null)
  const [parallaxY, setParallaxY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector('.whyus')
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

    const elements = sectionRef.current.querySelectorAll('.reason-card')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="why-us section" id="por-que" ref={sectionRef}>
      <div className="container">
        <div className="why-us-header">
          <h2 className="section-title">¿Por qué elegir jafetFC?</h2>
          <p className="section-subtitle">
            Excelencia en cada detalle, compromiso en cada proyecto
          </p>
        </div>
        
        <div className="reasons-grid" style={{ transform: `translateY(${parallaxY}px)` }}>
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="reason-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="reason-icon">{reason.icon}</div>
              <h3 className="reason-title">{reason.title}</h3>
              <p className="reason-description">{reason.description}</p>
            </div>
          ))}
        </div>
        
        <div className="why-us-cta">
          <h3>¿Listo para comenzar tu proyecto?</h3>
          <p>Únete a cientos de clientes satisfechos que confían en nuestra experiencia</p>
          <a href="#contacto" className="btn-cta">Iniciar proyecto</a>
        </div>
      </div>
    </section>
  )
}

export default WhyUs
