type MenuIconProps = {
  className?: string
}

function MenuIcon({ className = '' }: MenuIconProps) {
  return (
    <svg
      className={className}
      width="15"
      height="15"
      viewBox="0 0 15.1891 14.9658"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0.199111 7.95203L14.99 1.53089" />
      <path d="M0.199111 13.4349L14.99 7.01381" />
    </svg>
  )
}

export default MenuIcon
