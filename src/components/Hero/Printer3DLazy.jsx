import { useRef, useState, useEffect, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'

// Loading fallback component
function Printer3DFallback() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#00d4ff" opacity={0.6} transparent />
    </mesh>
  )
}

// Optimized 3D Printer Component with lazy loading
function Printer3D() {
  const meshRef = useRef()
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    // Simulate visibility check - in real app you'd use Intersection Observer
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useFrame((state) => {
    if (meshRef.current && isVisible) {
      meshRef.current.rotation.y += 0.003
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  if (!isVisible) {
    return <Printer3DFallback />
  }

  return (
    <Suspense fallback={<Printer3DFallback />}>
      <group ref={meshRef}>
        {/* Base de la impresora */}
        <mesh position={[0, -1, 0]}>
          <boxGeometry args={[3, 0.3, 3]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Columnas */}
        {[-1.3, 1.3].map((x, i) =>
          [-1.3, 1.3].map((z, j) => (
            <mesh key={`column-${i}-${j}`} position={[x, 0, z]}>
              <cylinderGeometry args={[0.05, 0.05, 2.5, 8]} />
              <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.1} />
            </mesh>
          ))
        )}
        
        {/* Plataforma de impresión */}
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[2.5, 0.1, 2.5]} />
          <meshStandardMaterial 
            color="#00d4ff" 
            metalness={0.5} 
            roughness={0.3} 
            emissive="#00d4ff" 
            emissiveIntensity={0.2} 
          />
        </mesh>
        
        {/* Extrusor */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color="#ff6b35" metalness={0.7} roughness={0.3} />
        </mesh>
        
        {/* Hot end */}
        <mesh position={[0, 0.2, 0]}>
          <coneGeometry args={[0.1, 0.4, 8]} />
          <meshStandardMaterial color="#ff6b35" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Filamento */}
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
          <meshStandardMaterial color="#39ff14" emissive="#39ff14" emissiveIntensity={0.3} />
        </mesh>
        
        {/* Marco superior */}
        <mesh position={[0, 1.2, -1.3]}>
          <boxGeometry args={[2.6, 0.1, 0.1]} />
          <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 1.2, 1.3]}>
          <boxGeometry args={[2.6, 0.1, 0.1]} />
          <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-1.3, 1.2, 0]}>
          <boxGeometry args={[0.1, 0.1, 2.6]} />
          <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[1.3, 1.2, 0]}>
          <boxGeometry args={[0.1, 0.1, 2.6]} />
          <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Objeto siendo impreso */}
        <mesh position={[0, -0.35, 0]}>
          <torusKnotGeometry args={[0.4, 0.15, 32, 8]} />
          <meshStandardMaterial 
            color="#00d4ff" 
            metalness={0.3} 
            roughness={0.7} 
            emissive="#00d4ff" 
            emissiveIntensity={0.1} 
          />
        </mesh>
      </group>
    </Suspense>
  )
}

export default Printer3D