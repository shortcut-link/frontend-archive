import { lazy } from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';

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
const AdminPanelPage = lazy(() =>
  import('./admin/page').then(a => ({
    default: a.AdminPanelPage
  }))
);

export const routesPath = {
  home: '/',
  join: {
    login: '/join',
    registration: '/join/registration'
  },
  profile: '/profile',
  admin: '/admin'
};

const createRoutes: Array<RouteConfig> = [
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
    path: routesPath.admin,
    component: AdminPanelPage,
    exact: true
  },

  {
    component: NotFoundPage
  }
];

export const Routes = () => renderRoutes(createRoutes);
