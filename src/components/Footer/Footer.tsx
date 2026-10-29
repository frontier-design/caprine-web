import { useRef } from 'react'
import goat from '../../assets/icons/goat-footer.svg'
import { gsap, useGSAP } from '../../lib/gsap'
import { MOTION_OK, parallax } from '../../lib/parallax'
import GlassButton from '../GlassButton/GlassButton'
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
    <footer ref={footerRef} className="footer grid" id="contact" role="contentinfo" data-nav-theme="light">
      <GlassButton className="footer__email" href="mailto:info@caprine.ca" variant="bare" withDot>
        info@caprine.ca
      </GlassButton>
      <div className="footer__brand" aria-hidden="true" data-nav-theme="dark">
        <img className="footer__goat" src={goat} alt="" width={48} height={50} />
        <p className="footer__wordmark">Caprine</p>
      </div>
    </footer>
  )
}

export default Footer
