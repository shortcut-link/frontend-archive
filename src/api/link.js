import { request } from 'lib/request';
import { linkError } from './link.errors';

/**
 * Getting data about the current user session
 * @returns { Promise<{ user: { email: string } }> }
 */
const createLink = url =>
  request('POST', '/link', { body: { url } }).catch(linkError);

/**
 * Change link options
 * @param {string} id
 * @param { { tracking?: string } } options
 */
const optionsLink = (url, options) =>
  request('POST', '/link/options', { body: { url, options } });

export const linkAPI = {
  createLink,
  optionsLink
};
