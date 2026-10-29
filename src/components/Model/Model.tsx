import { useRef } from 'react'
import modelLines from '../../assets/images/model-lines.svg'
import { gsap, useGSAP } from '../../lib/gsap'
import { MOTION_OK, parallax } from '../../lib/parallax'
import Contour from '../Contour/Contour'
import SectionLabel from '../SectionLabel/SectionLabel'
import StepPill from '../StepPill/StepPill'
import './Model.css'

const steps = [
  'Identify the Challenge',
  'Partner with Founders',
  'Secure Partnerships (POV)',
  'Scale go-to-market',
  'Resilience Execution',
]

const PILL_DEPTHS = [0.05, 0.085, 0.035, 0.07, 0.045]

function Model() {
  const stageRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
        const stage = stageRef.current
        if (!stage) return
        gsap.utils.toArray<HTMLElement>('.step-pill', stage).forEach((pill, index) => {
          const amount = PILL_DEPTHS[index] ?? 0.05
          parallax(pill, { trigger: stage, from: amount, to: -amount })
        })
        const lines = stage.querySelector('.model__lines')
        if (lines) parallax(lines, { trigger: stage, from: -0.03, to: 0.03 })
      })

      return () => mm.revert()
    },
    { scope: stageRef },
  )

  return (
    <section className="model grid" id="model" data-nav-theme="light" aria-labelledby="model-heading">
      <Contour className="model__contour" duration={2.3} />
      <SectionLabel className="model__label">Our model</SectionLabel>
      <h2 className="model__heading sub-title" id="model-heading">
        We help founders build resilient companies through access to global markets, talent and strategic
        resources.
      </h2>
      <div className="model__stage" data-nav-theme="dark" ref={stageRef}>
        <div className="model__card" aria-hidden="true">
          <img className="model__lines" src={modelLines} alt="" />
        </div>
        <ol className="model__steps">
          {steps.map((label, index) => (
            <li className={`model__step model__step--${index + 1}`} key={label}>
              <StepPill step={index + 1} label={label} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Model
