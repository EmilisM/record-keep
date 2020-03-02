import React, { FC } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import NotFound from 'Pages/NotFound';
import Home from 'Pages/Home';
import Login from 'Pages/Login';
import LandingLayout from 'Layouts/LandingLayout';
import About from 'Pages/About';
import RouteConfig from './RouteConfig';
import DashboardRoute from './DashboardRoute';

const BaseRoute: FC = () => (
  <Switch>
    <Redirect exact from={RouteConfig.Root} to={RouteConfig.Home} />
    <LandingLayout exact path={RouteConfig.Home} component={Home} />
    <LandingLayout exact path={RouteConfig.Login} component={Login} />
    <LandingLayout exact path={RouteConfig.About} component={About} />
    <Route exact path={RouteConfig.Dashboard} component={DashboardRoute} />
    <Route component={NotFound} />
  </Switch>
);

export default BaseRoute;
