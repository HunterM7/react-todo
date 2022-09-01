import { useLayoutEffect, useState } from 'react'

const useTheme = () => {
	const [darkTheme, setDarkTheme] = useState(false)

	useLayoutEffect(() => {
		document.documentElement.setAttribute(
			'data-dark-theme',
			darkTheme,
		)
	}, [darkTheme])

	return [darkTheme, setDarkTheme]
}

export default useTheme
