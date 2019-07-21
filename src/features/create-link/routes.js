//@flow
import { RoutesConfig } from 'lib/routing';
// pages
import { CreateLinkMainPage } from './pages/main';

export const CreateLinkRoutes = (): RoutesConfig => [
  {
    path: '/',
    exact: true,
    component: CreateLinkMainPage
  }
];
