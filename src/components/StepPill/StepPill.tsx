import './StepPill.css'

type StepPillProps = {
  step: number
  label: string
  className?: string
}

function StepPill({ step, label, className = '' }: StepPillProps) {
  return (
    <div className={`step-pill ${className}`}>
      <span className="step-pill__number" aria-hidden="true">
        {step}
      </span>
      <span className="step-pill__label paragraph">{label}</span>
    </div>
  )
}

export default StepPill
