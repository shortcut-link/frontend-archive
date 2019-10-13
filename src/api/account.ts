import { request } from 'lib/request';
import { accountError } from './account.errors';
import { Link } from './link';
import { RegisterData } from 'pages/join/registration/model';

export interface User {
  email: string;
  linkTransitions: boolean;
  [key: string]: any;
}

export interface CreateResponse {
  token: string;
  user: User;
}

const create = (registerData: RegisterData): Promise<CreateResponse> =>
  request('POST', '/account', { body: registerData }).catch(accountError);

interface OptionsCreatedLink {
  linkTransitions?: boolean;
}

const changeOptionsCreatedLink = (field: OptionsCreatedLink): Promise<void> =>
  request('POST', '/account/linkSettings', { body: field }).catch(accountError);

export interface GetCountLinksResponse {
  count: number;
}

const getCountLinks = (): Promise<GetCountLinksResponse> =>
  request('GET', '/account/count-links').catch(accountError);

export interface getLinksResponse {
  links: Array<Link>;
}

const getLinks = (
  startIndex: number,
  stopIndex: number
): Promise<getLinksResponse> =>
  request(
    'GET',
    `/account/links?startIndex=${startIndex}&stopIndex=${stopIndex}`
  ).catch(accountError);

export const accountAPI = {
  create,
  changeOptionsCreatedLink,
  getLinks,
  getCountLinks
};
