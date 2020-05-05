import React, { ReactElement } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import DashboardLayout from 'Layouts/DashboardLayout';
import { RouteConfig } from './RouteConfig';
import Home from 'Pages/Dashboard/Home';
import Analysis from 'Pages/Dashboard/Analysis';
import NotFound from 'Pages/NotFound';
import Collections from 'Pages/Dashboard/Collections';
import Collection from 'Pages/Dashboard/Collections/Collection';
import { CollectionMatchParams } from 'Types/Collection';
import Records from 'Pages/Dashboard/Records';

const DashboardRoute = (): ReactElement => (
  <Switch>
    <Redirect exact path={RouteConfig.Dashboard.Root} to={RouteConfig.Dashboard.Home} />
    <DashboardLayout exact path={RouteConfig.Dashboard.Home} title="Home" component={Home} />
    <DashboardLayout exact path={RouteConfig.Dashboard.Collections.Root} title="Collections" component={Collections} />
    <DashboardLayout<CollectionMatchParams>
      exact
      path={RouteConfig.Dashboard.Collections.Collection}
      title="Collection"
      component={Collection}
    />
    <DashboardLayout exact path={RouteConfig.Dashboard.Records.Root} title="Records" component={Records} />
    <DashboardLayout exact path={RouteConfig.Dashboard.Analysis} title="Analysis" component={Analysis} />
    <DashboardLayout title="Not found" component={NotFound} />
  </Switch>
);

export default DashboardRoute;
