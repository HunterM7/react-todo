import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './Sidebar.module.scss'

import SidebarRow from './SidebarRow/SidebarRow'

const Sidebar = () => {
	const categories = [
		{
			title: 'Дом',
			isActive: true,
			img: '/img/icons/home.svg',
		},
		{
			title: 'Семья',
			isActive: false,
			img: '/img/icons/family.svg',
		},
		{
			title: 'Работа',
			isActive: false,
			img: '/img/icons/work.svg',
		},
		{
			title: 'Спорт',
			isActive: false,
			img: '/img/icons/sport.svg',
		},
	]

	let categoriesList = categories.map((el) => {
		return <SidebarRow {...el} />
	})

	return (
		<aside className={styles.wrapper}>
			<div className={styles.infoblock}>
				<div className={styles.logo}>
					<NavLink to='/'>
						<img src='/img/logo.svg' alt='Task Book' />
					</NavLink>
				</div>

				<div className={styles.categories}>
					<h2 className={styles.title}>Категории</h2>
					{categoriesList}
				</div>

				<div className={styles.data}>
					<h2 className={styles.title}>Данные</h2>
				</div>
			</div>
			<div className={styles.logout}>Выйти</div>
		</aside>
	)
}

export default Sidebar
