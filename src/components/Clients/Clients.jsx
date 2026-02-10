import { useEffect, useRef } from 'react'
import './Clients.css'

const clientTypes = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
        <polyline points="17 2 12 7 7 2"/>
      </svg>
    ),
    title: 'Gamers',
    description: 'Figuras coleccionables, props de videojuegos, accesorios personalizados y piezas únicas para tu setup.',
    color: '#00d4ff',
    features: ['Figuras personalizadas', 'Props de cosplay', 'Accesorios gaming']
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>
      </svg>
    ),
    title: 'Arquitectura',
    description: 'Maquetas profesionales, prototipos arquitectónicos y modelos a escala con acabados impecables.',
    color: '#ff6b35',
    features: ['Maquetas a escala', 'Prototipos urbanos', 'Modelos conceptuales']
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M17 7H7M17 12H7M17 17H7"/>
        <path d="M12 2a10 10 0 0 0 0 20 10 10 0 0 0 0-20z"/>
      </svg>
    ),
    title: 'Médicos',
    description: 'Modelos anatómicos precisos, herramientas quirúrgicas, prótesis y piezas para educación médica.',
    color: '#39ff14',
    features: ['Modelos anatómicos', 'Instrumental médico', 'Educación médica']
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    title: 'Público General',
    description: 'Regalos personalizados, piezas de reemplazo, proyectos DIY y cualquier idea que quieras materializar.',
    color: '#a855f7',
    features: ['Regalos únicos', 'Reparaciones', 'Proyectos personales']
  }
]

function Clients() {
  const sectionRef = useRef(null)

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

    const elements = sectionRef.current.querySelectorAll('.client-card')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="clients section" id="clientes" ref={sectionRef}>
      <div className="container">
        <div className="clients-header">
          <h2 className="section-title">Para Quién Trabajamos</h2>
          <p className="section-subtitle">
            Soluciones especializadas para cada industria y necesidad
          </p>
        </div>
        
        <div className="clients-grid">
          {clientTypes.map((client, index) => (
            <div 
              key={index} 
              className="client-card"
              style={{ 
                animationDelay: `${index * 0.15}s`,
                '--accent-color': client.color 
              }}
            >
              <div className="client-icon-wrapper">
                <div className="client-icon">{client.icon}</div>
              </div>
              <h3 className="client-title">{client.title}</h3>
              <p className="client-description">{client.description}</p>
              <ul className="client-features">
                {client.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <div className="client-overlay"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Clients
