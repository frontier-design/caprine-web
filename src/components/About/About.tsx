import Contour from '../Contour/Contour'
import SectionLabel from '../SectionLabel/SectionLabel'
import './About.css'

function About() {
  return (
    <section className="about grid" id="about" data-nav-theme="dark" aria-labelledby="about-label">
      <Contour className="about__contour" duration={1.9} />
      <SectionLabel className="about__label" tone="light">
        <span id="about-label">About</span>
      </SectionLabel>
      <div className="about__body highlight-paragraph">
        <p>
          We believe innovative, scalable, and enduring companies take time, commitment, and resilience. We
          partner with founders, build teams, design ecosystems, and scale go-to-market. We help businesses
          navigate complexity, unlock new opportunities, and accelerate growth.
        </p>
        <p>
          Backed by decades of experience building and exiting successful companies, we provide access to
          global partners, talent, and strategic resources.
        </p>
      </div>
      <p className="about__statement sub-title">
        <span className="about__line">We build for meaningful, lasting value.</span>{' '}
        <span className="about__line">With Caprine, we summit together.</span>
      </p>
    </section>
  )
}

export default About
