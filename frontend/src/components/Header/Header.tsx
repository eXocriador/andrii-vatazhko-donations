import type { FC } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './Header.module.css'

const navItems = [
  { label: 'Головна', to: '/' },
  { label: 'Про нас', to: '/about' },
  { label: 'Збори', to: '/campaigns' },
  { label: 'Реквізити', to: '/requisites' },
]

const Header: FC = () => (
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
    <Link className={styles.cta} to="/requisites">
      Задонатити
    </Link>
  </header>
)

export default Header
