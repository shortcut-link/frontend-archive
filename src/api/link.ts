import { request } from 'lib/request';
import { linkError } from './link.errors';

export interface Link {
  url: string;
  originalUrl: string;
  transitions?: number;
  createdAt: Date;
}

export interface CreatedLink {
  url: string;
}

const create = (url: string) =>
  request<CreatedLink>('POST', '/link', { body: { url } }).catch(linkError);

const remove = (url: string) =>
  request<void>('DELETE', `/link?url=${url}`).catch(linkError);

export type LinkParameter = 'transitions';

const changeParameter = (
  url: string,
  parameter: LinkParameter,
  value: string | boolean
) =>
  request<void>('POST', `/link/parameter?url=${url}&parameter=${parameter}`, {
    body: { value }
  });

export interface FoundLink extends Link {
  user: string;
}

const find = (url: string) =>
  request<FoundLink>('GET', `/link/find?url=${url}`).catch(linkError);

export const linkAPI = {
  create,
  remove,
  changeParameter,
  find
};
