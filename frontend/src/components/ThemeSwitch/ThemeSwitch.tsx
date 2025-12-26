import type { FC } from 'react'
import { useEffect, useId, useLayoutEffect, useState } from 'react'
import {
  applyThemePreference,
  readThemePreference,
  type ThemePreference,
} from '../../theme/themePreference'
import styles from './ThemeSwitch.module.css'

const getSystemTheme = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'light'
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

type ThemeSwitchProps = {
  className?: string
  fullWidth?: boolean
}

const ThemeSwitch: FC<ThemeSwitchProps> = ({ className = '', fullWidth = false }) => {
  const clipId = useId()
  const [preference, setPreference] = useState<ThemePreference>(() => readThemePreference())
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => getSystemTheme())

  useLayoutEffect(() => {
    applyThemePreference(preference)
  }, [preference])

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return
    }
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? 'dark' : 'light')
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const activeTheme = preference === 'auto' ? systemTheme : preference
  const nextTheme = activeTheme === 'dark' ? 'light' : 'dark'

  const toggleTheme = () => {
    setPreference((prev) => {
      const current = prev === 'auto' ? systemTheme : prev
      return (current === 'dark' ? 'light' : 'dark') as ThemePreference
    })
  }

  const isDark = activeTheme === 'dark'

  return (
    <button
      type="button"
      className={`${styles.themeToggle} ${fullWidth ? styles.fullWidth : ''} ${className} ${isDark ? styles.dark : styles.light}`}
      aria-label={`Перемкнути на ${nextTheme === 'dark' ? 'темну' : 'світлу'} тему`}
      title={`Тема: ${activeTheme === 'dark' ? 'Темна' : 'Світла'}`}
      onClick={toggleTheme}
    >
      <span className={styles.iconWrapper}>
        {isDark ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.icon}
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.icon}
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        )}
      </span>
    </button>
  )
}

export default ThemeSwitch
