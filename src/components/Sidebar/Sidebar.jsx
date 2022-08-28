import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'

import styles from './Sidebar.module.scss'
import { auth } from '../../firebase.js'

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

	const datas = [
		{
			title: 'Статистика',
			isActive: false,
			img: '/img/icons/stats.svg',
		},
		{
			title: 'Сравнить',
			isActive: false,
			img: '/img/icons/compare.svg',
		},
	]

	let categoriesList = categories.map((el, i) => {
		return <SidebarRow {...el} key={i} />
	})

	let dataList = datas.map((el, i) => {
		return <SidebarRow {...el} key={i} />
	})

	const navigate = useNavigate()

	const handleSignOut = () => {
		signOut(auth)
			.then(() => navigate('/'))
			.catch((err) => console.log(err))
	}

	React.useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (!user) {
				navigate('/')
			}
		})
	}, [navigate])

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
					{dataList}
				</div>
			</div>
			<div className={styles.logout}>
				<SidebarRow
					title='Выйти'
					isActive={false}
					img='/img/icons/exit.svg'
					onClick={handleSignOut}
				/>
			</div>
		</aside>
	)
}

export default Sidebar
