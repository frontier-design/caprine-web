import agoraSky from '../../assets/images/agora-sky.webp'
import agoraGridDashes from '../../assets/images/agora-grid-dashes.svg'
import agoraGridStatic from '../../assets/images/agora-grid-static.svg'
import agoraMountain from '../../assets/images/agora-mountain.webp'
import agoraLogo from '../../assets/images/agora-logo.svg'
import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { MEDIA_DRIFT, MOTION_OK, parallax } from '../../lib/parallax'
import Contour from '../Contour/Contour'
import GlassButton from '../GlassButton/GlassButton'
import './Featured.css'

function Featured() {
  const mediaRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MOTION_OK, () => {
        const media = mediaRef.current
        const section = media?.closest('.featured')
        const grid = media?.querySelector('.featured__grid')
        const badge = media?.querySelector('.featured__badge')
        if (!media || !section || !grid || !badge) return

        parallax(media, { trigger: section, from: MEDIA_DRIFT, to: -MEDIA_DRIFT })
        parallax(grid, { trigger: section, from: -0.025, to: 0.025 })
        parallax(badge, { trigger: section, from: 0.1, to: -0.1 })
      })

      return () => mm.revert()
    },
    { scope: mediaRef },
  )

  return (
    <section className="featured grid" id="portfolio" data-nav-theme="light" aria-label="Featured company: AGORA SecureWare">
      <Contour className="featured__contour" duration={1.1} />
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
        <div className="featured__badge">
          <img src={agoraLogo} alt="AGORA" width={234} height={52} />
        </div>
      </div>
      <div className="featured__info">
        <p className="paragraph">
          AGORA SecureWare is a Swiss software company, founded in 2007 and based in Bioggio, that provides
          secure data rooms for confidential document exchange and stakeholder collaboration, mainly for
          finance, legal, and corporate clients. Its main product is the AGORA Trust Room, which is Swiss-made
          and hosted in an ISO 27001-certified, GDPR-compliant data centre in Switzerland.
        </p>
        <GlassButton href="https://www.agora-secureware.com/" external withDot>
          More Detail
        </GlassButton>
      </div>
    </section>
  )
}

export default Featured
