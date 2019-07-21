//@flow
import { lazy } from 'react';

import { RoutesConfig } from 'lib/routing';

const CreateLinkMainPage = lazy(() =>
  import('./pages/main').then(a => ({ default: a.CreateLinkMainPage }))
);

export const CreateLinkRoutes = (): RoutesConfig => [
  {
    path: '/',
    exact: true,
    component: CreateLinkMainPage
  }
];
