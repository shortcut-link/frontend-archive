import { request } from 'features/common';

// TODO: Comment api
const createSession = body => request('POST', '/account/session', { body });

export const sessionAPI = {
  createSession
};
