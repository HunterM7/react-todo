import React from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'

import styles from './Sidebar.module.scss'
import { auth } from '../../firebase.js'

import Logo from '../Logo/Logo'
import SidebarRow from './SidebarRow/SidebarRow'

// Icons
import {
	compareIcon,
	exitIcon,
	familyIcon,
	homeIcon,
	sportIcon,
	statsIcon,
	workIcon,
} from '../../assets/icons'

const Sidebar = () => {
	const categories = [
		{
			title: 'Дом',
			isActive: true,
			img: homeIcon,
		},
		{
			title: 'Семья',
			isActive: false,
			img: familyIcon,
		},
		{
			title: 'Работа',
			isActive: false,
			img: workIcon,
		},
		{
			title: 'Спорт',
			isActive: false,
			img: sportIcon,
		},
	]

	const datas = [
		{
			title: 'Статистика',
			isActive: false,
			img: statsIcon,
		},
		{
			title: 'Сравнить',
			isActive: false,
			img: compareIcon,
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
					<Logo />
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
					img={exitIcon}
					onClick={handleSignOut}
				/>
			</div>
		</aside>
	)
}

export default Sidebar
