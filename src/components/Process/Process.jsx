import { useEffect, useRef, useState } from 'react'
import './Process.css'

const steps = [
  {
    number: '01',
    title: 'Idea',
    description: 'Comparte tu visión con nosotros. Ya sea un concepto, un boceto o un archivo 3D.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    )
  },
  {
    number: '02',
    title: 'Diseño',
    description: 'Nuestro equipo optimiza o crea el modelo 3D perfecto para impresión.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 19l7-7 3 3-7 7-3-3z"/>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
        <path d="M2 2l7.586 7.586"/>
        <circle cx="11" cy="11" r="2"/>
      </svg>
    )
  },
  {
    number: '03',
    title: 'Impresión',
    description: 'Fabricamos tu pieza con la tecnología y material más adecuado.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="6 9 6 2 18 2 18 9"/>
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
        <rect x="6" y="14" width="12" height="8"/>
      </svg>
    )
  },
  {
    number: '04',
    title: 'Entrega',
    description: 'Recibe tu proyecto con acabados profesionales y en los tiempos acordados.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    )
  }
]

function Process() {
  const sectionRef = useRef(null)
  const [parallaxY, setParallaxY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector('.process')
      if (!section) return

      const rect = section.getBoundingClientRect()
      const offset = (rect.top * 0.08)
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
      { threshold: 0.2 }
    )

    const elements = sectionRef.current.querySelectorAll('.process-step')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="process section" id="proceso" ref={sectionRef}>
      <div className="container">
        <div className="process-header">
          <h2 className="section-title">Nuestro Proceso</h2>
          <p className="section-subtitle">
            De la idea a la realidad en 4 pasos simples
          </p>
        </div>
        
        <div className="process-timeline" style={{ transform: `translateY(${parallaxY}px)` }}>
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="process-step"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="step-number">{step.number}</div>
              <div className="step-content">
                <div className="step-icon">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              {index < steps.length - 1 && <div className="step-connector"></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Process
