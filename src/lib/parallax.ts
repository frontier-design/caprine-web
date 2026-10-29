import { gsap } from './gsap'

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'

export const MEDIA_DRIFT = 0.07

const unit = () => Math.min(window.innerHeight, window.innerWidth * 0.7)

export const depth = (amount: number) => () => amount * unit()

type ParallaxOptions = {
  trigger: Element
  from: number
  to: number
  start?: string
  end?: string
}

export function parallax(targets: gsap.TweenTarget, { trigger, from, to, start = 'top bottom', end = 'bottom top' }: ParallaxOptions) {
  return gsap.fromTo(
    targets,
    { y: depth(from) },
    {
      y: depth(to),
      ease: 'none',
      scrollTrigger: { trigger, start, end, scrub: 0.6, invalidateOnRefresh: true },
    },
  )
}
