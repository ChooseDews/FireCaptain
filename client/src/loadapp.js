import { syncHistoryWithStore } from 'react-router-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from "react-redux"
import { Socket } from 'react-socket-io';
import { fromJS } from "immutable"

import routes from './contents/routes';
import store from "./contents/store";
import { socket } from "./contents/socket"

import { getToken } from "./contents/token"

import { authActions, tokenActions } from "./contents/actions"

let loadApp = (response) => {

	if (!response.response) { //if the user data was passed successfully
		let { data } = response

		//set initial state with user credentials
		store.dispatch([authActions.addAuthObject(data.data), tokenActions.setJwtToken(getToken())])
	}

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