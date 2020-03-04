import React, { FC } from 'react';
import { Switch } from 'react-router-dom';

import Home from 'Pages/Dashboard/Home';
import DashboardLayout from 'Layouts/DashboardLayout';
import { RouteConfig } from './RouteConfig';

const DashboardRoute: FC = () => (
  <Switch>
    <DashboardLayout exact path={RouteConfig.Dashboard} component={Home} />
  </Switch>
);

export default DashboardRoute;
