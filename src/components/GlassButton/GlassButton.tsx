import type { ReactNode } from 'react'
import './GlassButton.css'

type GlassButtonProps = {
  children: ReactNode
  href?: string
  variant?: 'faint' | 'tinted' | 'bare'
  withDot?: boolean
  external?: boolean
  className?: string
}

function GlassButton({ children, href, variant = 'tinted', withDot = false, external = false, className = '' }: GlassButtonProps) {
  const classes = `glass-button glass-button--${variant} ${withDot ? 'glass-button--dot' : ''} paragraph ${className}`

  if (href) {
    return (
      <a className={classes} href={href} {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} type="button">
      {children}
    </button>
  )
}

export default GlassButton
