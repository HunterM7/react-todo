import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

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
