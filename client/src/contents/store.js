import { combineReducers, createStore, applyMiddleware, compose } from "redux"
import { routerReducer, syncHistoryWithStore, routerActions, routerMiddleware } from 'react-router-redux'
import {  browserHistory} from "react-router"
import thunk from "redux-thunk" //used for async ajax redux

import * as reducers from "./reducers"

const mainReducer = combineReducers({
	routing: routerReducer,
	...reducers
})

const middleware = routerMiddleware(browserHistory)

const store = createStore(
  mainReducer,
  compose(
  	applyMiddleware(middleware),
  	applyMiddleware(thunk)
  	)
)

export default store

window.store = store