import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

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
import { NotFound } from "./pages"


const routes = (
	<Route>
	  <Route path="/" component={Layout}>
	    <IndexRoute component={Home} />
	    <Route path="/about" component={UserIsDistrict(About)} />
	    <Route path="/schools" component={Schools} />
	  </Route>
	  <Route path="/login" component={UserIsNotLoggedIn(Login)} />
	  {/*not found route*/}
	  <Route path='/404' component={NotFound} status={404} />
	  <Redirect from='*' to='/404' />
  	</Route>
);

export default routes;
