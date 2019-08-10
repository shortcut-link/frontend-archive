import { lazy } from 'react';
import { renderRoutes } from 'react-router-config';

import { RoutesConfig } from 'lib/routing';

const CreateLinkMainPage = lazy(() =>
  import('./home/page').then(a => ({ default: a.CreateLinkMainPage }))
);
const LoginPage = lazy(() =>
  import('./join/login/page').then(a => ({ default: a.LoginPage }))
);
const NotFoundPage = lazy(() =>
  import('./not-found/page').then(a => ({ default: a.NotFoundPage }))
);

const createRoutes: RoutesConfig = [
  {
    path: '/',
    component: CreateLinkMainPage,
    exact: true
  },
  {
    path: '/join',
    component: LoginPage,
    exact: true
  },
  {
    component: NotFoundPage
  }
];

export const Routes = () => renderRoutes(createRoutes);
