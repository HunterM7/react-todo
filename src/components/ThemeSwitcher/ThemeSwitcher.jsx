import React, { useContext } from 'react'

import styles from './ThemeSwitcher.module.scss'

import { ThemeContext } from '../../context'
import {
	darkThemeIcon,
	lightThemeIcon,
} from '../../assets/icons'

const ThemeSwitcher = () => {
	const { darkTheme, setDarkTheme } =
		useContext(ThemeContext)

	return (
		<div
			className={`
				${styles.theme}
				${darkTheme ? styles['theme--dark'] : ''}
			`}
		>
			<button
				className={`
					${styles.theme__btn}
					${styles['theme__btn--dark']}
				`}
				onClick={() => setDarkTheme(true)}
			>
				{darkThemeIcon}
			</button>
			<button
				className={`
					${styles.theme__btn}
					${styles['theme__btn--light']}
				`}
				onClick={() => setDarkTheme(false)}
			>
				{lightThemeIcon}
			</button>
		</div>
	)
}

export default ThemeSwitcher
