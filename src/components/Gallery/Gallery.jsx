import { useEffect, useRef, useState } from 'react'
import './Gallery.css'

const ImageWithLoader = ({ src, alt, projectColor }) => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className="image-container">
      {!loaded && !error && (
        <div className="image-loader" style={{ '--loader-color': projectColor }}>
          <div className="loader-spinner"></div>
        </div>
      )}
      {error && (
        <div className="image-error">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        </div>
      )}
      <img 
        src={src} 
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </div>
  )
}

const projects = [
  { 
    title: 'Figura de Acción Personalizada', 
    category: 'Gaming', 
    color: '#00d4ff',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80'
  },
  { 
    title: 'Maqueta Arquitectónica', 
    category: 'Arquitectura', 
    color: '#ff6b35',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80'
  },
  { 
    title: 'Modelo Anatómico', 
    category: 'Médico', 
    color: '#39ff14',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80'
  },
  { 
    title: 'Prop de Cosplay', 
    category: 'Gaming', 
    color: '#a855f7',
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&q=80'
  },
  { 
    title: 'Prototipo Industrial', 
    category: 'Ingeniería', 
    color: '#fbbf24',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80'
  },
  { 
    title: 'Pieza de Reemplazo', 
    category: 'General', 
    color: '#ec4899',
    image: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=600&q=80'
  },
  { 
    title: 'Objeto Decorativo', 
    category: 'Arte', 
    color: '#14b8a6',
    image: 'https://images.unsplash.com/photo-1619641805634-4c0d8e04423e?w=600&q=80'
  },
  { 
    title: 'Herramienta Customizada', 
    category: 'Industrial', 
    color: '#8b5cf6',
    image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=600&q=80'
  }
]

function Gallery() {
  const sectionRef = useRef(null)
  const [filter, setFilter] = useState('Todos')
  
  const categories = ['Todos', ...new Set(projects.map(p => p.category))]
  
  const filteredProjects = filter === 'Todos' 
    ? projects 
    : projects.filter(p => p.category === filter)

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

    const elements = sectionRef.current.querySelectorAll('.project-card')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [filteredProjects])

  return (
    <section className="gallery section" id="galeria" ref={sectionRef}>
      <div className="container">
        <div className="gallery-header">
          <h2 className="section-title">Galería de Proyectos</h2>
          <p className="section-subtitle">
            Algunos de nuestros trabajos más destacados
          </p>
        </div>
        
        <div className="gallery-filters">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div 
              key={index} 
              className="project-card"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                '--project-color': project.color 
              }}
            >
              <div className="project-image">
                <ImageWithLoader 
                  src={project.image} 
                  alt={project.title}
                  projectColor={project.color}
                />
                <div className="project-overlay">
                  <div className="project-info">
                    <h3 className="project-title">{project.title}</h3>
                    <span className="project-category">{project.category}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
