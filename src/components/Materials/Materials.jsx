import { useEffect, useRef, useState } from 'react'
import './Materials.css'

const materials = [
  { name: 'PLA', description: 'Biodegradable, fácil de imprimir, ideal para prototipos', color: '#00d4ff' },
  { name: 'ABS', description: 'Alta resistencia térmica y mecánica', color: '#ff6b35' },
  { name: 'PETG', description: 'Resistente y transparente, uso alimentario', color: '#39ff14' },
  { name: 'TPU', description: 'Flexible y elástico, alta durabilidad', color: '#a855f7' },
  { name: 'Nylon', description: 'Extrema resistencia y durabilidad', color: '#fbbf24' },
  { name: 'Resina', description: 'Detalles ultra finos, acabado premium', color: '#ec4899' },
  { name: 'ASA', description: 'Resistente a UV, ideal para exterior', color: '#14b8a6' },
  { name: 'PC', description: 'Policarbonato de alta temperatura', color: '#8b5cf6' }
]

function Materials() {
  const sectionRef = useRef(null)
  const [parallaxY, setParallaxY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector('.materials')
      if (!section) return

      const rect = section.getBoundingClientRect()
      const offset = (rect.top * 0.12)
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

    const elements = sectionRef.current.querySelectorAll('.material-card')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="materials section" id="materiales" ref={sectionRef}>
      <div className="container">
        <div className="materials-header">
          <h2 className="section-title">Materiales y Tecnología</h2>
          <p className="section-subtitle">
            Amplia gama de materiales para cada aplicación
          </p>
        </div>
        
        <div className="materials-grid" style={{ transform: `translateY(${parallaxY}px)` }}>
          {materials.map((material, index) => (
            <div 
              key={index} 
              className="material-card"
              style={{ 
                animationDelay: `${index * 0.08}s`,
                '--material-color': material.color 
              }}
            >
              <div className="material-badge">
                <div className="material-color" style={{ background: material.color }}></div>
              </div>
              <h3 className="material-name">{material.name}</h3>
              <p className="material-description">{material.description}</p>
            </div>
          ))}
        </div>
        
        <div className="materials-cta">
          <p>¿No estás seguro qué material elegir?</p>
          <a href="#contacto" className="btn-material">Consulta con nuestros expertos</a>
        </div>
      </div>
    </section>
  )
}

export default Materials
