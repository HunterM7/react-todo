import React from 'react'
import { uid } from 'uid'
import { set, ref } from 'firebase/database'

import styles from './NewTask.module.scss'
import { auth, db } from '../../firebase'
import Button from '../Button/Button'
import Card from '../Card/Card'

const NewTask = ({ closeFunc }) => {
	const [todo, setTodo] = React.useState('')

	// Add Todo function
	const writeToDatabase = () => {
		const uidd = uid()

		set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
			todo,
			uidd,
		})

		setTodo('')
		closeFunc(false)
	}

	// Canceling
	const canceling = () => {
		setTodo('')
		closeFunc(false)
	}

	// Keydown
	const handleKeyDown = (e) => {
		if (e.key === 'Enter') writeToDatabase()
		if (e.key === 'Escape') canceling()
	}

	return (
		<div
			className={styles.wrapper}
			onClick={(e) => e.stopPropagation()}
		>
			<Card>
				<div className={styles.container}>
					<h3 className={styles.title}>
						Добавить новую задачу
					</h3>
					<div className={styles.desc}>
						<h6 className={styles.desc__title}>
							Что нужно сделать?
						</h6>
						<input
							type='text'
							placeholder='Опиши задачу'
							className={styles.desc__input}
							value={todo}
							onChange={(e) => setTodo(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
					</div>
					<div className={styles.buttons}>
						<Button
							title='Отменить'
							color='red'
							onClick={canceling}
						/>
						<Button
							title='Добавить'
							onClick={writeToDatabase}
						/>
					</div>
				</div>
			</Card>
		</div>
	)
}

export default NewTask
