import React from 'react'

import styles from './SidebarRow.module.scss'

const SidebarRow = ({
	title = 'unknown',
	isActive,
	img,
	onClick,
}) => {
	return (
		<button
			className={`
				${styles.wrapper}
				${isActive ? styles['wrapper--active'] : ''}
			`}
			onClick={onClick}
		>
			<div className={styles.img}>{img}</div>
			<h5 className={styles.title}>{title}</h5>
		</button>
	)
}

export default SidebarRow
