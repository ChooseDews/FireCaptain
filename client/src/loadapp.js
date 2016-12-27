import { syncHistoryWithStore } from 'react-router-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from "react-redux"
import { Socket } from 'react-socket-io';
import { fromJS } from "immutable"

import routes from './contents/routes';
import storeHolder from "./contents/store";
import { socket } from "./contents/socket"

import { getToken } from "./contents/token"

let loadApp = (response) => {

	let initialState = {} //initial state of store

	if (!response.response) { //if the user data was passed successfully
		let { data } = response
		initialState = {
			token: getToken(),
			user: fromJS(data.data) //set user data to an immutable object
		}
	}

	storeHolder.initializeStore(initialState) //creates initial store

	const store = storeHolder.store //gets store from storeCreator object

	const history = syncHistoryWithStore(browserHistory, store) //create history that is synced with redux

	ReactDOM.render((
		<Provider store={store}>
			<Socket socket={socket}>
				<Router history={history}>
					{routes}
				</Router>
			</Socket>
	  </Provider>
	), document.getElementById('app'));
}

export default loadApp