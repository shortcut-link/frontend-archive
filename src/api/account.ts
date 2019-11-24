import { request } from 'lib/request';
import { accountError } from './account.errors';
import { Link } from './link';
import { RegisterData } from 'pages/join/registration/model';

export interface User {
  [key: string]: any;
  email: string;
  linkTransitions: boolean;
  admin?: boolean;
}

const create = (registerData: RegisterData) =>
  request<void>('PUT', '/account', { body: registerData }).catch(accountError);

export type ParameterCreatedLink = 'linkTransitions';

const changeOptionsCreatedLink = (
  parameter: ParameterCreatedLink,
  value: boolean
) =>
  request<void>('POST', '/account/linkSettings', {
    body: { parameter, value }
  }).catch(accountError);

export interface GetCountLinksResponse {
  count: number;
}

const getCountLinks = () =>
  request<GetCountLinksResponse>('GET', '/account/count-links').catch(
    accountError
  );

export interface GetLinksResponse {
  links: Array<Link>;
}

const getLinks = (startIndex: number, stopIndex: number) =>
  request<GetLinksResponse>(
    'GET',
    `/account/links?startIndex=${startIndex}&stopIndex=${stopIndex}`
  ).catch(accountError);

export const accountAPI = {
  create,
  changeOptionsCreatedLink,
  getLinks,
  getCountLinks
};
