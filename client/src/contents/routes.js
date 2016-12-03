import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from './containers/layout';
import Home from './pages/home/index';


const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />
  </Route>
);

export default routes;