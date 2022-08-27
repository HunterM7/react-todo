// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCUwx_rcjRy6Sm9GMluv0ski25HvcGOXG4',
	authDomain: 'todo-8889f.firebaseapp.com',
	databaseURL:
		'https://todo-8889f-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'todo-8889f',
	storageBucket: 'todo-8889f.appspot.com',
	messagingSenderId: '28839254151',
	appId: '1:28839254151:web:6ea23c6c3ff00bb2660022',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getDatabase(app)
export const auth = getAuth()
