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
			<img src={img} alt='Иконка' />
			<h5 className={styles.title}>{title}</h5>
		</button>
	)
}

export default SidebarRow
