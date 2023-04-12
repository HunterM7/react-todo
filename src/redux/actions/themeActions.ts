import { ThemeVariants } from 'redux/actionTypes/themeTypes'

export interface setDarkThemeA {
  type: ThemeVariants.DARK
}

export interface setLightThemeA {
  type: ThemeVariants.LIGHT
}

export interface switchThemeA {
  type: ThemeVariants.SWITCH
}

export type ThemeActions = setDarkThemeA | setLightThemeA | switchThemeA
