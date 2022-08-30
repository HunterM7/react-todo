import React from 'react'

import styles from './ProfileRow.module.scss'

const ProfileRow = ({
	title = 'unknown',
	img,
	onClick,
}) => {
	return (
		<button className={styles.wrapper} onClick={onClick}>
			<img className={styles.img} src={img} alt='Иконка' />
			<h5 className={styles.title}>{title}</h5>
		</button>
	)
}

export default ProfileRow
