import { request } from 'lib/request';
import { sessionError } from './session.errors';
import { LoginData } from 'pages/join/login/model';
import { User } from './account';

const create = (loginData: LoginData): Promise<{ token: string; user: User }> =>
  request('POST', '/account/session', {
    body: loginData
  }).catch(sessionError);

export type GetResponse = Promise<User>;

const get = (): GetResponse => request('GET', '/account/session');

export const sessionAPI = {
  create,
  get
};
