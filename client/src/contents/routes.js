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

import {
	Home,
	About,
	Schools,
	Login,
	NotFound,
	Unauthorized,
	ErrorPage
} from "./pages"


const routes = (
	<Route>
	  <Route path="/" component={Layout}>
	    <IndexRoute component={Home} />
	    <Route path="/about" component={IsDistrict(About)} />
	    <Route path="/schools" component={IsDistrict(Schools)} />
	  </Route>
	  <Route path="/login" component={IsNotLoggedIn(Login)} />

	  {/*error routes*/}
	  <Route path="/error" component={ErrorPage} status={500} />
	  <Route path="/unauthorized" component={Unauthorized} status={403} />
	  <Route path='/notfound' component={NotFound} status={404} />
	  <Redirect from='*' to='/notfound' />
  	</Route>
);

export default routes;
