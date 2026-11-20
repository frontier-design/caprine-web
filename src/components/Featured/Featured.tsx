import agoraSky from '../../assets/images/agora-sky.webp'
import agoraGridDashes from '../../assets/images/agora-grid-dashes.svg'
import agoraGridStatic from '../../assets/images/agora-grid-static.svg'
import agoraMountain from '../../assets/images/agora-mountain.webp'
import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { MEDIA_DRIFT, MOTION_OK, parallax } from '../../lib/parallax'
import Contour from '../Contour/Contour'
import SectionLabel from '../SectionLabel/SectionLabel'
import StepPill from '../StepPill/StepPill'
import './Featured.css'

const STEPS = [
  'Identify the Challenge',
  'Partner with Founders',
  'Secure Partnerships (POV)',
  'Scale go-to-market',
  'Resilience Execution',
]

const STEP_DEPTHS = [0.02, 0.045, 0.03, 0.06, 0.04]

function Featured() {
  const mediaRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(`${MOTION_OK} and (min-width: 768px)`, () => {
        const media = mediaRef.current
        const section = media?.closest('.featured')
        const grid = media?.querySelector('.featured__grid')
        if (!media || !section || !grid) return

        parallax(media, { trigger: section, from: MEDIA_DRIFT, to: -MEDIA_DRIFT })
        parallax(grid, { trigger: section, from: -0.025, to: 0.025 })
        gsap.utils.toArray<HTMLElement>('.step-pill', media).forEach((pill, index) => {
          const amount = STEP_DEPTHS[index] ?? 0.04
          parallax(pill, { trigger: section, from: amount, to: -amount })
        })
      })

      return () => mm.revert()
    },
    { scope: mediaRef },
  )

  return (
    <section className="featured grid" id="model" data-nav-theme="light" aria-labelledby="model-heading">
      <Contour className="featured__contour" duration={1.1} />
      <SectionLabel className="featured__label" tone="light">
        Our model
      </SectionLabel>
      <div className="featured__media" data-nav-theme="dark" ref={mediaRef}>
        <div className="featured__frame">
          <img className="featured__layer" src={agoraSky} alt="" loading="lazy" />
          <div className="featured__grid" aria-hidden="true">
            <img className="featured__grid-static" src={agoraGridStatic} alt="" />
            <img className="featured__grid-dashes" src={agoraGridDashes} alt="" />
          </div>
          <img
            className="featured__layer"
            src={agoraMountain}
            alt="Jagged limestone peaks under a clear blue sky"
            loading="lazy"
          />
        </div>
        <ol className="featured__route" aria-label="Our model in five steps">
          {STEPS.map((step, index) => (
            <li className={`featured__route-step featured__route-step--${index + 1}`} key={step}>
              <StepPill step={index + 1} label={step} />
            </li>
          ))}
        </ol>
      </div>
      <div className="featured__info">
        <h2 className="featured__heading sub-title" id="model-heading">
          We help founders build resilient companies through access to global markets, talent and strategic
          resources.
        </h2>
      </div>
    </section>
  )
}

export default Featured
