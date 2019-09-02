import { lazy } from 'react';
import { renderRoutes } from 'react-router-config';

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
const ProfilePage = lazy(() =>
  import('./profile/page').then(a => ({
    default: a.ProfilePage
  }))
);

export const routesPath = {
  home: '/',
  join: {
    login: '/join',
    registration: '/join/registration'
  },
  profile: '/profile'
};

const createRoutes = [
  {
    path: routesPath.home,
    component: CreateLinkMainPage,
    exact: true
  },

  {
    path: routesPath.join.login,
    component: LoginPage,
    exact: true
  },

  {
    path: routesPath.join.registration,
    component: RegistrationPage,
    exact: true
  },

  {
    path: routesPath.profile,
    component: ProfilePage,
    exact: true
  },

  {
    component: NotFoundPage
  }
];

export const Routes = () => renderRoutes(createRoutes);
