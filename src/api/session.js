import { request } from 'features/common';
import { sessionError } from './session.errors';

/**
 * Creates a user session based on user data
 * @param { { email: string, password: string } } body - User data
 * @returns {Promise<{ token: string, user: { email: string } }>}
 */
const createSession = body =>
  request('POST', '/account/session/', {
    body
  }).catch(sessionError);

/**
 * Getting data about the current user session
 * @returns { Promise<{ user: { email: string } }> }
 */
const getSession = () =>
  request('GET', '/account/session/').catch(sessionError);

export const sessionAPI = {
  createSession,
  getSession
};
