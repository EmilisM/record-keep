import React, { FC } from 'react';
import { Switch } from 'react-router-dom';

import Home from 'Pages/Dashboard/Home';
import DashboardLayout from 'Layouts/DashboardLayout';

const DashboardRoute: FC = () => (
  <Switch>
    <DashboardLayout exact path="/dashboard" component={Home} />
  </Switch>
);

export default DashboardRoute;
