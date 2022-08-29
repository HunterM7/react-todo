import React from 'react'
import { onValue, ref } from 'firebase/database'

import styles from './Home.module.scss'
import { auth, db } from '../../../firebase'

import Sidebar from '../../Sidebar/Sidebar'
import Button from '../../Button/Button'
import NewTask from '../../NewTask/NewTask'
import Card from '../../Card/Card'
import TaskRow from '../../TaskRow/TaskRow'
import ProfileRow from '../../ProfileRow/ProfileRow'

const Home = () => {
	const [todos, setTodos] = React.useState([])
	const [isPopupVisible, setIsPopupVisible] =
		React.useState(false)
	const [isProfileVisible, setIsProfileVisible] =
		React.useState(false)

	// Getting ToDo list
	React.useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				onValue(
					ref(db, `/${auth.currentUser.uid}`),
					(snapshot) => {
						setTodos([])
						const data = snapshot.val()
						if (data !== null) {
							Object.values(data).forEach((todo) => {
								setTodos((oldArr) => [...oldArr, todo])
							})
						}
					},
				)
			}
		})
	}, [])

	const todoList = todos.map((todo) => {
		return <TaskRow todo={todo} />
	})

	const profileArr = [
		{
			title: 'Личный кабинет',
			img: '/img/icons/user.svg',
		},
		{
			title: 'Темный режим',
			img: '/img/icons/moon.svg',
		},
		{
			title: 'Настройки',
			img: '/img/icons/settings.svg',
		},
		{
			title: 'Премиум',
			img: '/img/icons/star.svg',
		},
		{
			title: 'Выйти',
			img: '/img/icons/exit.svg',
		},
	]

	const profileList = profileArr.map((el) => {
		return (
			<ProfileRow
				title={el.title}
				img={el.img}
				onClick={() => console.log(el.title)}
			/>
		)
	})

	return (
		<div className={styles.wrapper}>
			<Sidebar />
			<main className={styles.main}>
				<header className={styles.header}>
					<Button
						hasImg
						title='Новая задача'
						onClick={() => setIsPopupVisible(true)}
					/>
					<button className={styles.themeBtn}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
						>
							<path
								d='M21 12.79C20.8427 14.4922 20.2039 16.1144 19.1583 17.4668C18.1127 18.8192 16.7035 19.8458 15.0957 20.4265C13.4879 21.0073 11.748 21.1181 10.0795 20.7461C8.41104 20.3741 6.88302 19.5345 5.67425 18.3258C4.46548 17.117 3.62596 15.589 3.25393 13.9205C2.8819 12.252 2.99274 10.5121 3.57348 8.9043C4.15423 7.29651 5.18085 5.88737 6.53324 4.84175C7.88562 3.79614 9.50782 3.15731 11.21 3C10.2134 4.34827 9.73387 6.00945 9.85856 7.68141C9.98324 9.35338 10.7039 10.9251 11.8894 12.1106C13.075 13.2961 14.6466 14.0168 16.3186 14.1415C17.9906 14.2662 19.6518 13.7866 21 12.79V12.79Z'
								stroke='#282846'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</button>
					<div className={styles.profile}>
						<p className={styles.profile__title}>
							Хорошего дня, username
						</p>
						<button
							className={styles.profile__btn}
							onClick={() =>
								setIsProfileVisible(!isProfileVisible)
							}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='14'
								height='8'
								viewBox='0 0 14 8'
								fill='none'
							>
								<path
									d='M1 1L7 7L13 1'
									stroke='#29A19C'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>

						<div
							className={`
							${styles.profile__list}
							${isProfileVisible ? styles.active : ''}
						`}
						>
							<Card>
								<div className={styles.profile__container}>
									{profileList}
								</div>
							</Card>
						</div>
					</div>
				</header>
				<div className={styles.content}>
					<div className={styles.content__left}>
						<Card className={styles.tasks}>
							<div className={styles.tasks__header}>
								<h4 className={styles.tasks__title}>
									Активные задачи
								</h4>
								<button className={styles.tasks__settings}>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='28'
										height='7'
										viewBox='0 0 28 7'
										fill='none'
									>
										<rect
											y='0.5'
											width='6'
											height='6'
											rx='3'
											fill='#282846'
										/>
										<rect
											x='11'
											y='0.5'
											width='6'
											height='6'
											rx='3'
											fill='#282846'
										/>
										<rect
											x='22'
											y='0.5'
											width='6'
											height='6'
											rx='3'
											fill='#282846'
										/>
									</svg>
								</button>
							</div>
							<div className={styles.tasks__main}>
								{todoList}
							</div>
						</Card>
					</div>
					<div className={styles.content__right}>
						right side
					</div>
				</div>
			</main>

			<div
				className={`
				${styles.newTask}
				${isPopupVisible ? styles.active : ''}
			`}
				onClick={() => setIsPopupVisible(false)}
			>
				<NewTask setIsPopupVisible={setIsPopupVisible} />
			</div>
		</div>
	)
}

export default Home
