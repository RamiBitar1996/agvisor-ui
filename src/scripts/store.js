import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import reduxThunk from 'redux-thunk'

const maybeDevtools = window.devToolsExtension ? window.devToolsExtension() : (f) => f
const middleware = compose(applyMiddleware(reduxThunk), maybeDevtools)

const sampleState = (state = {}, action) => {
    return state
}
const rootReducer = combineReducers({sampleState})

const store = createStore(rootReducer, {}, middleware)

export default store