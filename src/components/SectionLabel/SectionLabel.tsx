import type { ReactNode } from 'react'
import './SectionLabel.css'

type SectionLabelProps = {
  children: ReactNode
  tone?: 'light' | 'dark'
  className?: string
}

function SectionLabel({ children, tone = 'dark', className = '' }: SectionLabelProps) {
  return <p className={`section-label section-label--${tone} caption ${className}`}>{children}</p>
}

export default SectionLabel
