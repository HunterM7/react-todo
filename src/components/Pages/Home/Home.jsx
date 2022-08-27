import React from 'react'

import styles from './Home.module.scss'

import Sidebar from '../../Sidebar/Sidebar'

const Home = () => {
	return (
		<div className={styles.wrapper}>
			<Sidebar />
			<main className={styles.main}>Content</main>
		</div>
	)
}

export default Home
