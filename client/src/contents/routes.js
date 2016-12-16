import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {
	UserIsSudo,
	UserIsDistrict,
	UserIsSchool,
	UserIsDrill
} from "./auth"

import { Layout } from './containers';
import { Home } from './pages';
import { About } from "./pages";
import { Schools } from "./pages";


const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />
    <Route path="/about" component={UserIsDrill(About)} />
    <Route path="/schools" component={Schools} />
  </Route>
);

export default routes;
