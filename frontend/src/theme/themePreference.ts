export type ThemePreference = 'auto' | 'light' | 'dark'

const STORAGE_KEY = 'av-theme-preference'

const isBrowser = () => typeof window !== 'undefined'

const coercePreference = (value: string | null): ThemePreference => {
  if (value === 'light' || value === 'dark') {
    return value
  }
  return 'auto'
}

export const readThemePreference = (): ThemePreference => {
  if (!isBrowser()) {
    return 'auto'
  }

  return coercePreference(window.localStorage.getItem(STORAGE_KEY))
}

const setThemeAttribute = (preference: ThemePreference) => {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  const body = document.body

  if (preference === 'auto') {
    root.removeAttribute('data-theme')
    body?.removeAttribute('data-theme')
  } else {
    root.setAttribute('data-theme', preference)
    body?.setAttribute('data-theme', preference)
  }
}

export const applyThemePreference = (preference: ThemePreference): void => {
  setThemeAttribute(preference)

  if (!isBrowser()) {
    return
  }

  if (preference === 'auto') {
    window.localStorage.removeItem(STORAGE_KEY)
  } else {
    window.localStorage.setItem(STORAGE_KEY, preference)
  }
}
