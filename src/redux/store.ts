import { createStore } from 'redux'

// Reducer
import { rootReducer } from './reducers'

export const store = createStore(rootReducer)
