import React, { useContext, useState } from 'react'

import styles from './HomePage.module.scss'
import { AuthContext, ThemeContext } from '../../context'
import {
  userIcon,
  exitIcon,
  premiumIcon,
  settingsIcon,
  darkThemeIcon,
  arrowIcon,
  lightThemeIcon,
} from '../../assets/icons'

import Sidebar from '../../components/Sidebar/Sidebar'
import Button from '../../components/Button/Button'
import NewTask from '../../components/NewTask/NewTask'
import EditTask from '../../components/EditTask/EditTask'
import Card from '../../components/Card/Card'
import ProfileRow from '../../components/ProfileRow/ProfileRow'
import ThemeSwitcher from '../../components/ThemeSwitcher/ThemeSwitcher'
import Main from '../Main/Main'
import { Route, Routes } from 'react-router-dom'
import Profile from '../ProfilePage/ProfilePage'

const HomePage = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const [isProfileVisible, setIsProfileVisible] = useState(false)
  const [isEditVisible, setIsEditVisible] = useState(false)
  const [currentTodo, setCurrentTodo] = useState({})

  // Theme Function
  const { theme, setTheme } = useContext(ThemeContext)

  // SignOut Function
  const { handleSignOut } = React.useContext(AuthContext)

  // Profile list
  const profileArr = [
    {
      title: 'Личный кабинет',
      img: userIcon,
      path: 'profile',
    },
    {
      title: theme === 'dark' ? 'Светлый режим' : 'Темный режим',
      img: theme === 'dark' ? lightThemeIcon : darkThemeIcon,
      onClickFunc:
        theme === 'dark' ? () => setTheme('light') : () => setTheme('dark'),
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
      onClickFunc: () => handleSignOut(),
    },
  ]

  const profileList = profileArr.map((el, i) => {
    return (
      <ProfileRow
        title={el.title}
        img={el.img}
        onClick={el.onClickFunc}
        path={el.path}
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
            title="Новая задача"
            onClick={() => setIsPopupVisible(true)}
          />
          {<ThemeSwitcher />}
          <div className={styles.profile}>
            <p className={styles.profile__title}>Хорошего дня, username</p>
            <button
              className={styles.profile__btn}
              onClick={() => setIsProfileVisible(!isProfileVisible)}
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
                <div className={styles.profile__container}>{profileList}</div>
              </Card>
            </div>
          </div>
        </header>
        <div className={styles.main__content}>
          <Routes>
            <Route
              path=""
              element={
                <Main
                  setCurrentTodo={setCurrentTodo}
                  setIsEditVisible={setIsEditVisible}
                  setIsPopupVisible={setIsPopupVisible}
                />
              }
            />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </div>
      </main>

      {isPopupVisible && (
        <div
          className={styles.newTask}
          onClick={() => setIsPopupVisible(false)}
        >
          <NewTask closeFunc={setIsPopupVisible} />
        </div>
      )}

      {isEditVisible && (
        <div className={styles.newTask} onClick={() => setIsEditVisible(false)}>
          <EditTask
            closeFunc={setIsEditVisible}
            currentTodo={currentTodo}
            setCurrentTodo={setCurrentTodo}
          />
        </div>
      )}

      <div
        className={`
					${styles.profile__bg}
					${isProfileVisible ? styles.active : ''}
				`}
        onClick={() => setIsProfileVisible(false)}
      ></div>
    </div>
  )
}

export default HomePage
