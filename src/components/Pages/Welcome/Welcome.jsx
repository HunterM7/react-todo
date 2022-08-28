import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
	signInWithEmailAndPassword,
	// onAuthStateChanged,
	createUserWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../../../firebase.js'

import styles from './Welcome.module.scss'

import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import Button from '../../Button/Button'

const Welcome = () => {
	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [isRegistering, setIsRegistering] =
		React.useState(false)
	const [registerInfo, setRegisterInfo] = React.useState({
		email: '',
		password: '',
		confirmPassword: '',
	})

	const navigate = useNavigate()

	React.useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				navigate('home')
			}
		})
	}, [navigate])

	const handleEmailChange = (e) => {
		setEmail(e.target.value)
	}

	const handlePasswordChange = (e) => {
		setPassword(e.target.value)
	}

	// SignIn
	const handleSignIn = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				navigate('/home')
			})
			.catch((err) => console.log(err.message))
	}

	// Registration
	const handleRegister = () => {
		if (
			registerInfo.password !== registerInfo.confirmPassword
		) {
			alert('Different passwords')
		} else {
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
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				{isRegistering ? (
					<>
						<h4>Регистрация</h4>
						<input
							className={styles.input}
							type='email'
							placeholder='E-mail'
							value={registerInfo.email}
							onChange={(e) =>
								setRegisterInfo({
									...registerInfo,
									email: e.target.value,
								})
							}
						/>
						<input
							className={styles.input}
							type='password'
							placeholder='Пароль'
							value={registerInfo.password}
							onChange={(e) =>
								setRegisterInfo({
									...registerInfo,
									password: e.target.value,
								})
							}
						/>
						<input
							className={styles.input}
							type='password'
							placeholder='Повторите пароль'
							value={registerInfo.confirmPassword}
							onChange={(e) =>
								setRegisterInfo({
									...registerInfo,
									confirmPassword: e.target.value,
								})
							}
						/>

						<Button
							title='Зарегистрироваться'
							onClick={handleRegister}
						/>

						<button
							className={styles.registrationBtn}
							onClick={() => setIsRegistering(false)}
						>
							Назад
						</button>
					</>
				) : (
					<>
						<h4 className={styles.title}>Вход в аккаунт</h4>

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

						<Button title='Войти' onClick={handleSignIn} />

						<p className={styles.text}>
							Еще нет аккаунта?{' '}
							<button
								className={styles.registrationBtn}
								onClick={() => setIsRegistering(true)}
							>
								Регистрация
							</button>
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
					</>
				)}
			</div>
		</div>
	)
}

export default Welcome
