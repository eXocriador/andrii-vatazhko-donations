import { applyThemePreference, readThemePreference } from './themePreference'

const preference = readThemePreference()
applyThemePreference(preference)
