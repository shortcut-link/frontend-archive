//@flow
import { lazy } from 'react';

import type { RoutesConfig } from 'lib/routing';

const LoginPage = lazy(() =>
  import('./pages/login').then(a => ({ default: a.LoginPage }))
);

export const pathRoutes = {
  join: '/join'
};

export const joinRoutes = (): RoutesConfig => [
  {
    path: pathRoutes['join'],
    exact: true,
    component: LoginPage
  }
];
