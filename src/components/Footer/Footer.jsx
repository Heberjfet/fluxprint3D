import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-logo">
              fluxprint<span className="highlight">3D</span>
            </h3>
            <p className="footer-tagline">
              Impresión 3D profesional para ideas sin límites
            </p>
            <div className="footer-social">
              <a href="#" className="social-icon" aria-label="Facebook">📘</a>
              <a href="#" className="social-icon" aria-label="Instagram">📸</a>
              <a href="#" className="social-icon" aria-label="Twitter">🐦</a>
              <a href="#" className="social-icon" aria-label="LinkedIn">💼</a>
              <a href="#" className="social-icon" aria-label="YouTube">📺</a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Servicios</h4>
              <ul>
                <li><a href="#servicios">Impresión 3D FDM</a></li>
                <li><a href="#servicios">Impresión en Resina</a></li>
                <li><a href="#servicios">Prototipado Rápido</a></li>
                <li><a href="#servicios">Diseño 3D</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Empresa</h4>
              <ul>
                <li><a href="#nosotros">Quiénes Somos</a></li>
                <li><a href="#proceso">Proceso</a></li>
                <li><a href="#galeria">Proyectos</a></li>
                <li><a href="#por-que">Por Qué Nosotros</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Contacto</h4>
              <ul>
                <li><a href="#contacto">Cotizar Proyecto</a></li>
                <li><a href="mailto:contacto@fluxprint3d.com">Email</a></li>
                <li><a href="tel:+52551234567890">+52 (55) 1234-5678</a></li>
                <li><a href="#">Ubicación</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Términos de Servicio</a></li>
                <li><a href="#">Política de Privacidad</a></li>
                <li><a href="#">Garantía</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} fluxprint3D. Todos los derechos reservados.
          </p>
          <p className="footer-credits">
            Hecho con 💙 y tecnología 3D
          </p>
        </div>
      </div>
      
      <div className="footer-decoration"></div>
    </footer>
  )
}

export default Footer
