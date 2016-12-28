import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import {
	IsSudo,
	IsDistrict,
	IsSchool,
	IsDrill,
	IsNotLoggedIn
} from "./auth"

import { Layout } from './containers';
import { Home } from './pages';
import { About } from "./pages";
import { Schools } from "./pages";
import { Login } from "./pages"
import { NotFound } from "./pages"
import { Unauthorized } from "./pages"


const routes = (
	<Route>
	  <Route path="/" component={Layout}>
	    <IndexRoute component={Home} />
	    <Route path="/about" component={IsDistrict(About)} />
	    <Route path="/schools" component={IsDistrict(Schools)} />
	  </Route>
	  <Route path="/login" component={IsNotLoggedIn(Login)} />

	  {/*error routes*/}
	  <Route path="/unauthorized" component={Unauthorized} status={403} />
	  <Route path='/notfound' component={NotFound} status={404} />
	  <Redirect from='*' to='/notfound' />
  	</Route>
);

export default routes;
