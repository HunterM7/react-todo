import React, { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database'

import styles from './Home.module.scss'
import { auth, db } from '../../../firebase'

import Sidebar from '../../Sidebar/Sidebar'
import Button from '../../Button/Button'
import NewTask from '../../NewTask/NewTask'
import EditTask from '../../EditTask/EditTask'
import Card from '../../Card/Card'
import TaskRow from '../../TaskRow/TaskRow'
import ProfileRow from '../../ProfileRow/ProfileRow'
import {
	userIcon,
	exitIcon,
	premiumIcon,
	settingsIcon,
	darkThemeIcon,
	contextMenuIcon,
	arrowIcon,
} from '../../../assets/icons'
import ThemeSwitcher from '../../ThemeSwitcher/ThemeSwitcher'

const Home = () => {
	const [todos, setTodos] = useState([])
	const [isPopupVisible, setIsPopupVisible] =
		useState(false)
	const [isProfileVisible, setIsProfileVisible] =
		useState(false)
	const [isEditVisible, setIsEditVisible] = useState(false)
	const [currentTodo, setCurrentTodo] = useState({})

	// Getting ToDo list
	useEffect(() => {
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

	const todoList = todos.map((todo, i) => {
		return (
			<TaskRow
				key={i}
				todo={todo}
				setCurrentTodo={setCurrentTodo}
				setIsEditVisible={setIsEditVisible}
			/>
		)
	})

	// Profile list
	const profileArr = [
		{
			title: 'Личный кабинет',
			img: userIcon,
			onClickFunc: () => console.log('Личный кабинет'),
		},
		{
			title: 'Темный режим',
			img: darkThemeIcon,
			onClickFunc: () => console.log('Темный режим'),
		},
		{
			title: 'Настройки',
			img: settingsIcon,
			onClickFunc: () => console.log('Настройки'),
		},
		{
			title: 'Премиум',
			img: premiumIcon,
			onClickFunc: () => console.log('Премиум'),
		},
		{
			title: 'Выйти',
			img: exitIcon,
			onClickFunc: () => console.log('Выйти'),
		},
	]

	const profileList = profileArr.map((el, i) => {
		return (
			<ProfileRow
				title={el.title}
				img={el.img}
				onClick={el.onClickFunc}
				key={i}
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
					{<ThemeSwitcher />}
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
							{arrowIcon}
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
									{contextMenuIcon}
								</button>
							</div>
							<div className={styles.tasks__main}>
								{todos.length > 0 ? (
									todoList
								) : (
									<div className={styles.noTasks}>
										<p>Добавьте хотя бы одну задачу!</p>
										<Button
											hasImg
											title='Новая задача'
											onClick={() =>
												setIsPopupVisible(true)
											}
										/>
									</div>
								)}
							</div>
						</Card>
					</div>
					<div className={styles.content__right}>
						<Card>
							<div className={styles.tasks__header}>
								<h4 className={styles.tasks__title}>
									Факт дня
								</h4>
								<button className={styles.tasks__settings}>
									{contextMenuIcon}
								</button>
							</div>
							<div className={styles.tasks__main}>
								<p className={styles.tasks__text}>
									Человек, который просыпается в 6 утра, по
									статистике, закрывает все задачи к 18:00
									вечера. Попробуем также 🤔?
								</p>
							</div>
						</Card>
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
				<NewTask closeFunc={setIsPopupVisible} />
			</div>

			<div
				className={`
				${styles.newTask}
				${isEditVisible ? styles.active : ''}
			`}
				onClick={() => setIsEditVisible(false)}
			>
				<EditTask
					closeFunc={setIsEditVisible}
					currentTodo={currentTodo}
					setCurrentTodo={setCurrentTodo}
				/>
			</div>
		</div>
	)
}

export default Home
