import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { Layout } from './containers';
import { Home } from './pages';


const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />
  </Route>
);

export default routes;