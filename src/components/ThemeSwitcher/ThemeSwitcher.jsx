import React, { useContext } from 'react'

import { ThemeContext } from '../../context'

import { darkThemeIcon, lightThemeIcon } from '../../assets/icons'

// Styles
import styles from './ThemeSwitcher.module.scss'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <div
      className={`
				${styles.theme}
				${styles[`theme--${theme}`]}
			`}
    >
      <button
        className={`
					${styles.theme__btn}
					${styles['theme__btn--dark']}
				`}
        onClick={() => setTheme('dark')}
      >
        {darkThemeIcon}
      </button>
      <button
        className={`
					${styles.theme__btn}
					${styles['theme__btn--light']}
				`}
        onClick={() => setTheme('light')}
      >
        {lightThemeIcon}
      </button>
    </div>
  )
}

export default ThemeSwitcher
