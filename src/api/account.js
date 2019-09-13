import { request } from 'lib/request';
import { accountError } from './account.errors';

/**
 * Create New Account
 * @param { { email: string, password: string } } body - User data
 * @returns {Promise<{ token: string, user: { email: string } }>}
 */
const createAccount = body =>
  request('POST', '/account', { body }).catch(accountError);

/**
 * Settings for created links
 * @param {*} body
 */
const optionsLink = body =>
  request('POST', '/account/linkSettings', { body }).catch(accountError);

/**
 * Getting a list of user links, with a starting index of 0, the number of user links is returned
 * @param {number} startIndex
 * @returns {Promise<{ count?: number, links: [{ url: string, originalUrl: string, transition?: number, createdAt: Date }]>}
 */
const links = (startIndex, count = false) =>
  request(
    'GET',
    `/account/links?offset=${startIndex}&count=${count ? 1 : 0}`
  ).catch(accountError);

export const accountAPI = { createAccount, optionsLink, links };
