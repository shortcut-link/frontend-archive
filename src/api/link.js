import { request } from 'features/common';
import { linkError } from './link.errors';

/**
 * Getting data about the current user session
 * @returns { Promise<{ user: { email: string } }> }
 */
const createLink = url =>
  request('POST', '/link', { body: { url } }).catch(linkError);

export const linkAPI = {
  createLink
};
