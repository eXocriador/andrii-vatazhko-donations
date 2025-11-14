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
}

const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
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

  return (
    <button
      type="button"
      className={`${styles.themeToggle} ${className ?? ''}`}
      aria-label={`Перемкнути на ${nextTheme === 'dark' ? 'темну' : 'світлу'} тему`}
      title={`Тема: ${activeTheme === 'dark' ? 'Темна' : 'Світла'}`}
      onClick={toggleTheme}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        width="1em"
        height="1em"
        fill="currentColor"
        strokeLinecap="round"
        className={styles.classic}
        viewBox="0 0 32 32"
      >
        <clipPath id={clipId}>
          <path d="M0-5h30a1 1 0 0 0 9 13v24H0Z" />
        </clipPath>
        <g clipPath={`url(#${clipId})`}>
          <circle cx="16" cy="16" r="9.34" />
          <g stroke="currentColor" strokeWidth="1.5">
            <path d="M16 5.5v-4" />
            <path d="M16 30.5v-4" />
            <path d="M1.5 16h4" />
            <path d="M26.5 16h4" />
            <path d="m23.4 8.6 2.8-2.8" />
            <path d="m5.7 26.3 2.9-2.9" />
            <path d="m5.8 5.8 2.8 2.8" />
            <path d="m23.4 23.4 2.9 2.9" />
          </g>
        </g>
      </svg>
    </button>
  )
}

export default ThemeSwitch
