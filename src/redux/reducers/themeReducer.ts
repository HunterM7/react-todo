import { ThemeVariants } from 'redux/actionTypes/themeTypes'
import { ThemeActions } from 'redux/actions/themeActions'

interface IThemeState {
  theme: 'dark' | 'light'
}

const initialState: IThemeState = {
  theme: 'dark',
}

export function themeReducer(
  state: IThemeState = initialState,
  action: ThemeActions,
) {
  switch (action.type) {
    case ThemeVariants.DARK:
      return { ...state, theme: 'dark' }

    case ThemeVariants.LIGHT:
      return { ...state, theme: 'light' }

    case ThemeVariants.SWITCH:
      return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' }

    default:
      return state
  }
}
