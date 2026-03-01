import { useState, useEffect } from 'react'
import './PageLoader.css'

function PageLoader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simular progreso de carga
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 150)

    // Esperar a que la página cargue completamente
    const handleLoad = () => {
      setProgress(100)
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
    }

    return () => {
      clearInterval(interval)
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  if (!loading) return null

  return (
    <div className={`page-loader ${!loading ? 'fade-out' : ''}`}>
      <div className="loader-content">
        <div className="loader-logo">
          <svg viewBox="0 0 100 100" className="logo-svg">
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              className="logo-circle"
              style={{ '--progress': progress }}
            />
            <text x="50" y="58" textAnchor="middle" className="logo-text">
              fluxprint3D
            </text>
          </svg>
        </div>
        <div className="loader-bar">
          <div 
            className="loader-progress" 
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        <p className="loader-percentage">{Math.floor(Math.min(progress, 100))}%</p>
      </div>
    </div>
  )
}

export default PageLoader
