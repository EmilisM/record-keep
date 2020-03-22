export type DashboardRouteType = 'Dashboard' | 'DashboardHome' | 'DashboardCollections' | 'DashboardAnalysis';

export type RouteType = 'Root' | 'Home' | 'Login' | 'About' | 'Logout' | DashboardRouteType;

export const DashboardRouteConfig: Record<DashboardRouteType, string> = {
  DashboardHome: '/dashboard/home',
  DashboardAnalysis: '/dashboard/analysis',
  DashboardCollections: '/dashboard/collections',
  Dashboard: '/dashboard',
};

export const RouteConfig: Record<RouteType, string> = {
  Root: '/',
  Home: '/home',
  Login: '/login',
  About: '/about',
  Logout: '/logout',
  ...DashboardRouteConfig,
};
