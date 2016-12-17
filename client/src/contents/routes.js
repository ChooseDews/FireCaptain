import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {
	UserIsSudo,
	UserIsDistrict,
	UserIsSchool,
	UserIsDrill,
	UserIsNotLoggedIn
} from "./auth"

import { Layout } from './containers';
import { Home } from './pages';
import { About } from "./pages";
import { Schools } from "./pages";
import { Login } from "./pages"


const routes = (
	<Route>
	  <Route path="/" component={Layout}>
	    <IndexRoute component={Home} />
	    <Route path="/about" component={UserIsDrill(About)} />
	    <Route path="/schools" component={Schools} />
	  </Route>
	  <Route path="/login" component={UserIsNotLoggedIn(Login)} />
  	</Route>
);

export default routes;
