import Logo from '../Logo/Logo'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <span className="header__line" aria-hidden="true" />
      <a className="header__logo" href="#top" aria-label="Caprine home">
        <Logo />
      </a>
    </header>
  )
}

export default Header
