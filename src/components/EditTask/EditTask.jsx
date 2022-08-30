import React, { useEffect } from 'react'
import { ref, update } from 'firebase/database'

import styles from './EditTask.module.scss'
import { auth, db } from '../../firebase'
import Button from '../Button/Button'
import Card from '../Card/Card'

const NewTask = ({
	closeFunc,
	currentTodo,
	setCurrentTodo,
}) => {
	// Add Todo function
	const handleUpdate = (uid) => {
		update(
			ref(db, `/${auth.currentUser.uid}/${uid}`),
			currentTodo,
		)

		setCurrentTodo({})
		closeFunc(false)
	}

	// Canceling
	const canceling = () => {
		setCurrentTodo({})
		closeFunc(false)
	}

	// Keydown
	const handleKeyDown = (e) => {
		if (e.key === 'Enter') handleUpdate(currentTodo.uidd)
		if (e.key === 'Escape') canceling()
	}

	useEffect(() => {}, [currentTodo]) //?!

	return (
		<div
			className={styles.wrapper}
			onClick={(e) => e.stopPropagation()}
		>
			<Card>
				<div
					className={styles.container}
					onKeyDown={handleKeyDown}
				>
					<h3 className={styles.title}>Изменить задачу</h3>
					<div className={styles.desc}>
						<h6 className={styles.desc__title}>
							Что нужно сделать?
						</h6>
						<input
							type='text'
							placeholder='Опиши задачу'
							className={styles.desc__input}
							value={currentTodo.todo}
							onChange={(e) =>
								setCurrentTodo({
									...currentTodo,
									todo: e.target.value,
								})
							}
						/>
					</div>
					<div className={styles.buttons}>
						<Button
							title='Отменить'
							color='red'
							onClick={canceling}
						/>
						<Button
							title='Изменить'
							onClick={() => handleUpdate(currentTodo.uidd)}
						/>
					</div>
				</div>
			</Card>
		</div>
	)
}

export default NewTask
