import { lazy } from 'react';
import { renderRoutes } from 'react-router-config';

import { RoutesConfig } from 'lib/routing';

const CreateLinkMainPage = lazy(() =>
  import('./home/page').then(a => ({ default: a.CreateLinkMainPage }))
);
const NotFoundPage = lazy(() =>
  import('./not-found/page').then(a => ({ default: a.NotFoundPage }))
);
const LoginPage = lazy(() =>
  import('./join/login/page').then(a => ({ default: a.LoginPage }))
);
const RegistrationPage = lazy(() =>
  import('./join/registration/page').then(a => ({
    default: a.RegistrationPage
  }))
);

export const routesPath = {
  home: '/',
  join: {
    loginPage: '/join',
    registrationPage: '/join/registration'
  }
};

const createRoutes: RoutesConfig = [
  {
    path: routesPath['home'],
    component: CreateLinkMainPage,
    exact: true
  },
  {
    path: routesPath.join['loginPage'],
    component: LoginPage,
    exact: true
  },

  {
    path: routesPath.join['registrationPage'],
    component: RegistrationPage,
    exact: true
  },
  {
    component: NotFoundPage
  }
];

export const Routes = () => renderRoutes(createRoutes);
