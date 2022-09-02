import React from 'react'
import {
	Route,
	Routes,
	useNavigate,
} from 'react-router-dom'
import {
	signOut,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from 'firebase/auth'

import './App.scss'
import { auth } from './firebase'
import { AuthContext, ThemeContext } from './context'

import Home from './components/Pages/Home/Home'
import Welcome from './components/Pages/Welcome/Welcome'
import useTheme from './hooks/useTheme'

const App = () => {
	// Theme State
	const [darkTheme, setDarkTheme] = useTheme()

	// Redirect Hook
	const navigate = useNavigate()

	// SignOut Function
	const handleSignOut = () => {
		signOut(auth)
			.then(() => navigate('/'))
			.catch((err) => console.log(err))
	}

	// SignIn Function
	const handleSignIn = (email, password) => {
		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				navigate('/home')
			})
			.catch((err) => console.log(err.message))
	}

	// Register Function
	const handleRegister = (registerInfo) => {
		createUserWithEmailAndPassword(
			auth,
			registerInfo.email,
			registerInfo.password,
		)
			.then((user) => {
				navigate('home')
			})
			.catch((err) => console.log(err))
	}

	return (
		<div className='app'>
			<AuthContext.Provider
				value={{
					handleSignIn,
					handleSignOut,
					handleRegister,
				}}
			>
				<ThemeContext.Provider
					value={{ darkTheme, setDarkTheme }}
				>
					<Routes>
						<Route path='/' element={<Welcome />} />
						<Route path='home' element={<Home />} />
					</Routes>
				</ThemeContext.Provider>
			</AuthContext.Provider>
		</div>
	)
}

export default App
