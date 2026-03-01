import { useEffect, useRef, useState } from 'react'
import './About.css'

function About() {
  const sectionRef = useRef(null)
  const [parallaxY, setParallaxY] = useState(0)

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

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const offset = (rect.top * 0.15)
        setParallaxY(offset)
      }
    }

    const elements = sectionRef.current.querySelectorAll('.animate-on-scroll')
    elements.forEach((el) => observer.observe(el))

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section className="about section" id="nosotros" ref={sectionRef}>
      <div className="container">
        <div className="about-content">
          <div 
            className="about-text animate-on-scroll"
            style={{ transform: `translateY(${parallaxY}px)` }}
          >
            <h2 className="section-title">Quiénes Somos</h2>
            <p className="section-subtitle">
              Transformando ideas en realidad tangible
            </p>
            <div className="about-description">
              <p>
                En <strong>fluxprint3D</strong>, somos pioneros en tecnología de impresión 3D, 
                dedicados a materializar cada idea con precisión milimétrica y acabados 
                profesionales de nivel industrial.
              </p>
              <p>
                Nuestro compromiso con la <span className="highlight-text">innovación</span> y 
                la <span className="highlight-text">calidad</span> nos ha posicionado como 
                referentes en el sector, sirviendo a clientes de diversas industrias que 
                confían en nuestra experiencia y tecnología de punta.
              </p>
              <p>
                Desde prototipos funcionales hasta piezas de producción, cada proyecto 
                recibe atención personalizada y el respaldo de nuestro equipo experto en 
                diseño y fabricación aditiva.
              </p>
            </div>
          </div>
          
          <div 
            className="about-stats animate-on-scroll"
            style={{ transform: `translateY(${parallaxY * 0.7}px)` }}
          >
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Proyectos Completados</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Precisión</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Producción</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">15+</div>
              <div className="stat-label">Materiales</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
