import { request } from 'lib/request';
import { sessionError } from './session.errors';

/**
 * Creates a user session based on user data
 * @param { { email: string, password: string } } body - User data
 * @returns {Promise<{ token: string, user: { email: string } }>}
 */
const create = body =>
  request('POST', '/account/session', {
    body
  }).catch(sessionError);

/**
 * Getting data about the current user session
 * @returns { Promise<{ user: { email: string } }> }
 */
const get = () => request('GET', '/account/session').catch(sessionError);

export const sessionAPI = {
  create,
  get
};
