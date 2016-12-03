import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from "react-redux"

import routes from './contents/routes';
import store from "./contents/store";

ReactDOM.render((
	<Provider store={store}>
		<Router history={browserHistory}>
			{routes}
		</Router>
  </Provider>
), document.getElementById('app'));
