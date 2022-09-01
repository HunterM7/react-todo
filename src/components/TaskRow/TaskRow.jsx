import React from 'react'
import { ref, remove } from 'firebase/database'

import styles from './TaskRow.module.scss'
import { auth, db } from '../../firebase'
import { editIcon, removeIcon } from '../../assets/icons'

const TaskRow = ({
	todo,
	setCurrentTodo,
	setIsEditVisible,
}) => {
	// Edit function
	const handleEdit = () => {
		setCurrentTodo(todo)
		setIsEditVisible(true)
	}

	// Delete function
	const handleDelete = (uid) => {
		remove(ref(db, `/${auth.currentUser.uid}/${uid}`))
	}

	return (
		<div className={styles.wrapper}>
			<p className={styles.text}>{todo.todo}</p>

			<button
				className={`
					${styles.btn}
					${styles['btn--edit']}
				`}
				onClick={handleEdit}
			>
				{editIcon}
			</button>
			<button
				onClick={() => handleDelete(todo.uidd)}
				className={`
					${styles.btn}
					${styles['btn--remove']}
				`}
			>
				{removeIcon}
			</button>
		</div>
	)
}

export default TaskRow
