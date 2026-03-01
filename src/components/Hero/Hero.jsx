import { useRef, useEffect, useState, Suspense, lazy } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
} from "@react-three/drei";
import "./Hero.css";

// Lazy load the 3D printer component
const Printer3DLazy = lazy(() => import("./Printer3DLazy"));

// Simplified 3D printer for faster loading
function SimplePrinter3D() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Simplified version for fallback */}
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[3, 0.3, 3]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#00d4ff" />
      </mesh>
    </group>
  );
}

// Loading fallback
function CanvasLoader() {
  return (
    <div className="canvas-loader">
      <div className="loader-content">
        <div className="loader-spinner"></div>
        <p>Cargando modelo 3D...</p>
      </div>
    </div>
  );
}
function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.5;
  const opacity = Math.max(1 - scrollY / 500, 0);

  return (
    <section className="hero" id="inicio">
      <div
        className="hero-background"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <Canvas
          performance={{ min: 0.8, max: 1.0 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
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
          <pointLight
            position={[-10, -10, -5]}
            intensity={0.5}
            color="#00d4ff"
          />
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={1}
            intensity={1}
            color="#ff6b35"
          />

          <Suspense fallback={<SimplePrinter3D />}>
            <Printer3DLazy />
          </Suspense>

          <Environment preset="city" />
        </Canvas>
      </div>

      <div className="hero-content container">
        <div
          className="hero-text"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            opacity: opacity,
          }}
        >
          <h1 className="hero-title fade-in-up">
            fluxprint<span className="highlight">3D</span>
          </h1>
          <p
            className="hero-slogan fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Impresión 3D profesional para ideas sin límites
          </p>
          <div
            className="hero-cta fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
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
  );
}

export default Hero;
