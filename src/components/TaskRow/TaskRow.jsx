import React from 'react'

import styles from './TaskRow.module.scss'

const TaskRow = ({ todo }) => {
	return <div className={styles.wrapper}>{todo.todo}</div>
}

export default TaskRow
