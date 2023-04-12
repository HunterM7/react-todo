import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './ProfileRow.module.scss'

const ProfileRow = ({
	title = 'unknown',
	img,
	onClick,
	path = '',
}) => {
	return (
		<>
			{path ? (
				<NavLink className={styles.wrapper} to={path}>
					<div className={styles.img}>{img}</div>
					<h5 className={styles.title}>{title}</h5>
				</NavLink>
			) : (
				<button
					className={styles.wrapper}
					onClick={onClick}
				>
					<div className={styles.img}>{img}</div>
					<h5 className={styles.title}>{title}</h5>
				</button>
			)}
		</>
	)
}

export default ProfileRow
