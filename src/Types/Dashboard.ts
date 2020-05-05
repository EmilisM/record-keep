import { RouteConfig } from 'Routes/RouteConfig';
import { FC } from 'react';

import { ReactComponent as Home } from 'Assets/Home.svg';
import { ReactComponent as Collections } from 'Assets/Collections.svg';
import { ReactComponent as Analysis } from 'Assets/Analysis.svg';
import { ReactComponent as Records } from 'Assets/Records.svg';

export type DashboardMenuItem = {
  label: string;
  icon: FC;
  to: string;
};

export const dashboardMenuItems: DashboardMenuItem[] = [
  {
    label: 'Home',
    icon: Home,
    to: RouteConfig.Dashboard.Home,
  },
  {
    label: 'Collections',
    icon: Collections,
    to: RouteConfig.Dashboard.Collections.Root,
  },
  {
    label: 'Records',
    icon: Records,
    to: RouteConfig.Dashboard.Records.Root,
  },
  {
    label: 'Analysis',
    icon: Analysis,
    to: RouteConfig.Dashboard.Analysis,
  },
];
