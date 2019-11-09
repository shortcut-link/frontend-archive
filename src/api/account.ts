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

export interface CreateResponse {
  token: string;
}

const create = (registerData: RegisterData) =>
  request<CreateResponse>('POST', '/account', { body: registerData }).catch(
    accountError
  );

interface OptionsCreatedLink {
  linkTransitions?: boolean;
}

const changeOptionsCreatedLink = (field: OptionsCreatedLink) =>
  request<void>('POST', '/account/linkSettings', { body: field }).catch(
    accountError
  );

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
