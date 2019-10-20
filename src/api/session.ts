import { request } from 'lib/request';
import { sessionError } from './session.errors';
import { LoginData } from 'pages/join/login/model';
import { User } from './account';

export interface CreateResponse {
  token: string;
  user: User;
}

const create = (loginData: LoginData) =>
  request<CreateResponse>('POST', '/account/session', {
    body: loginData
  }).catch(sessionError);

export interface GetResponse {
  user: User;
}

const get = () => request<GetResponse>('GET', '/account/session');

export const sessionAPI = {
  create,
  get
};
