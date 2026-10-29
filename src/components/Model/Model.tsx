import { useRef, type CSSProperties } from 'react'
import modelLinesStatic from '../../assets/images/model-lines-static.svg'
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

const DASHED_LINES = [
  { x: 511.699, y: 671.504, length: 757.87, angle: -41.611, dash: 4.986, duration: 1.8 },
  { x: 491.704, y: 713.474, length: 757.88, angle: -41.611, dash: 4.986, duration: 1.3 },
  { x: 472.033, y: 754.778, length: 757.88, angle: -41.611, dash: 4.986, duration: 2.6 },
  { x: 452.042, y: 796.747, length: 757.87, angle: -41.611, dash: 4.986, duration: 0.8 },
  { x: 432.375, y: 838.052, length: 757.88, angle: -41.611, dash: 4.986, duration: 1.5 },
  { x: 412.376, y: 880.024, length: 758.55, angle: -41.633, dash: 4.99, duration: 1.1 },
  { x: 392.712, y: 921.319, length: 757.87, angle: -41.611, dash: 4.986, duration: 2.2 },
  { x: 372.72, y: 963.291, length: 758.55, angle: -41.633, dash: 4.99, duration: 0.9 },
]

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
          <div className="model__lines">
            <img className="model__lines-static" src={modelLinesStatic} alt="" />
            {DASHED_LINES.map(({ x, y, length, angle, dash, duration }) => (
              <span
                className="model__dash-line"
                key={y}
                style={
                  {
                    '--x': x,
                    '--y': y,
                    '--length': length,
                    '--angle': `${angle}deg`,
                    '--dash': dash,
                    '--duration': `${duration}s`,
                  } as CSSProperties
                }
              >
                <span className="model__dash-strip" />
              </span>
            ))}
          </div>
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
