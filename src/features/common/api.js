import { request } from './lib/request';

/**
 * Getting data about the current user session
 * @return {Promise<{ user: { email: string, displayName?: string, id: number } }>}
 */
const getCurrentAccount = () => request('GET', '/account/session/');

export const commonAPI = { getCurrentAccount };
