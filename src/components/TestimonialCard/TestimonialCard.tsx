import { useLayoutEffect, useRef, useState } from 'react'
import type { Testimonial } from '../../data/testimonials'
import { EASE_OUT, gsap } from '../../lib/gsap'
import './TestimonialCard.css'

type TestimonialCardProps = {
  testimonial: Testimonial
  isClone?: boolean
}

const WORD_LIMIT = 45

function TestimonialCard({ testimonial, isClone = false }: TestimonialCardProps) {
  const { firstName, lastName, role, company, quote } = testimonial
  const cardRef = useRef<HTMLLIElement>(null)
  const startHeightRef = useRef<number | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const words = quote.split(' ')
  const isLong = words.length > WORD_LIMIT
  const lead = isLong ? words.slice(0, WORD_LIMIT).join(' ').replace(/[,;:.—–-]+$/, '') : quote
  const rest = isLong ? ` ${words.slice(WORD_LIMIT).join(' ')}` : ''

  useLayoutEffect(() => {
    const card = cardRef.current
    const from = startHeightRef.current
    if (!card || from === null) return
    startHeightRef.current = null
    gsap.fromTo(
      card,
      { height: from },
      { height: card.offsetHeight, duration: 0.6, ease: EASE_OUT, clearProps: 'height', overwrite: true },
    )
  }, [isExpanded])

  const toggle = () => {
    startHeightRef.current = cardRef.current?.offsetHeight ?? null
    setIsExpanded((expanded) => !expanded)
  }

  return (
    <li
      ref={cardRef}
      className={`testimonial-card ${isClone ? 'testimonial-card--clone' : ''} ${isExpanded ? 'is-expanded' : ''}`}
      aria-hidden={isClone || undefined}
    >
      <figure className="testimonial-card__figure">
        <figcaption className="testimonial-card__author">
          <span className="testimonial-card__name sub-title">
            {firstName}
            <br />
            {lastName}
          </span>
          <span className="testimonial-card__role paragraph">
            {role} at <span className="testimonial-card__company">{company}</span>
          </span>
        </figcaption>
        <blockquote className="testimonial-card__quote paragraph">
          <p>
            {lead}
            {isLong && (
              <>
                <span className="testimonial-card__ellipsis" aria-hidden="true">
                  …
                </span>
                <span className="testimonial-card__rest">{rest}</span>
              </>
            )}
          </p>
        </blockquote>
        {isLong && !isClone && (
          <button className="testimonial-card__toggle paragraph" type="button" aria-expanded={isExpanded} onClick={toggle}>
            {isExpanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </figure>
    </li>
  )
}

export default TestimonialCard
