import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { Layout } from './containers';
import { Home } from './pages';
import { About } from "./pages";


const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />
    <Route path="/about" component={About} />
  </Route>
);

export default routes;