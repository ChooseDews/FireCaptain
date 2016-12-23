import { combineReducers, createStore, applyMiddleware, compose } from "redux"
import { routerReducer, syncHistoryWithStore, routerActions, routerMiddleware } from 'react-router-redux'
import {  browserHistory} from "react-router"
import thunk from "redux-thunk" //used for async ajax redux
import multi from 'redux-multi' //used for multiple action dispatchs

import * as reducers from "./reducers"

const mainReducer = combineReducers({
	routing: routerReducer,
	...reducers
})

const middleware = routerMiddleware(browserHistory)

//creates javascript class for holding the store and passing it around the application
function storeCreator() {
	this.store = {}
}

storeCreator.prototype.initializeStore = function(initialState) {
	const store = createStore(
	  mainReducer,
	  initialState,
	  compose(
	  	applyMiddleware(middleware),
	  	applyMiddleware(thunk),
	  	applyMiddleware(multi)
	  	)
	)
	this.store = store
}

storeCreator.prototype.getStore = function() {
	return this.store
}

const storeHolder = new storeCreator() //instance of storeholder

export default storeHolder