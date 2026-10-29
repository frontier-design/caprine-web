import { useRef } from 'react'
import { EASE_OUT, gsap, useGSAP } from '../../lib/gsap'
import Logo from '../Logo/Logo'
import './Loader.css'

type LoaderProps = {
  onSettle: () => void
  onComplete: () => void
}

const LOGO_ANGLE = -14.88
const TURBO_SLANT = -32
const TURBO_SHIFT = -0.12
const BASELINE = 0.6435
const START_MARK_OFFSET = -0.58
const START_GOAT_SCALE = 0.62
const START_LINE_DEPTH = 0.82
const HEADER_LINE_RATIO = 36 / 28

const HIDDEN_BELOW = 'inset(160% -20% -80% -20%)'
const SHOWN = 'inset(-40% -20% -80% -20%)'

function Loader({ onSettle, onComplete }: LoaderProps) {
  const veilRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const root = document.documentElement
    const stage = stageRef.current
    const veil = veilRef.current
    const headerLine = document.querySelector<HTMLElement>('.header__line')
    const headerLogo = document.querySelector<HTMLElement>('.header__logo')
    const headerMenu = document.querySelector<HTMLElement>('.navbar__menu')
    const introLine = document.querySelector<HTMLElement>('.home__line')
    if (!stage || !veil || !headerLine || !headerLogo || !headerMenu || !introLine) return

    const finish = () => {
      root.classList.remove('is-loading')
      onComplete()
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onSettle()
      finish()
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    root.classList.add('is-loading')

    const q = gsap.utils.selector(stage)
    const logos = q('.logo')
    const logo = logos[0] as HTMLElement
    const inkLayer = q('.loader-stage__layer--ink')
    const lightLayer = q('.loader-stage__layer--light')
    const goat = q('.logo__goat')
    const mark = q('.logo__mark')
    const rotor = q('.logo__rotor')
    const straight = q('.logo__word--straight')
    const turbo = q('.logo__word--turbo')
    const tagline = q('.logo__tagline')
    const heroItems = gsap.utils.toArray<HTMLElement>('.hero__content > *')

    const em = parseFloat(getComputedStyle(logo).fontSize)
    const from = logo.getBoundingClientRect()
    const target = headerLogo.querySelector('.logo')?.getBoundingClientRect() ?? from
    const scale = target.width / from.width
    const dx = target.left - from.left
    const dy = target.top - from.top
    const lineX = target.left + target.width / 2
    const headerEm = parseFloat(getComputedStyle(headerLogo).fontSize)
    const lineY = target.top + HEADER_LINE_RATIO * headerEm

    const flight = { progress: 0 }
    const place = () => {
      const p = flight.progress
      const s = 1 + (scale - 1) * p
      const depth = (START_LINE_DEPTH + (HEADER_LINE_RATIO - START_LINE_DEPTH) * p) * em
      gsap.set(logos, { x: dx * p, y: dy * p, scale: s })
      gsap.set(mark, { y: START_MARK_OFFSET * em * (1 - p) })
      gsap.set(goat, { scale: START_GOAT_SCALE + (1 - START_GOAT_SCALE) * p })
      introLine.style.translate = `${from.left + dx * p + (s * from.width) / 2 - lineX}px 0`
      headerLine.style.translate = `0 ${from.top + dy * p + s * depth - lineY}px`
    }

    gsap.set([headerLogo, headerMenu], { autoAlpha: 0 })
    gsap.set(heroItems, { y: 40, clipPath: 'inset(0% 0% 100% 0%)' })
    gsap.set(headerMenu, { clipPath: 'inset(0% 0% 100% 0%)' })
    gsap.set(logos, { transformOrigin: '0 0' })
    gsap.set(rotor, { rotation: 0 })
    gsap.set(straight, { opacity: 1, transformOrigin: `50% ${BASELINE * em}px` })
    gsap.set(turbo, { opacity: 0 })
    gsap.set(goat, { clipPath: 'inset(100% 0% 0% 0%)', y: 0.3 * em })
    gsap.set(straight, { clipPath: HIDDEN_BELOW, yPercent: 60 })
    gsap.set(tagline, { clipPath: HIDDEN_BELOW, y: 0.15 * em })
    const wipe = { progress: 0 }
    const cut = () => {
      const covered = `${wipe.progress * 100}%`
      const revealed = `${(1 - wipe.progress) * 100}%`
      gsap.set([veil, inkLayer], { clipPath: `inset(0% 0% ${covered} 0%)` })
      gsap.set(lightLayer, { clipPath: `inset(${revealed} 0% 0% 0%)` })
    }

    cut()
    place()

    const tl = gsap.timeline({ paused: true, delay: 0.15, onComplete: finish })

    tl.to(goat, { clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: 1, ease: EASE_OUT })
      .to(straight, { clipPath: SHOWN, yPercent: 0, duration: 1, ease: EASE_OUT }, '<0.08')
      .to(tagline, { clipPath: SHOWN, y: 0, duration: 0.9, ease: EASE_OUT }, '<0.12')
      .addLabel('tilt', '-=0.3')
      .to(rotor, { rotation: LOGO_ANGLE, duration: 1.35, ease: EASE_OUT }, 'tilt')
      .to(straight, { skewX: TURBO_SLANT, x: TURBO_SHIFT * em, duration: 1.35, ease: EASE_OUT }, 'tilt')
      .to(wipe, { progress: 1, duration: 1.3, ease: EASE_OUT, onUpdate: cut }, 'tilt+=0.05')
      .addLabel('flight', 'tilt+=1')
      .to(flight, { progress: 1, duration: 1.7, ease: EASE_OUT, onUpdate: place }, 'flight')
      .to(tagline, { clipPath: 'inset(-40% -20% 160% -20%)', y: -0.1 * em, duration: 0.6, ease: EASE_OUT }, 'flight')
      .set(straight, { opacity: 0 }, 'flight+=0.4')
      .set(turbo, { opacity: 1 }, 'flight+=0.4')
      .addLabel('reveal', 'flight+=0.9')
      .to(heroItems, { y: 0, clipPath: 'inset(-20% -5% -20% -5%)', duration: 1.1, ease: EASE_OUT, stagger: 0.07 }, 'reveal')
      .set(headerMenu, { autoAlpha: 1 }, 'reveal')
      .to(headerMenu, { clipPath: 'inset(-20% -20% -20% -20%)', duration: 0.9, ease: EASE_OUT }, 'reveal')
      .set(headerLogo, { autoAlpha: 1 }, 'flight+=1.7')
      .call(onSettle, undefined, 'flight+=1.7')
      .set(stage, { autoAlpha: 0 }, 'flight+=1.7')

    let cancelled = false
    document.fonts.ready.then(() => {
      if (!cancelled) tl.play()
    })

    return () => {
      cancelled = true
      tl.kill()
      root.classList.remove('is-loading')
      introLine.style.removeProperty('translate')
      headerLine.style.removeProperty('translate')
      gsap.set([headerLogo, headerMenu], { clearProps: 'opacity,visibility,clipPath' })
      gsap.set(heroItems, { clearProps: 'opacity,visibility,transform,clipPath' })
    }
  })

  return (
    <>
      <div className="loader-veil" ref={veilRef} aria-hidden="true" />
      <div className="loader-stage" ref={stageRef} aria-hidden="true">
        <div className="loader-stage__layer loader-stage__layer--ink">
          <Logo className="loader-stage__logo" withTagline />
        </div>
        <div className="loader-stage__layer loader-stage__layer--light">
          <Logo className="loader-stage__logo" withTagline />
        </div>
      </div>
    </>
  )
}

export default Loader
