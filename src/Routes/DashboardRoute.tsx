import React, { ReactElement } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import DashboardLayout from 'Layouts/DashboardLayout';
import { RouteConfig } from './RouteConfig';
import Home from 'Pages/Dashboard/Home';
import Analysis from 'Pages/Dashboard/Analysis';
import NotFound from 'Pages/NotFound';
import CollectionsRoute from './CollectionsRoute';

const DashboardRoute = (): ReactElement => (
  <Switch>
    <Redirect exact path={RouteConfig.Dashboard.Root} to={RouteConfig.Dashboard.Home} />
    <DashboardLayout exact path={RouteConfig.Dashboard.Home} title="Home" component={Home} />
    <Route path={RouteConfig.Dashboard.Collections.Root} component={CollectionsRoute} />
    <DashboardLayout exact path={RouteConfig.Dashboard.Analysis} title="Analysis" component={Analysis} />
    <Route component={NotFound} />
  </Switch>
);

export default DashboardRoute;
