import { lazy } from 'react';

export const DefaultRoute = '/';

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
    path: '/',
    component: lazy(() => import('../pages')),
  },
];
