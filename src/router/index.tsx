import React, { Suspense } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route as RouteDOM,
  Routes,
} from 'react-router-dom';
import { Loader } from '../components/Loader';
import { routes } from './routes';

interface RouteProps {
  component: React.FC<{ children?: React.ReactNode }>;
}

function Route({ component: Component }: RouteProps) {
  return <Component />;
}

function ResolveRoutes() {
  return routes.map((route) => {
    const Component = route.component;

    return (
      <RouteDOM
        key={`routes-${route.path}`}
        path={route.path}
        element={<Route component={Component} />}
      />
    );
  });
}

export function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          {ResolveRoutes()}
          <RouteDOM path='*' element={<Navigate to='/404' replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
