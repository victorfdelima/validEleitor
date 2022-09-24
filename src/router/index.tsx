import { Flex } from '@chakra-ui/react';
import React, { Suspense } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route as RouteDOM,
  Routes,
} from 'react-router-dom';
import { Loader } from '../components/Loader';
import { isAuthenticated } from '../services/auth';
import { DefaultRoute, routes } from './routes';

interface RouteProps {
  layout: React.FC<{
    children?: React.ReactNode;
    hasSidebar?: boolean;
    hideHeader?: boolean;
  }>;
  component: React.FC<{ children?: React.ReactNode }>;
  hasSidebar?: boolean;
  isPrivate?: boolean;
  hideHeader?: boolean;
  path: string;
}

function Route({
  component: Component,
  layout: Layout,
  path,
  hasSidebar = false,
  isPrivate = false,
  hideHeader = false,
}: RouteProps) {
  if ((!isAuthenticated() && isPrivate) || !path) {
    return <Navigate to='/login' />;
  }

  if (!isAuthenticated() && path !== '/login') {
    return <Navigate to='/login' />;
  }

  if (isAuthenticated() && path === '/') {
    return <Navigate to={DefaultRoute} />;
  }

  if (Layout === React.Fragment) {
    return (
      <Flex minH='100vh'>
        <Component />
      </Flex>
    );
  }

  return (
    <Layout hasSidebar={hasSidebar} hideHeader={hideHeader}>
      <Component />
    </Layout>
  );
}

function ResolveRoutes() {
  return routes.map((route) => {
    const Layout = route.layout || React.Fragment;
    const Component = route.component;

    return (
      <RouteDOM
        key={`routes-${route.path}`}
        path={route.path}
        element={
          <Route
            path={route.path}
            layout={Layout}
            component={Component}
            hasSidebar={route.hasSidebar ?? false}
            isPrivate={route.isPrivate ?? false}
          />
        }
      />
    );
  });
}

export function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <RouteDOM path='/' element={<Navigate to={DefaultRoute} replace />} />
          {ResolveRoutes()}
          <RouteDOM path='*' element={<Navigate to='/404' replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
