import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Home from './components/Pages/Home/Home'
import Welcome from './components/Pages/Welcome/Welcome'

function App() {
	return (
		<div className='app'>
			<Routes>
				<Route path='/' element={<Welcome />} />
				<Route path='home' element={<Home />} />
			</Routes>
		</div>
	)
}

export default App
