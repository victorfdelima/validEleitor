import { lazy } from 'react';
export const DefaultRoute = '/games/double';

interface Route {
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
  layout?: React.LazyExoticComponent<() => JSX.Element>;
  hasSidebar?: boolean;
  isPrivate?: boolean;
}

export const routes: Route[] = [
  {
    path: '/login',
    component: lazy(() => import('../pages/login')),
  },
  {
    path: '/404',
    component: lazy(() => import('../pages/404')),
  },
  {
    path: '/games/double',
    component: lazy(() => import('../pages/games/double')),
    isPrivate: true,
  },
];
