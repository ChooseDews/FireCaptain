import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from "react-redux"
import { Socket } from 'react-socket-io';
import * as axios from "axios";
import { fromJS } from "immutable"

import routes from './contents/routes';
import storeHolder from "./contents/store";

import getToken from "./contents/token" //function to get jwt token

let token = getToken()

console.log("theToken", token)

if (token) { //if user is logged in
	axios.get("/api/auth/me", {
		headers: {
			"x-access-token": token,
		}
	}).then(loadApp).catch(loadApp)
} else {
	loadApp({response: true}) //pass in that there is no token
}


function loadApp(response) {
	let initialState = {} //initial state of store

	if (!response.response) { //if the user data was passed successfully
		let { data } = response
		initialState = {
			token: token,
			user: fromJS(data.data) //set user data to an immutable object
		}
	}

	storeHolder.initializeStore(initialState) //creates initial store

	const store = storeHolder.store //gets store from storeCreator object

	window.store = store

	const history = syncHistoryWithStore(browserHistory, store) //create history that is synced with redux

	ReactDOM.render((
		<Provider store={store}>
			<Socket uri={window.location.protocol + "//" + window.location.host}>
				<Router history={history}>
					{routes}
				</Router>
			</Socket>
	  </Provider>
	), document.getElementById('app'));
}
