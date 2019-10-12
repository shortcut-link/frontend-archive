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

export interface getLinksResponse {
  count: number;
  links: Array<Link>;
}

const getLinks = (
  startIndex: number,
  count: number
): Promise<getLinksResponse> =>
  request('GET', `/account/links?offset=${startIndex}&count=${count}`).catch(
    accountError
  );
//TODO: убрать общий экспорт
export const accountAPI = {
  create,
  changeOptionsCreatedLink,
  getLinks
};
