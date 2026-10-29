import { useEffect, useRef } from 'react'
import { EASE_OUT, gsap, useGSAP } from '../../lib/gsap'
import { depth, MEDIA_DRIFT } from '../../lib/parallax'
import Contour from '../Contour/Contour'
import GlassButton from '../GlassButton/GlassButton'
import './Menu.css'

type MenuProps = {
  isOpen: boolean
  onClose: () => void
}

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Our model', href: '#model' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Founder', href: '#founder' },
  { label: 'Contact', href: '#contact' },
]

const ICON_CLOSED = ['M0.199111 7.95203L14.99 1.53089', 'M0.199111 13.4349L14.99 7.01381']
const ICON_OPEN = ['M1.6 1.6L13.6 13.4', 'M1.6 13.4L13.6 1.6']
const HIDDEN_BELOW = 'inset(110% -20% -40% -20%)'
const SHOWN = 'inset(-40% -20% -40% -20%)'
const HIDDEN_ABOVE = 'inset(-40% -20% 110% -20%)'

const scrollTopFor = (href: string, calm: boolean) => {
  const target = document.querySelector<HTMLElement>(href)
  if (!target) return null
  const top = target.getBoundingClientRect().top + window.scrollY

  if (href !== '#portfolio') return top - parseFloat(getComputedStyle(target).scrollMarginTop)

  const drift = calm ? 0 : depth(MEDIA_DRIFT)()
  const travel = window.innerHeight + target.offsetHeight
  const enter = top - window.innerHeight
  return (top + drift + (2 * drift * enter) / travel) / (1 + (2 * drift) / travel)
}

function Menu({ isOpen, onClose }: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const destinationRef = useRef<string | null>(null)
  const hasOpenedRef = useRef(false)

  useGSAP(
    () => {
      const menu = menuRef.current
      if (!menu) return

      const root = document.documentElement
      const page = [document.querySelector('main'), document.querySelector('.header')]
      const trigger = document.querySelector<HTMLElement>('.navbar__menu')
      const iconPaths = Array.from(document.querySelectorAll<SVGPathElement>('.navbar__menu path'))
      const items = gsap.utils.toArray<HTMLElement>('.menu__item', menu)
      const extras = gsap.utils.toArray<HTMLElement>('.menu__reveal', menu)
      const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const setPageInert = (inert: boolean) => page.forEach((element) => element?.toggleAttribute('inert', inert))

      if (isOpen) {
        hasOpenedRef.current = true
        destinationRef.current = null
        root.classList.add('is-menu-open')
        setPageInert(true)

        const open = gsap.timeline({ defaults: { ease: EASE_OUT } })
        open
          .set(menu, { visibility: 'visible' })
          .set(items, { clipPath: HIDDEN_BELOW, yPercent: 70 })
          .set(extras, { clipPath: HIDDEN_BELOW, y: 16 })
          .fromTo(menu, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1 }, 0)
          .to(iconPaths, { attr: { d: (index: number) => ICON_OPEN[index] }, duration: 0.8 }, 0)
          .to(items, { clipPath: SHOWN, yPercent: 0, duration: 1.1, stagger: 0.06 }, 0.3)
          .to(extras, { clipPath: SHOWN, y: 0, duration: 1, stagger: 0.08 }, 0.55)
          .call(() => menu.focus({ preventScroll: true }))

        if (calm) open.progress(1)
        return
      }

      if (!hasOpenedRef.current) {
        gsap.set(menu, { visibility: 'hidden', clipPath: 'inset(0% 0% 100% 0%)' })
        return
      }

      const destination = destinationRef.current
      root.classList.remove('is-menu-open')
      setPageInert(false)
      const top = destination ? scrollTopFor(destination, calm) : null
      if (top !== null) window.scrollTo({ top, behavior: calm ? 'auto' : 'smooth' })

      const close = gsap.timeline({ defaults: { ease: 'power3.inOut' } })
      close
        .to(items, { clipPath: HIDDEN_ABOVE, yPercent: -40, duration: 0.45, stagger: 0.03, ease: 'power2.in' }, 0)
        .to(extras, { clipPath: HIDDEN_ABOVE, y: -10, duration: 0.4, ease: 'power2.in' }, 0)
        .to(iconPaths, { attr: { d: (index: number) => ICON_CLOSED[index] }, duration: 0.7, ease: EASE_OUT }, 0)
        .to(menu, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.85 }, 0.15)
        .set(menu, { visibility: 'hidden' })
        .call(() => {
          if (!destination) trigger?.focus({ preventScroll: true })
        })

      if (calm) close.progress(1)
    },
    { dependencies: [isOpen], scope: menuRef },
  )

  useEffect(() => {
    if (!isOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  const go = (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    destinationRef.current = href
    onClose()
  }

  return (
    <div className="menu" id="site-menu" ref={menuRef} role="dialog" aria-modal="true" aria-label="Site menu" tabIndex={-1}>
      <div className="menu__art" aria-hidden="true">
        <Contour className="menu__contour menu__contour--top" duration={1.8} />
        <Contour className="menu__contour menu__contour--bottom" duration={2.6} />
      </div>

      <div className="menu__body grid">
        <nav className="menu__nav" aria-label="Sections">
          <ol className="menu__list">
            {LINKS.map(({ label, href }, index) => (
              <li className="menu__item" key={href}>
                <a className="menu__link" href={href} onClick={go(href)}>
                  <span className="menu__number caption">{String(index + 1).padStart(2, '0')}</span>
                  <span className="menu__word">
                    <span className="menu__face menu__face--upright">{label}</span>
                    <span className="menu__face menu__face--turbo" aria-hidden="true">
                      {label}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div className="menu__footer grid">
        <GlassButton className="menu__reveal menu__email" href="mailto:info@caprine.ca" variant="bare" withDot>
          info@caprine.ca
        </GlassButton>
      </div>
    </div>
  )
}

export default Menu
