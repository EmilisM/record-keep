import React, { FC } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import NotFound from '../Pages/NotFound';
import Dashboard from '../Pages/Dashboard';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import LandingLayout from '../Layouts/LandingLayout';

const BaseRoute: FC = () => (
  <Switch>
    <Redirect exact from="/" to="/home" />
    <LandingLayout exact path="/home" component={Home} />
    <LandingLayout exact path="/login" component={Login} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route component={NotFound} />
  </Switch>
);

export default BaseRoute;
