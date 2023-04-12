import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'

// Pages
import { HomePage, WelcomePage } from 'pages'

// Hooks
import useTheme from 'hooks/useTheme'

import { auth } from '../../firebase'
import { AuthContext, ThemeContext } from '../../context'

// Styles
import './App.scss'

const App = () => {
  // Theme State
  const { theme, setTheme } = useTheme()

  // Redirect Hook
  const navigate = useNavigate()

  // SignOut Function
  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate('/login'))
      .catch(err => console.log(err))
  }

  // SignIn Function
  const handleSignIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/')
      })
      .catch(err => console.log(err))
  }

  // Register Function
  const handleRegister = (registerInfo: {
    email: string
    password: string
  }) => {
    createUserWithEmailAndPassword(
      auth,
      registerInfo.email,
      registerInfo.password,
    )
      .then(user => {
        navigate('/')
        console.log(user)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="app">
      <AuthContext.Provider
        value={{
          handleSignIn,
          handleSignOut,
          handleRegister,
        }}
      >
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <Routes>
            <Route path="/login" element={<WelcomePage />} />
            <Route path="/*" element={<HomePage />} />
          </Routes>
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </div>
  )
}

export default App
