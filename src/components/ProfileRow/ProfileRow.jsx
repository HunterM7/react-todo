import React from 'react'

import styles from './ProfileRow.module.scss'

const ProfileRow = ({
	title = 'unknown',
	img,
	onClick,
}) => {
	return (
		<button className={styles.wrapper} onClick={onClick}>
			<div className={styles.img}>{img}</div>
			<h5 className={styles.title}>{title}</h5>
		</button>
	)
}

export default ProfileRow
