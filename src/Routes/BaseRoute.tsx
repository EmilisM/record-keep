import React, { ReactElement } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from 'Pages/Home';
import Login from 'Pages/Login';
import LandingLayout from 'Layouts/LandingLayout';
import About from 'Pages/About';
import { RouteConfig } from './RouteConfig';
import DashboardRoute from './DashboardRoute';
import LandingNotFound from 'Pages/LandingNotFound';

const BaseRoute = (): ReactElement => (
  <Switch>
    <Redirect exact from={RouteConfig.Root} to={RouteConfig.Home} />
    <LandingLayout exact path={RouteConfig.Home} component={Home} />
    <LandingLayout exact path={RouteConfig.Login} component={Login} />
    <LandingLayout exact path={RouteConfig.About} component={About} />
    <Route path={RouteConfig.Dashboard.Root} component={DashboardRoute} />
    <LandingLayout component={LandingNotFound} />
  </Switch>
);

export default BaseRoute;
