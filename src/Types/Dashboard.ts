import { DashboardRouteType } from 'Routes/RouteConfig';
import { FC } from 'react';

import { ReactComponent as Home } from 'Assets/Home.svg';
import { ReactComponent as Collections } from 'Assets/Collections.svg';
import { ReactComponent as Analysis } from 'Assets/Analysis.svg';

export type DashboardMenuItem = {
  label: string;
  icon: FC;
  to: DashboardRouteType;
};

export const dashboardMenuItems: DashboardMenuItem[] = [
  {
    label: 'Home',
    icon: Home,
    to: 'DashboardHome',
  },
  {
    label: 'Collections',
    icon: Collections,
    to: 'DashboardCollections',
  },
  {
    label: 'Analysis',
    icon: Analysis,
    to: 'DashboardAnalysis',
  },
];
