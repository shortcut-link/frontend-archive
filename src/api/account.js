import { request } from 'lib/request';
import { accountError } from './account.errors';

/**
 * Create New Account
 * @param { { email: string, password: string } } form - User data
 * @returns {Promise<{ token: string, user: { email: string } }>}
 */
const create = form =>
  request('POST', '/account', { body: form }).catch(accountError);

/**
 * Settings for created links
 * @param {{ linkTransitions?: boolean }} field
 */
const changeOptionsCreatedLink = field =>
  request('POST', '/account/linkSettings', { body: field }).catch(accountError);

/**
 * Getting a list of user links, with a starting index of 0,
 * the number of user links is returned
 * @param {number} startIndex
 * @returns {Promise<{ count?: number, links: [{ url: string, originalUrl: string, transition?: number, createdAt: Date }]>}
 */
const getLinks = (startIndex, count = false) =>
  request(
    'GET',
    `/account/links?offset=${startIndex}&count=${count ? 1 : 0}`
  ).catch(accountError);

export const accountAPI = {
  create,
  changeOptionsCreatedLink,
  getLinks
};
