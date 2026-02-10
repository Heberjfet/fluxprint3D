import './App.css'
import PageLoader from './components/PageLoader/PageLoader'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Services from './components/Services/Services'
import Clients from './components/Clients/Clients'
import Materials from './components/Materials/Materials'
import Gallery from './components/Gallery/Gallery'
import Process from './components/Process/Process'
import WhyUs from './components/WhyUs/WhyUs'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
      <PageLoader />
      <div className="app">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Clients />
        <Materials />
        <Gallery />
        <Process />
        <WhyUs />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

export default App

