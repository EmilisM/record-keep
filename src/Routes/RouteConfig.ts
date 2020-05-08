type BaseRoute = {
  Root: string;
};

type AnalysisRoutes = BaseRoute & {
  Analyze: string;
};

type RecordsRoutes = BaseRoute & {
  Record: string;
};

type CollectionsRoutes = BaseRoute & {
  Collection: string;
};

type DashboardRoutes = BaseRoute & {
  Home: string;
  Analysis: AnalysisRoutes;
  Collections: CollectionsRoutes;
  Records: RecordsRoutes;
  NotFound: string;
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
    Analysis: {
      Root: '/dashboard/analysis',
      Analyze: '/dashboard/analysis/:analysisId',
    },
    Collections: {
      Root: '/dashboard/collections',
      Collection: '/dashboard/collections/:collectionId',
    },
    Records: {
      Root: '/dashboard/records',
      Record: '/dashboard/records/:recordId',
    },
    NotFound: '/dashboard/404',
  },
};
