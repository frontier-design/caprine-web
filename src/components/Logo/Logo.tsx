import Goat from '../Goat/Goat'
import './Logo.css'

type LogoProps = {
  withTagline?: boolean
  className?: string
}

function Logo({ withTagline = false, className = '' }: LogoProps) {
  return (
    <span className={`logo ${className}`}>
      <Goat className="logo__goat" />
      <span className="logo__mark">
        <span className="logo__rotor">
          <span className="logo__word logo__word--straight" aria-hidden="true">
            Caprine
          </span>
          <span className="logo__word logo__word--turbo">Caprine</span>
          {withTagline && <span className="logo__tagline">Summit together</span>}
        </span>
      </span>
    </span>
  )
}

export default Logo
