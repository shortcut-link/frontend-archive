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
export type LinkParameterValue = string | boolean | number;

const changeParameter = (
  url: string,
  parameter: LinkParameter,
  value: LinkParameterValue
) =>
  request<void>('POST', `/link/parameter?url=${url}&parameter=${parameter}`, {
    body: { value }
  });

export const linkAPI = {
  create,
  remove,
  changeParameter
};
