import Contour from '../Contour/Contour'
import GlassButton from '../GlassButton/GlassButton'
import './Hero.css'

function Hero() {
  return (
    <section className="hero" id="top" data-nav-theme="dark">
      <Contour className="hero__contour hero__contour--top" duration={1.4} />
      <Contour className="hero__contour hero__contour--bottom" duration={2.6} />
      <div className="hero__content">
        <p className="hero__eyebrow caption">Built, not merely funded</p>
        <h1 className="hero__title title">
          Summits demand
          <br />
          more than capital.
        </h1>
        <p className="hero__text paragraph">
          Caprine is a company builder. We empower resilient founders passionate about addressing global
          challenges and build companies that deliver real outcomes and lasting value.
        </p>
        <GlassButton className="hero__cta" href="#about" variant="faint">
          Learn More
        </GlassButton>
      </div>
    </section>
  )
}

export default Hero
