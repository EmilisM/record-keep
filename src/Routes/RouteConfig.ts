export type DashboardRouteType = 'DashboardHome' | 'DashboardCollections' | 'DashboardAnalysis';

export type RouteType = 'Root' | 'Home' | 'Login' | 'About' | DashboardRouteType;

export const DashboardRouteConfig: Record<DashboardRouteType, string> = {
  DashboardHome: '/dashboard',
  DashboardAnalysis: '/dashboard/analysis',
  DashboardCollections: '/dashboard/collections',
};

export const RouteConfig: Record<RouteType, string> = {
  Root: '/',
  Home: '/home',
  Login: '/login',
  About: '/about',
  ...DashboardRouteConfig,
};
