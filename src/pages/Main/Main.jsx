import React, { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database'

import { auth, db } from '../../firebase'
import { contextMenuIcon } from '../../assets/icons'

// Components
import Card from 'components/Card/Card'
import Button from 'components/Button/Button'
import TaskRow from 'components/TaskRow/TaskRow'

// Styles
import styles from './Main.module.scss'

const Main = ({ setIsPopupVisible, setIsEditVisible, setCurrentTodo }) => {
  const [todos, setTodos] = useState([])

  // Getting ToDo list
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), snapshot => {
          setTodos([])
          const data = snapshot.val()
          if (data !== null) {
            Object.values(data).forEach(todo => {
              setTodos(oldArr => [...oldArr, todo])
            })
          }
        })
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

  return (
    <div className={styles.content}>
      <div className={styles.content__left}>
        <Card className={styles.tasks}>
          <div className={styles.tasks__header}>
            <h4 className={styles.tasks__title}>Активные задачи</h4>
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
                  title="Новая задача"
                  onClick={() => setIsPopupVisible(true)}
                />
              </div>
            )}
          </div>
        </Card>
      </div>
      <div className={styles.content__right}>
        <Card>
          <div className={styles.tasks__header}>
            <h4 className={styles.tasks__title}>Факт дня</h4>
            <button className={styles.tasks__settings}>
              {contextMenuIcon}
            </button>
          </div>
          <div className={styles.tasks__main}>
            <p className={styles.tasks__text}>
              Человек, который просыпается в 6 утра, по статистике, закрывает
              все задачи к 18:00 вечера. Попробуем также 🤔?
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Main
