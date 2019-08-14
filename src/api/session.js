import { request } from 'features/common';

const createSession = body =>
  request('POST', '/account/session/', {
    body
  });

export const sessionAPI = {
  createSession
};
