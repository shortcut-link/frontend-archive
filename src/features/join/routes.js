//@flow
import { lazy } from 'react';

import type { RoutesConfig } from 'lib/routing';

const LoginPage = lazy(() =>
  import('./pages/login').then(a => ({ default: a.LoginPage }))
);

export const joinRoutingPath = {
  join: '/join'
};

export const joinRoutes = (): RoutesConfig => [
  {
    path: joinRoutingPath['join'],
    exact: true,
    component: LoginPage
  }
];
