import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from "react-redux"
import { Socket } from 'react-socket-io';

import routes from './contents/routes';
import store from "./contents/store";

const uri = 'http://localhost/test'; //sample url

ReactDOM.render((
	<Provider store={store}>
		<Socket uri={uri}>
			<Router history={browserHistory}>
				{routes}
			</Router>
		</Socket>
  </Provider>
), document.getElementById('app'));
