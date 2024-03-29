import React from 'react'
import { useNavigate } from 'react-router-dom'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'

import { auth } from '../../firebase.js'
import { AuthContext } from '../../context'

import Button from '../../components/Button/Button'
import Card from '../../components/Card/Card'
import Logo from '../../components/Logo/Logo'
import ThemeSwitcher from '../../components/ThemeSwitcher/ThemeSwitcher'

// Styles
import styles from './WelcomePage.module.scss'

const WelcomePage = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isRegistering, setIsRegistering] = React.useState(false)
  const [registerInfo, setRegisterInfo] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const { handleSignIn, handleRegister } = React.useContext(AuthContext)

  const navigate = useNavigate()

  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        navigate('home')
      }
    })
  }, [navigate])

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleRegisterFunc = () => {
    if (registerInfo.password !== registerInfo.confirmPassword) {
      alert('Different passwords')
    } else {
      handleRegister(registerInfo)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Logo />
        <ThemeSwitcher />
      </div>

      <div className={styles.main}>
        <div className={styles.container}>
          <Card>
            {isRegistering ? (
              <div
                className={styles.container__inner}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleRegisterFunc()
                }}
              >
                <h4>Регистрация</h4>
                <input
                  className={styles.input}
                  type="email"
                  placeholder="E-mail"
                  value={registerInfo.email}
                  onChange={e =>
                    setRegisterInfo({
                      ...registerInfo,
                      email: e.target.value,
                    })
                  }
                />
                <input
                  className={styles.input}
                  type="password"
                  placeholder="Пароль"
                  value={registerInfo.password}
                  onChange={e =>
                    setRegisterInfo({
                      ...registerInfo,
                      password: e.target.value,
                    })
                  }
                />
                <input
                  className={styles.input}
                  type="password"
                  placeholder="Повторите пароль"
                  value={registerInfo.confirmPassword}
                  onChange={e =>
                    setRegisterInfo({
                      ...registerInfo,
                      confirmPassword: e.target.value,
                    })
                  }
                />

                <Button
                  title="Зарегистрироваться"
                  onClick={handleRegisterFunc}
                />

                <button
                  className={styles.registrationBtn}
                  onClick={() => setIsRegistering(false)}
                >
                  Назад
                </button>
              </div>
            ) : (
              <div
                className={styles.container__inner}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleSignIn()
                }}
              >
                <h4 className={styles.title}>Вход в аккаунт</h4>

                <input
                  className={styles.input}
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={handleEmailChange}
                />

                <input
                  className={styles.input}
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={handlePasswordChange}
                />

                <Button
                  title="Войти"
                  onClick={() => handleSignIn(email, password)}
                />

                <p className={styles.text}>
                  Еще нет аккаунта?{' '}
                  <button
                    className={styles.registrationBtn}
                    onClick={() => setIsRegistering(true)}
                  >
                    Регистрация
                  </button>
                </p>

                <p className={styles.divider}>или</p>

                <div className={styles.socials}>
                  <button>
                    <FacebookIcon />
                  </button>
                  <button>
                    <TwitterIcon />
                  </button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      <div className={styles.footer}>
        <a
          className={styles.footer__link}
          href="https://www.figma.com/community/file/1042024350599049662"
          target="_blank"
          rel="noreferrer"
        >
          Design by Aleksandr Tereshchuk
        </a>
      </div>
    </div>
  )
}

export default WelcomePage
