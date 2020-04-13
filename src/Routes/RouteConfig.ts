type BaseRoute = {
  Root: string;
};

type CollectionsRoutes = BaseRoute & {
  Collection: string;
};

type DashboardRoutes = BaseRoute & {
  Home: string;
  Analysis: string;
  Collections: CollectionsRoutes;
};

type RouteType = BaseRoute & {
  Home: string;
  Login: string;
  About: string;
  Dashboard: DashboardRoutes;
};

export const RouteConfig: RouteType = {
  Root: '/',
  Home: '/home',
  Login: '/login',
  About: '/about',
  Dashboard: {
    Root: '/dashboard',
    Home: '/dashboard/home',
    Analysis: '/dashboard/analysis',
    Collections: {
      Root: '/dashboard/collections',
      Collection: '/dashboard/collections/:collectionName',
    },
  },
};
