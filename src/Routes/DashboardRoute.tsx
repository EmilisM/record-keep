import React, { FC } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import DashboardLayout from 'Layouts/DashboardLayout';
import { RouteConfig } from './RouteConfig';
import Home from 'Pages/Dashboard/Home';
import Collections from 'Pages/Dashboard/Collections';
import Analysis from 'Pages/Dashboard/Analysis';

const DashboardRoute: FC = () => (
  <Switch>
    <Redirect exact path={RouteConfig.Dashboard} to={RouteConfig.DashboardHome} />
    <DashboardLayout exact path={RouteConfig.DashboardHome} title="Home" component={Home} />
    <DashboardLayout exact path={RouteConfig.DashboardCollections} title="Collections" component={Collections} />
    <DashboardLayout exact path={RouteConfig.DashboardAnalysis} title="Analysis" component={Analysis} />
  </Switch>
);

export default DashboardRoute;
