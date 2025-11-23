import type { FC } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch'
import styles from './Header.module.css'

const navItems = [
  { label: 'Головна', to: '/' },
  { label: 'Про нас', to: '/about' },
  { label: 'Збори', to: '/campaigns' },
  { label: 'Реквізити', to: '/requisites' },
]

const Header: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
  }, [])

  useEffect(() => {
    if (!menuOpen) {
      return undefined
    }

    previousFocus.current = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    const focusFirstElement = () => {
      const focusable = dialogRef.current
        ? Array.from(dialogRef.current.querySelectorAll<HTMLElement>(focusSelector))
        : []
      focusable[0]?.focus()
    }

    focusFirstElement()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const focusable = dialogRef.current
        ? Array.from(dialogRef.current.querySelectorAll<HTMLElement>(focusSelector)).filter(
            (el) => !el.hasAttribute('disabled'),
          )
        : []
      if (focusable.length === 0) {
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault()
          last.focus()
        }
        return
      }

      if (document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus.current?.focus()
    }
  }, [menuOpen, closeMenu])

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
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
          <ThemeSwitch className={styles.themeSwitchDesktop} />
          <Link to="/admin" className={styles.adminLink}>
            Адмінка
          </Link>
          <Link className={`${styles.cta} ${styles.ctaDesktop}`} to="/requisites">
            Задонатити
          </Link>
          <button
            type="button"
            className={styles.burger}
            aria-label="Відкрити меню"
            aria-controls="mobile-nav"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          ref={dialogRef}
          id="mobile-nav"
          className={styles.mobileMenu}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-nav-title"
        >
          <p id="mobile-nav-title" className="visually-hidden">
            Мобільна навігація сайту
          </p>
          <button
            type="button"
            className={styles.close}
            aria-label="Закрити меню"
            onClick={closeMenu}
          >
            ×
          </button>
          <div className={styles.mobileTheme}>
            <p className={styles.mobileThemeLabel}>Тема</p>
            <ThemeSwitch className={styles.themeSwitchMobile} fullWidth />
          </div>
          <div className={styles.mobileLinks}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? `${styles.mobileLink} ${styles.mobileLinkActive}` : styles.mobileLink
                }
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            ))}
            <Link className={styles.mobileAdmin} to="/admin" onClick={closeMenu}>
              Адмінка
            </Link>
            <Link className={styles.mobileCta} to="/requisites" onClick={closeMenu}>
              Задонатити
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
