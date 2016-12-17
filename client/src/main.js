import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from "react-redux"
import { Socket } from 'react-socket-io';

import routes from './contents/routes';
import store from "./contents/store";

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
	<Provider store={store}>
		<Socket uri={window.location.protocol + "//" + window.location.host}>
			<Router history={history}>
				{routes}
			</Router>
		</Socket>
  </Provider>
), document.getElementById('app'));
