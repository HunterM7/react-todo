import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
	signInWithEmailAndPassword,
	onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '../../../firebase.js'

import styles from './Welcome.module.scss'

import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'

const Welcome = () => {
	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const navigate = useNavigate()

	React.useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				navigate('home')
			}
		})
	}, [])

	const handleEmailChange = (e) => {
		setEmail(e.target.value)
	}

	const handlePasswordChange = (e) => {
		setPassword(e.target.value)
	}

	const handleSignIn = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				navigate('/home')
			})
			.catch((err) => console.log(err.message))
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<h3 className={styles.title}>Вход в аккаунт</h3>
				<input
					className={styles.input}
					type='email'
					placeholder='E-mail'
					value={email}
					onChange={handleEmailChange}
				/>
				<input
					className={styles.input}
					type='password'
					placeholder='Пароль'
					value={password}
					onChange={handlePasswordChange}
				/>
				<button
					className={styles.btn}
					onClick={handleSignIn}
				>
					Войти
				</button>
				<p className={styles.text}>
					Еще нет аккаунта?{' '}
					<a href='https://google.com'>Регистрация</a>
				</p>
				<p className={styles.divider}>или</p>
				<div className={styles.socials}>
					<button>
						<FacebookIcon />
					</button>
					<button>
						<TwitterIcon />
					</button>
				</div>
			</div>
		</div>
	)
}

export default Welcome
