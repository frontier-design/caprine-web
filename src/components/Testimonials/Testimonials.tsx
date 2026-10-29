import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { testimonialColumns } from '../../data/testimonials'
import Contour from '../Contour/Contour'
import SectionLabel from '../SectionLabel/SectionLabel'
import TestimonialCard from '../TestimonialCard/TestimonialCard'
import './Testimonials.css'

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

        viewport.addEventListener('mouseenter', slow)
        viewport.addEventListener('mouseleave', resume)
        viewport.addEventListener('focusin', slow)
        viewport.addEventListener('focusout', resume)

        return () => {
          trigger.kill()
          viewport.classList.remove('is-animated')
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
