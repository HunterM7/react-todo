import React from 'react'

import styles from './NewTask.module.scss'

const NewTask = () => {
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
				/>
			</div>
		</div>
	)
}

export default NewTask
