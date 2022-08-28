import React from 'react'
import { uid } from 'uid'
import { set, ref } from 'firebase/database'

import styles from './NewTask.module.scss'
import { auth, db } from '../../firebase'

const NewTask = () => {
	const [todo, setTodo] = React.useState('')

	// Read all Todos

	// Add Todo function
	const writeToDatabase = () => {
		const uidd = uid()

		set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
			todo,
			uidd,
		})

		setTodo('')
	}

	return (
		<div
			className={styles.wrapper}
			onClick={(e) => e.stopPropagation()}
		>
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
				/>
			</div>
			<button onClick={writeToDatabase}>button</button>
		</div>
	)
}

export default NewTask
