//@flow
import { request, type Session } from 'features/common';

export type createSessionData = {
  email: string,
  password: string
};

export type responseCreateSession = { token: string, user: Session };

const createSession = (
  body: createSessionData
): Promise<responseCreateSession> =>
  request('POST', '/account/session/', {
    body
  });

export const sessionAPI = {
  createSession
};
