import { lazy } from 'react';
import { Layout } from '../components/Layout';

export const DefaultRoute = '/games/double';

interface Route {
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
  layout?: any;
  hasSidebar?: boolean;
  isPrivate?: boolean;
  hideHeader?: boolean;
}

export const routes: Route[] = [
  {
    path: '/login',
    component: lazy(() => import('../pages/login')),
    layout: Layout,
    hasSidebar: true,
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
