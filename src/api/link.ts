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

export interface LinkOptions {
  tracking?: boolean;
}

const changeUserLinkOptions = (url: string, options: LinkOptions) =>
  request<void>('POST', '/link/options', { body: { url, options } });

const find = (url: string) =>
  request<void>('GET', `/link/find?url=${url}`).catch(linkError);

export const linkAPI = {
  create,
  remove,
  changeUserLinkOptions,
  find
};
