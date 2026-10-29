import { useCallback, useRef, useState } from 'react'
import { EASE_OUT, gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import Goat from '../Goat/Goat'
import Menu from '../Menu/Menu'
import MenuIcon from '../MenuIcon/MenuIcon'
import './Navbar.css'

type NavbarProps = {
  isEnabled: boolean
}

const BLUR_LAYERS = 4
const HIDDEN_BELOW = 'inset(100% -20% -20% -20%)'
const SHOWN = 'inset(-20% -20% -20% -20%)'
const HIDDEN_ABOVE = 'inset(-20% -20% 100% -20%)'

function Navbar({ isEnabled }: NavbarProps) {
  const barRef = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setIsMenuOpen(false), [])
  const isDockedRef = useRef(false)
  const isMenuOpenRef = useRef(false)
  const goatMotionRef = useRef<gsap.core.Timeline | null>(null)
  const isGoatShownRef = useRef(false)

  const revealGoat = (goat: Element) => {
    if (isGoatShownRef.current) return
    isGoatShownRef.current = true
    goatMotionRef.current?.kill()
    goatMotionRef.current = gsap
      .timeline()
      .set(goat, { visibility: 'visible' })
      .fromTo(goat, { clipPath: HIDDEN_BELOW, yPercent: 60 }, { clipPath: SHOWN, yPercent: 0, duration: 0.9, ease: EASE_OUT })
  }

  const concealGoat = (goat: Element) => {
    if (!isGoatShownRef.current) return
    isGoatShownRef.current = false
    goatMotionRef.current?.kill()
    goatMotionRef.current = gsap
      .timeline()
      .to(goat, { clipPath: HIDDEN_ABOVE, yPercent: -40, duration: 0.4, ease: 'power2.in' })
      .set(goat, { visibility: 'hidden' })
  }

  useGSAP(
    () => {
      const bar = barRef.current
      const icons = bar ? Array.from(bar.querySelectorAll<HTMLElement>('.navbar__icon')) : []
      const goat = bar?.querySelector<HTMLElement>('.navbar__goat')
      const blur = bar?.querySelector<HTMLElement>('.navbar__blur')
      const heroLogo = document.querySelector<HTMLElement>('.header__logo')
      if (!isEnabled || !bar || !goat || !blur || !heroLogo || icons.length === 0) return

      const haze = gsap.fromTo(
        blur,
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: { start: 0, end: () => bar.offsetHeight, scrub: true },
        },
      )

      const show = () => {
        isDockedRef.current = true
        if (!isMenuOpenRef.current) revealGoat(goat)
      }
      const hide = () => {
        isDockedRef.current = false
        if (!isMenuOpenRef.current) concealGoat(goat)
      }

      const trigger = ScrollTrigger.create({
        start: () => heroLogo.getBoundingClientRect().bottom + window.scrollY - bar.offsetHeight,
        end: 'max',
        invalidateOnRefresh: true,
        onEnter: show,
        onLeaveBack: hide,
      })
      if (trigger.progress > 0) show()

      const themed = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-theme]'))
      const themeAt = (x: number, y: number) => {
        let theme = 'dark'
        themed.forEach((element) => {
          const { top, bottom, left, right } = element.getBoundingClientRect()
          if (top <= y && bottom >= y && left <= x && right >= x) theme = element.dataset.navTheme ?? theme
        })
        return theme
      }

      let frame = 0
      const tone = () => {
        frame = 0
        icons.forEach((icon) => {
          const { left, top, width, height } = icon.getBoundingClientRect()
          icon.classList.toggle('is-on-light', themeAt(left + width / 2, top + height / 2) === 'light')
        })
      }
      const requestTone = () => {
        if (!frame) frame = requestAnimationFrame(tone)
      }

      tone()
      window.addEventListener('scroll', requestTone, { passive: true })
      window.addEventListener('resize', requestTone)

      return () => {
        trigger.kill()
        haze.scrollTrigger?.kill()
        haze.kill()
        goatMotionRef.current?.kill()
        cancelAnimationFrame(frame)
        window.removeEventListener('scroll', requestTone)
        window.removeEventListener('resize', requestTone)
      }
    },
    { dependencies: [isEnabled], scope: barRef },
  )

  useGSAP(
    () => {
      const goat = barRef.current?.querySelector('.navbar__goat')
      const wasOpen = isMenuOpenRef.current
      isMenuOpenRef.current = isMenuOpen
      if (!goat || wasOpen === isMenuOpen) return
      if (isMenuOpen) {
        revealGoat(goat)
        return
      }
      const settle = gsap.delayedCall(0.9, () => {
        if (!isDockedRef.current && !isMenuOpenRef.current) concealGoat(goat)
      })
      return () => settle.kill()
    },
    { dependencies: [isMenuOpen], scope: barRef },
  )

  return (
    <>
      <Menu isOpen={isMenuOpen} onClose={closeMenu} />
      <div className={`navbar ${isMenuOpen ? 'is-menu-open' : ''}`} ref={barRef}>
        <div className="navbar__blur" aria-hidden="true">
          {Array.from({ length: BLUR_LAYERS }, (_, index) => (
            <span className="navbar__blur-layer" key={index} />
          ))}
        </div>
        <a className="navbar__icon navbar__goat" href="#top" aria-label="Back to top">
          <Goat />
        </a>
        <button
          className="navbar__icon navbar__menu"
          type="button"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="site-menu"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <MenuIcon />
        </button>
      </div>
    </>
  )
}

export default Navbar
