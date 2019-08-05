//@flow
import { createBrowserHistory } from 'history';
import { RouteConfig } from 'react-router-config';

export const history = createBrowserHistory();

export type RoutesConfig = Array<RouteConfig>;
