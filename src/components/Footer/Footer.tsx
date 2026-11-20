import { useRef } from 'react'
import goat from '../../assets/icons/goat-footer.svg'
import { gsap, useGSAP } from '../../lib/gsap'
import { MOTION_OK, parallax } from '../../lib/parallax'
import SectionLabel from '../SectionLabel/SectionLabel'
import './Footer.css'

function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(`${MOTION_OK} and (min-width: 768px)`, () => {
        const footer = footerRef.current
        const brand = footer?.querySelector('.footer__brand')
        if (!footer || !brand) return
        parallax(brand, { trigger: footer, from: 0.14, to: 0, start: 'top bottom', end: 'bottom bottom' })
      })

      return () => mm.revert()
    },
    { scope: footerRef },
  )

  return (
    <footer ref={footerRef} className="footer grid" id="contact" role="contentinfo" aria-labelledby="contact-label" data-nav-theme="light">
      <SectionLabel className="footer__label" tone="light">
        <span id="contact-label">Contact</span>
      </SectionLabel>
      <p className="footer__text highlight-paragraph">
        We partner with resilient founders building for lasting value, and we are always open to new ideas, ambitious teams, and the next company worth building. Tell us what you are working on at{' '}
        <a className="footer__email" href="mailto:info@caprine.io">
          info@caprine.io
        </a>
      </p>
      <div className="footer__brand" aria-hidden="true" data-nav-theme="dark">
        <img className="footer__goat" src={goat} alt="" width={48} height={50} />
        <p className="footer__wordmark">Caprine</p>
      </div>
    </footer>
  )
}

export default Footer
