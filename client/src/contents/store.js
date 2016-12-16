import { combineReducers, createStore, applyMiddleware, compose } from "redux"
import { routerReducer, syncHistoryWithStore, routerActions, routerMiddleware } from 'react-router-redux'
import {  browserHistory} from "react-router"
import thunk from "redux-thunk" //used for async ajax redux

import * as reducers from "./reducers"
import initialState from "./initialState"

const mainReducer = combineReducers({
	routing: routerReducer,
	...reducers
})

const middleware = routerMiddleware(browserHistory)

const store = createStore(
  mainReducer,
  initialState,
  compose(
  	applyMiddleware(middleware),
  	applyMiddleware(thunk)
  	)
)

export default store

import http from "./util"