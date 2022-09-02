import { useLayoutEffect, useState } from 'react'

const useTheme = () => {
	const [darkTheme, setDarkTheme] = useState(
		localStorage.getItem('dark-theme') || false,
	)

	useLayoutEffect(() => {
		document.documentElement.setAttribute(
			'data-dark-theme',
			darkTheme,
		)
		localStorage.setItem('dark-theme', darkTheme)
	}, [darkTheme])

	return [darkTheme, setDarkTheme]
}

export default useTheme
