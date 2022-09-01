import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './Logo.module.scss'
import { logo } from '../../assets/icons'

const Logo = () => {
	return (
		<NavLink className={styles.logo} to='/'>
			{logo}
		</NavLink>
	)
}

export default Logo
