import type { FC } from 'react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './Header.module.css'

const navItems = [
  { label: 'Головна', to: '/' },
  { label: 'Про нас', to: '/about' },
  { label: 'Збори', to: '/campaigns' },
  { label: 'Реквізити', to: '/requisites' },
]

const Header: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand}>
        <span className={styles.mark}>AV</span> Donations
      </Link>
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.linkActive}` : styles.link
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className={styles.actions}>
        <Link className={`${styles.cta} ${styles.ctaDesktop}`} to="/requisites">
          Задонатити
        </Link>
        <button
          type="button"
          className={styles.burger}
          aria-label="Відкрити меню"
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu} role="dialog" aria-modal="true">
          <button
            type="button"
            className={styles.close}
            aria-label="Закрити меню"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>
          <div className={styles.mobileLinks}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? `${styles.mobileLink} ${styles.mobileLinkActive}` : styles.mobileLink
                }
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <Link className={styles.mobileCta} to="/requisites" onClick={() => setMenuOpen(false)}>
              Задонатити
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
