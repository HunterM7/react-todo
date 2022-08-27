import React from 'react'

import styles from './SidebarRow.module.scss'

const SidebarRow = ({
	title = 'unknown',
	isActive,
	img,
}) => {
	return (
		<div
			className={`
			${styles.wrapper}
			${isActive ? styles['wrapper--active'] : ''}
		`}
		>
			<img src={img} alt='Иконка' />
			<h4 className={styles.title}>{title}</h4>
		</div>
	)
}

export default SidebarRow
