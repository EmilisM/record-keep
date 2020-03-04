export type RouteConfigType = 'Root' | 'Home' | 'Login' | 'Dashboard' | 'About';

export const RouteConfig: Record<RouteConfigType, string> = {
  Root: '/',
  Home: '/home',
  Login: '/login',
  Dashboard: '/dashboard',
  About: '/about',
};
