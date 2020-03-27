import React, { ReactElement } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import DashboardLayout from 'Layouts/DashboardLayout';
import { RouteConfig } from './RouteConfig';
import Home from 'Pages/Dashboard/Home';
import Analysis from 'Pages/Dashboard/Analysis';
import NotFound from 'Pages/NotFound';
import Collections from 'Pages/Dashboard/Collections';
import Collection from 'Pages/Dashboard/Collections/Collection';
import { CollectionMatchParams } from 'Types/Collection';

const DashboardRoute = (): ReactElement => (
  <Switch>
    <Redirect exact path={RouteConfig.Dashboard.Root} to={RouteConfig.Dashboard.Home} />
    <DashboardLayout exact path={RouteConfig.Dashboard.Home} title="Home" component={Home} />
    <DashboardLayout exact path={RouteConfig.Dashboard.Collections.Root} title="Collections" component={Collections} />
    <DashboardLayout<CollectionMatchParams>
      exact
      path={RouteConfig.Dashboard.Collections.Collection}
      title={params => `Collection: ${params.collectionName}`}
      component={Collection}
    />
    <DashboardLayout exact path={RouteConfig.Dashboard.Analysis} title="Analysis" component={Analysis} />
    <Route component={NotFound} />
  </Switch>
);

export default DashboardRoute;
