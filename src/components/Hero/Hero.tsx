import Contour from '../Contour/Contour'
import GlassButton from '../GlassButton/GlassButton'
import './Hero.css'

function Hero() {
  return (
    <section className="hero" id="top" data-nav-theme="dark">
      <Contour className="hero__contour hero__contour--top" duration={1.4} />
      <Contour className="hero__contour hero__contour--bottom" duration={2.6} />
      <div className="hero__content">
        <p className="hero__eyebrow caption">Building for meaningful, lasting value</p>
        <h1 className="hero__title title">Caprine is a company builder.</h1>
        <p className="hero__text paragraph">
          We empower resilient founders passionate about addressing global challenges and build companies that
          deliver real outcomes and lasting value.
        </p>
        <GlassButton className="hero__cta" href="#about" variant="faint">
          Learn More
        </GlassButton>
      </div>
    </section>
  )
}

export default Hero
