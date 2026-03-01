import { useState, useEffect, useRef } from 'react'
import './Testimonials.css'

const testimonialsData = [
  {
    id: 1,
    name: "Carlos Mendoza",
    role: "Arquitecto",
    company: "EstudioArq CDMX",
    image: "🏗️",
    rating: 5,
    text: "fluxprint3D transformó la manera en que presentamos nuestros proyectos. Las maquetas arquitectónicas tienen un detalle increíble y los tiempos de entrega son excepcionales.",
    project: "Maqueta residencial premium"
  },
  {
    id: 2,
    name: "Ana García",
    role: "Game Designer",
    company: "PixelStorm Games",
    image: "🎮",
    rating: 5,
    text: "Los props gaming que imprimieron para nuestro stand en la convención fueron un éxito total. La calidad y precisión en cada detalle superaron nuestras expectativas.",
    project: "Props para convención gaming"
  },
  {
    id: 3,
    name: "Dr. Roberto Silva",
    role: "Médico Cirujano",
    company: "Hospital ABC",
    image: "⚕️",
    rating: 5,
    text: "Los modelos anatómicos personalizados nos ayudan enormemente en la planificación quirúrgica. La precisión milimétrica es crucial en nuestro trabajo.",
    project: "Modelos anatómicos educativos"
  },
  {
    id: 4,
    name: "María López",
    role: "Diseñadora de Producto",
    company: "InnovaDesign",
    image: "💡",
    rating: 5,
    text: "El prototipado rápido con fluxprint3D aceleró nuestro proceso de desarrollo. Pudimos iterar múltiples versiones en una semana.",
    project: "Prototipo de producto IoT"
  },
  {
    id: 5,
    name: "Alejandro Ruiz",
    role: "Maker & Inventor",
    company: "Independiente",
    image: "🔧",
    rating: 5,
    text: "Como maker, necesito rapidez y calidad. fluxprint3D me ofrece ambas. Sus materiales especializados han hecho posibles mis proyectos más ambiciosos.",
    project: "Componentes roboticos personalizados"
  }
]

function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length)
    }, 6000) // Change every 6 seconds

    return () => clearInterval(interval)
  }, [])

  const handleDotClick = (index) => {
    setCurrentTestimonial(index)
  }

  const renderStars = (rating) => {
    return '⭐'.repeat(rating)
  }

  return (
    <section className={`testimonials section ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
      <div className="container">
        <div className="testimonials-header">
          <h2 className="section-title">Lo que dicen nuestros clientes</h2>
          <p className="section-subtitle">
            Más de 500 proyectos exitosos respaldan nuestra experiencia
          </p>
        </div>

        <div className="testimonials-content">
          <div className="testimonial-carousel">
            {testimonialsData.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonial-card ${index === currentTestimonial ? 'active' : ''}`}
              >
                <div className="testimonial-header">
                  <div className="client-info">
                    <div className="client-avatar">{testimonial.image}</div>
                    <div className="client-details">
                      <h4 className="client-name">{testimonial.name}</h4>
                      <p className="client-role">{testimonial.role}</p>
                      <p className="client-company">{testimonial.company}</p>
                    </div>
                  </div>
                  <div className="rating">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                
                <blockquote className="testimonial-text">
                  "{testimonial.text}"
                </blockquote>
                
                <div className="project-info">
                  <span className="project-label">Proyecto:</span>
                  <span className="project-name">{testimonial.project}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="testimonial-controls">
            <div className="testimonial-dots">
              {testimonialsData.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Ver testimonio ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Proyectos Completados</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">99.9%</span>
            <span className="stat-label">Precisión Garantizada</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">15+</span>
            <span className="stat-label">Materiales Disponibles</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Producción Continua</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials