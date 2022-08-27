import React from 'react'
import styles from './Welcome.module.scss'

const Welcome = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<h3 className={styles.title}>Вход в аккаунт</h3>
				<input
					className={styles.input}
					type='email'
					placeholder='E-mail'
				/>
				<input
					className={styles.input}
					type='password'
					placeholder='Пароль'
				/>
			</div>
		</div>
	)
}

export default Welcome
