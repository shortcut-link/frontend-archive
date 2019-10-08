import { request } from 'lib/request';
import { accountError } from './account.errors';
import { Link } from './link';

export interface User {
  email: string;
}

interface RegisterData {
  email: string;
  password: string;
}

const create = (
  registerData: RegisterData
): Promise<{ token: string; user: User }> =>
  request('POST', '/account', { body: registerData }).catch(accountError);

interface OptionsCreatedLink {
  linkTransitions?: boolean;
}

const changeOptionsCreatedLink = (field: OptionsCreatedLink): Promise<void> =>
  request('POST', '/account/linkSettings', { body: field }).catch(accountError);

interface getLinksResponse {
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
