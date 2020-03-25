import React, { ReactElement } from 'react';
import { Switch } from 'react-router-dom';
import { RouteConfig } from './RouteConfig';
import Collections from 'Pages/Dashboard/Collections';
import Collection from 'Pages/Dashboard/Collections/Collection';
import DashboardLayout from 'Layouts/DashboardLayout';
import CollectionLayout from 'Layouts/CollectionLayout';

const CollectionsRoute = (): ReactElement => (
  <Switch>
    <DashboardLayout exact path={RouteConfig.Dashboard.Collections.Root} title="Collections" component={Collections} />
    <CollectionLayout exact path={RouteConfig.Dashboard.Collections.Collection} component={Collection} />
  </Switch>
);

export default CollectionsRoute;
