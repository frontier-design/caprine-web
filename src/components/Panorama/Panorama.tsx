import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { MOTION_OK, parallax } from '../../lib/parallax'
import mountainFull from '../../assets/images/mountain-full.webp'
import rangeGrid from '../../assets/images/range-grid.svg'
import mountainOnly from '../../assets/images/mountain-only.webp'
import './Panorama.css'

function Panorama() {
  const panoramaRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MOTION_OK, () => {
        const panorama = panoramaRef.current
        if (!panorama) return
        parallax(gsap.utils.toArray('.panorama__layer', panorama), { trigger: panorama, from: -0.08, to: 0.08 })
        const grid = panorama.querySelector('.panorama__grid')
        if (grid) parallax(grid, { trigger: panorama, from: -0.03, to: 0.03 })
      })

      return () => mm.revert()
    },
    { scope: panoramaRef },
  )

  return (
    <div className="panorama" data-nav-theme="light" ref={panoramaRef}>
      <div className="panorama__scene">
        <img className="panorama__layer" src={mountainFull} alt="" loading="lazy" />
        <img className="panorama__grid" src={rangeGrid} alt="" aria-hidden="true" />
        <span className="panorama__ridge panorama__ridge--summit" data-nav-theme="dark" aria-hidden="true" />
        <span className="panorama__ridge panorama__ridge--shoulders" data-nav-theme="dark" aria-hidden="true" />
        <span className="panorama__ridge panorama__ridge--base" data-nav-theme="dark" aria-hidden="true" />
        <img
          className="panorama__layer"
          src={mountainOnly}
          alt="Snow-capped peak glowing at sunset above a jagged ridge"
          loading="lazy"
        />
      </div>
    </div>
  )
}

export default Panorama
