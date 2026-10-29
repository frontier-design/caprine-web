import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { testimonialColumns } from '../../data/testimonials'
import Contour from '../Contour/Contour'
import SectionLabel from '../SectionLabel/SectionLabel'
import TestimonialCard from '../TestimonialCard/TestimonialCard'
import './Testimonials.css'

const KEY_STEP = 140
const GLIDE_MS = 320

function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const windowRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const viewport = windowRef.current
        if (!viewport) return

        viewport.classList.add('is-animated')

        const tweens = gsap.utils.toArray<HTMLElement>('.testimonials__track').map((track, index) => {
          const upward = index % 2 === 0
          return gsap.fromTo(
            track,
            { yPercent: upward ? 0 : -50 },
            { yPercent: upward ? -50 : 0, duration: 70, ease: 'none', repeat: -1, paused: true },
          )
        })

        const trigger = ScrollTrigger.create({
          trigger: viewport,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => tweens.forEach((tween) => (self.isActive ? tween.play() : tween.pause())),
        })

        const slow = () => gsap.to(tweens, { timeScale: 0, duration: 0.6, ease: 'power2.out', overwrite: true })
        const resume = () => gsap.to(tweens, { timeScale: 1, duration: 0.6, ease: 'power2.in', overwrite: true })

        const tracks = gsap.utils.toArray<HTMLElement>('.testimonials__track')
        const nudge = (index: number, dy: number) => {
          const tween = tweens[index]
          const loop = tracks[index].offsetHeight / 2
          if (!tween || !loop) return
          const direction = index % 2 === 0 ? -1 : 1
          tween.progress(gsap.utils.wrap(0, 1, tween.progress() + (direction * dy) / loop))
        }
        const glide = (index: number, distance: number, duration: number) => {
          const travel = { y: 0 }
          let applied = 0
          return gsap.to(travel, {
            y: distance,
            duration,
            ease: 'power3.out',
            onUpdate: () => {
              nudge(index, travel.y - applied)
              applied = travel.y
            },
          })
        }

        const columns = gsap.utils.toArray<HTMLElement>('.testimonials__column')
        const glides: (gsap.core.Tween | undefined)[] = []
        const detachers = columns.map((column, index) => {
          let dragging = false
          let lastY = 0
          let lastTime = 0
          let velocity = 0

          const onDown = (event: PointerEvent) => {
            if (event.pointerType === 'touch' || event.button !== 0) return
            event.preventDefault()
            dragging = true
            lastY = event.clientY
            lastTime = performance.now()
            velocity = 0
            glides[index]?.kill()
            column.setPointerCapture(event.pointerId)
            viewport.classList.add('is-dragging')
          }
          const onMove = (event: PointerEvent) => {
            if (!dragging) return
            const now = performance.now()
            const dy = event.clientY - lastY
            nudge(index, dy)
            velocity = 0.8 * (dy / Math.max(1, now - lastTime)) + 0.2 * velocity
            lastY = event.clientY
            lastTime = now
          }
          const onUp = (event: PointerEvent) => {
            if (!dragging) return
            dragging = false
            if (column.hasPointerCapture(event.pointerId)) column.releasePointerCapture(event.pointerId)
            viewport.classList.remove('is-dragging')
            if (performance.now() - lastTime > 80) velocity = 0
            if (velocity) glides[index] = glide(index, velocity * GLIDE_MS, Math.min(1.4, 0.5 + Math.abs(velocity) * 0.35))
          }

          column.addEventListener('pointerdown', onDown)
          column.addEventListener('pointermove', onMove)
          column.addEventListener('pointerup', onUp)
          column.addEventListener('pointercancel', onUp)
          return () => {
            column.removeEventListener('pointerdown', onDown)
            column.removeEventListener('pointermove', onMove)
            column.removeEventListener('pointerup', onUp)
            column.removeEventListener('pointercancel', onUp)
          }
        })

        const onKey = (event: KeyboardEvent) => {
          if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
          event.preventDefault()
          const distance = event.key === 'ArrowDown' ? -KEY_STEP : KEY_STEP
          columns.forEach((_, index) => {
            glides[index]?.kill()
            glides[index] = glide(index, distance, 0.6)
          })
        }

        viewport.tabIndex = 0
        viewport.setAttribute('role', 'region')
        viewport.setAttribute('aria-label', 'Testimonials. Drag the columns or use the arrow keys to scroll.')
        viewport.addEventListener('keydown', onKey)
        viewport.addEventListener('mouseenter', slow)
        viewport.addEventListener('mouseleave', resume)
        viewport.addEventListener('focusin', slow)
        viewport.addEventListener('focusout', resume)

        return () => {
          trigger.kill()
          glides.forEach((tween) => tween?.kill())
          detachers.forEach((detach) => detach())
          viewport.removeAttribute('tabindex')
          viewport.removeAttribute('role')
          viewport.removeAttribute('aria-label')
          viewport.removeEventListener('keydown', onKey)
          viewport.classList.remove('is-animated', 'is-dragging')
          viewport.removeEventListener('mouseenter', slow)
          viewport.removeEventListener('mouseleave', resume)
          viewport.removeEventListener('focusin', slow)
          viewport.removeEventListener('focusout', resume)
        }
      })

      return () => mm.revert()
    },
    { scope: sectionRef },
  )

  return (
    <section className="testimonials grid" id="testimonials" data-nav-theme="light" ref={sectionRef} aria-labelledby="testimonials-heading">
      <Contour className="testimonials__contour testimonials__contour--top" duration={1.6} />
      <Contour className="testimonials__contour testimonials__contour--bottom" duration={3} />
      <div className="testimonials__intro">
        <SectionLabel>Testimonials</SectionLabel>
        <h2 className="testimonials__heading sub-title" id="testimonials-heading">
          Those who
          <br />
          climbed with us
        </h2>
      </div>
      <div className="testimonials__window" ref={windowRef}>
        {testimonialColumns.map((column, columnIndex) => (
          <div className="testimonials__column" key={columnIndex}>
            <ul className="testimonials__track">
              {column.map((testimonial) => (
                <TestimonialCard key={testimonial.lastName} testimonial={testimonial} />
              ))}
              {column.map((testimonial) => (
                <TestimonialCard key={`${testimonial.lastName}-clone`} testimonial={testimonial} isClone />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
