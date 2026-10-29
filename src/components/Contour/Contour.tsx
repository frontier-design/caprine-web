import type { CSSProperties } from 'react'
import './Contour.css'

type ContourProps = {
  className?: string
  duration?: number
}

function Contour({ className = '', duration = 1.6 }: ContourProps) {
  return (
    <div
      className={`contour ${className}`}
      aria-hidden="true"
      style={{ '--contour-duration': `${duration}s` } as CSSProperties}
    >
      <div className="contour__axis">
        <div className="contour__dashes" />
      </div>
    </div>
  )
}

export default Contour
