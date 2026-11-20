import { useRef, type CSSProperties } from 'react'
import agoraLogo from '../../assets/images/agora-logo.svg'
import modelLinesStatic from '../../assets/images/model-lines-static.svg'
import { gsap, useGSAP } from '../../lib/gsap'
import { MOTION_OK, parallax } from '../../lib/parallax'
import Contour from '../Contour/Contour'
import GlassButton from '../GlassButton/GlassButton'
import SectionLabel from '../SectionLabel/SectionLabel'
import './Model.css'

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
        const lines = stage.querySelector('.model__lines')
        if (lines) parallax(lines, { trigger: stage, from: -0.03, to: 0.03 })
        const text = stage.querySelector('.model__text')
        if (text) parallax(text, { trigger: stage, from: 0.05, to: -0.05 })
      })

      return () => mm.revert()
    },
    { scope: stageRef },
  )

  return (
    <section className="model grid" id="portfolio" data-nav-theme="light" aria-label="Portfolio: AGORA SecureWare">
      <Contour className="model__contour" duration={2.3} />
      <SectionLabel className="model__label">Portfolio</SectionLabel>
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
        <div className="model__content">
          <div className="model__text">
            <div className="model__badge">
              <img className="model__logo" src={agoraLogo} alt="AGORA" width={234} height={52} />
            </div>
            <div className="model__copy">
              <p className="paragraph">
                AGORA SecureWare is a Swiss software company, founded in 2007 and based in Bioggio, that provides
                secure data rooms for confidential document exchange and stakeholder collaboration, mainly for
                finance, legal, and corporate clients. Its main product is the AGORA Trust Room, which is
                Swiss-made and hosted in an ISO 27001-certified, GDPR-compliant data centre in Switzerland.
              </p>
              <GlassButton href="https://www.agora-secureware.com/" external withDot>
                More Detail
              </GlassButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Model
