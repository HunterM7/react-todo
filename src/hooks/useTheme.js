import { useLayoutEffect, useState } from 'react'

// Theme of the user system
const isDarkTheme = window?.matchMedia(
	'(prefers-color-scheme: dark)',
).matches

const defaultTheme = isDarkTheme ? true : false

const useTheme = () => {
	const [darkTheme, setDarkTheme] = useState(
		localStorage.getItem('dark-theme') || defaultTheme,
	)

	useLayoutEffect(() => {
		document.documentElement.setAttribute(
			'data-dark-theme',
			darkTheme,
		)
		localStorage.setItem('dark-theme', darkTheme)
	}, [darkTheme])

	return { darkTheme, setDarkTheme }
}

export default useTheme
