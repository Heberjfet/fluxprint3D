import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import './Hero.css'

// Componente 3D de la impresora
function Printer3D() {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={meshRef}>
      {/* Base de la impresora */}
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[3, 0.3, 3]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Columnas */}
      <mesh position={[-1.3, 0, -1.3]}>
        <cylinderGeometry args={[0.05, 0.05, 2.5, 16]} />
        <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[1.3, 0, -1.3]}>
        <cylinderGeometry args={[0.05, 0.05, 2.5, 16]} />
        <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-1.3, 0, 1.3]}>
        <cylinderGeometry args={[0.05, 0.05, 2.5, 16]} />
        <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[1.3, 0, 1.3]}>
        <cylinderGeometry args={[0.05, 0.05, 2.5, 16]} />
        <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Plataforma de impresión */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[2.5, 0.1, 2.5]} />
        <meshStandardMaterial color="#00d4ff" metalness={0.5} roughness={0.3} emissive="#00d4ff" emissiveIntensity={0.2} />
      </mesh>
      
      {/* Extrusor */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#ff6b35" metalness={0.7} roughness={0.2} emissive="#ff6b35" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Marco superior */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[3, 0.2, 3]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Pieza siendo impresa */}
      <mesh position={[0, -0.3, 0]}>
        <coneGeometry args={[0.5, 0.8, 6]} />
        <meshStandardMaterial color="#39ff14" metalness={0.3} roughness={0.4} emissive="#39ff14" emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

function Hero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const parallaxOffset = scrollY * 0.5
  const opacity = Math.max(1 - scrollY / 500, 0)

  return (
    <section className="hero" id="inicio">
      <div className="hero-background" style={{ transform: `translateY(${parallaxOffset}px)` }}>
        <Canvas>
          <PerspectiveCamera makeDefault position={[5, 2, 5]} fov={50} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
          />
          
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00d4ff" />
          <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} color="#ff6b35" />
          
          <Printer3D />
          
          <Environment preset="city" />
        </Canvas>
      </div>
      
      <div className="hero-content container">
        <div 
          className="hero-text"
          style={{ 
            transform: `translateY(${scrollY * 0.3}px)`,
            opacity: opacity
          }}
        >
          <h1 className="hero-title fade-in-up">
            jafet<span className="highlight">FC</span>
          </h1>
          <p className="hero-slogan fade-in-up" style={{ animationDelay: '0.2s' }}>
            Impresión 3D profesional para ideas sin límites
          </p>
          <div className="hero-cta fade-in-up" style={{ animationDelay: '0.4s' }}>
            <a href="#contacto" className="btn-primary">
              Cotizar ahora
            </a>
            <a href="#servicios" className="btn-secondary">
              Nuestros servicios
            </a>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
