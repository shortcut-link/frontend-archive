import { request } from 'lib/request';
import { linkError } from './link.errors';

export interface Link {
  url: string;
  originalUrl: string;
  transition?: number;
  createdAt: Date;
}

const create = (url: string): Promise<{ url: string }> =>
  request('POST', '/link', { body: { url } }).catch(linkError);

const remove = (url: string): Promise<void> =>
  request('DELETE', `/link?url=${url}`).catch(linkError);

export interface LinkOptions {
  tracking?: boolean;
}

const changeUserLinkOptions = (
  url: string,
  options: LinkOptions
): Promise<void> =>
  request('POST', '/link/options', { body: { url, options } });

export const linkAPI = {
  create,
  remove,
  changeUserLinkOptions
};
