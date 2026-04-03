import Cursor from './components/Cursor'
import ParticleCanvas from './components/ParticleCanvas'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Journey from './components/Journey'
import Contact from './components/Contact'
import { Footer, EasterEgg } from './components/Footer'

export default function App() {
  return (
    <>
      {/* Global FX */}
      <div className="scan-lines"/>
      <div className="noise"/>
      <Cursor/>
      <ParticleCanvas/>
      <EasterEgg/>

      {/* Layout */}
      <Navbar/>
      <main>
        <Hero/>
        <About/>
        <Skills/>
        <Projects/>
        <Journey/>
        <Contact/>
      </main>
      <Footer/>
    </>
  )
}
