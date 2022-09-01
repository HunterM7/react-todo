import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.scss'

import App from './App'

const Main = () => {
	return (
		<React.StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
	)
}

const root = ReactDOM.createRoot(
	document.getElementById('root'),
)
root.render(<Main />)
