import { useEffect, useRef, useState } from 'react'
import { EASE_OUT, gsap, ScrollTrigger, SplitText, useGSAP } from '../../lib/gsap'
import About from '../../components/About/About'
import Featured from '../../components/Featured/Featured'
import Footer from '../../components/Footer/Footer'
import Founder from '../../components/Founder/Founder'
import Header from '../../components/Header/Header'
import Loader from '../../components/Loader/Loader'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import Model from '../../components/Model/Model'
import Panorama from '../../components/Panorama/Panorama'
import Testimonials from '../../components/Testimonials/Testimonials'
import './Home.css'

const REVEAL_TARGETS = [
  '.about__label',
  '.about__body p',
  '.about__statement',
  '.featured__info > *',
  '.model__label',
  '.model__heading',
  '.model__step',
  '.testimonials__intro > *',
  '.founder__identity > *',
  '.founder__lead',
  '.founder__bio p',
  '.footer__email',
].join(', ')

const REVEAL_DURATION = 1.1
const REVEAL_STAGGER = 0.08

const SERIF_TARGETS = '.title, .sub-title, .founder__name'
const SLANT = { duration: 0.7, ease: EASE_OUT }
const SLANT_AFTER_REVEAL = 0.45
const ITALIC_SLANT = 16
const SYNT_ASCENT = 0.96
const SYNT_CONTENT = 1.24

const DRIFT_X = 2.5
const DRIFT_Y = 1.5
const DRIFT_FOLLOW = 0.075

function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSettled, setIsSettled] = useState(false)
  const mainRef = useRef<HTMLElement>(null)
  const pointerRef = useRef({ x: 0, y: 0, active: false })

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const targets = gsap.utils.toArray<HTMLElement>(REVEAL_TARGETS)
        const serifs = gsap.utils.toArray<HTMLElement>(SERIF_TARGETS)

        if (isLoading) {
          gsap.set(targets, { y: 40, clipPath: 'inset(0% 0% 100% 0%)' })
          serifs.forEach((serif) => {
            const { fontSize, lineHeight } = getComputedStyle(serif)
            const size = parseFloat(fontSize)
            const baseline = (parseFloat(lineHeight) - SYNT_CONTENT * size) / 2 + SYNT_ASCENT * size
            const { words } = SplitText.create(serif, { type: 'words', wordsClass: 'serif-word', aria: 'none' })
            gsap.set(words, { skewX: ITALIC_SLANT, transformOrigin: `50% ${baseline}px` })
          })
          return
        }

        ScrollTrigger.batch(targets, {
          start: 'top 90%',
          once: true,
          onEnter: (batch) => {
            const sequence = gsap.timeline()
            batch.forEach((element, index) => {
              const start = index * REVEAL_STAGGER
              sequence.to(
                element,
                {
                  y: 0,
                  clipPath: 'inset(-20% -5% -20% -5%)',
                  duration: REVEAL_DURATION,
                  ease: EASE_OUT,
                  clearProps: 'clipPath,transform',
                },
                start,
              )
              const words = element.querySelectorAll('.serif-word')
              if (words.length) sequence.to(words, { skewX: 0, ...SLANT }, start + SLANT_AFTER_REVEAL)
            })
          },
        })
      })

      return () => mm.revert()
    },
    { scope: mainRef, dependencies: [isLoading] },
  )

  useGSAP(
    () => {
      if (!isSettled) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>(SERIF_TARGETS).forEach((serif) => {
          if (serif.closest(REVEAL_TARGETS)) return
          ScrollTrigger.create({
            trigger: serif.closest('.testimonials__window') ?? serif,
            start: 'top 92%',
            once: true,
            onEnter: () =>
              gsap.to(serif.querySelectorAll('.serif-word'), { skewX: 0, ...SLANT }),
          })
        })
      })

      return () => mm.revert()
    },
    { scope: mainRef, dependencies: [isSettled] },
  )

  useEffect(() => {
    if (!isLoading) document.fonts.ready.then(() => ScrollTrigger.refresh())
  }, [isLoading])

  useEffect(() => {
    const track = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY, active: true }
    }
    const release = () => {
      pointerRef.current = { ...pointerRef.current, active: false }
    }
    window.addEventListener('pointermove', track)
    document.documentElement.addEventListener('pointerleave', release)
    return () => {
      window.removeEventListener('pointermove', track)
      document.documentElement.removeEventListener('pointerleave', release)
    }
  }, [])

  useGSAP(
    () => {
      if (!isSettled) return

      const mm = gsap.matchMedia()

      mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        const hero = document.querySelector<HTMLElement>('.hero')
        const logo = document.querySelector<HTMLElement>('.header__logo')
        const headerLine = document.querySelector<HTMLElement>('.header__line')
        const introLine = document.querySelector<HTMLElement>('.home__line')
        if (!hero || !logo || !headerLine || !introLine) return

        const root = document.documentElement
        const target = { x: 0, y: 0 }
        const lag = { x: 0, y: 0 }
        const drift = { x: 0, y: 0 }

        const aim = () => {
          const { x, y, active } = pointerRef.current
          const rect = hero.getBoundingClientRect()
          const inside = active && x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
          const rem = parseFloat(getComputedStyle(root).fontSize)
          target.x = inside ? ((x - rect.left) / rect.width - 0.5) * DRIFT_X * rem : 0
          target.y = inside ? ((y - rect.top) / rect.height - 0.5) * DRIFT_Y * rem : 0
        }

        const step = (_time: number, deltaTime: number) => {
          const k = 1 - Math.pow(1 - DRIFT_FOLLOW, deltaTime / (1000 / 60))
          lag.x += (target.x - lag.x) * k
          lag.y += (target.y - lag.y) * k
          const nextX = drift.x + (lag.x - drift.x) * k
          const nextY = drift.y + (lag.y - drift.y) * k
          if (Math.abs(nextX - drift.x) < 0.005 && Math.abs(nextY - drift.y) < 0.005) return
          drift.x = nextX
          drift.y = nextY
          logo.style.transform = `translate3d(${drift.x.toFixed(2)}px, ${drift.y.toFixed(2)}px, 0)`
          headerLine.style.transform = `translate3d(0, ${drift.y.toFixed(2)}px, 0)`
          introLine.style.transform = `translate3d(${drift.x.toFixed(2)}px, 0, 0)`
        }

        aim()
        gsap.ticker.add(step)
        window.addEventListener('pointermove', aim)
        root.addEventListener('pointerleave', aim)
        window.addEventListener('scroll', aim, { passive: true })
        window.addEventListener('resize', aim)

        return () => {
          gsap.ticker.remove(step)
          window.removeEventListener('pointermove', aim)
          root.removeEventListener('pointerleave', aim)
          window.removeEventListener('scroll', aim)
          window.removeEventListener('resize', aim)
          ;[logo, headerLine, introLine].forEach((element) => element.style.removeProperty('transform'))
        }
      })

      return () => mm.revert()
    },
    { dependencies: [isSettled] },
  )

  return (
    <>
      {isLoading && <Loader onSettle={() => setIsSettled(true)} onComplete={() => setIsLoading(false)} />}
      <Header />
      <Navbar isEnabled={isSettled} />
      <main className="home" ref={mainRef}>
        <div className="home__intro">
          <span className="home__line" aria-hidden="true" />
          <Hero />
          <About />
          <Featured />
        </div>
        <Model />
        <Testimonials />
        <Panorama />
        <div className="home__closing">
          <Founder />
          <Footer />
        </div>
      </main>
    </>
  )
}

export default Home
