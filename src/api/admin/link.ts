import { request } from 'lib/request';
import { linkError } from '../link.errors';
import { Link, LinkParameter, LinkParameterValue } from '../link';

export interface FoundLink extends Link {
  user: string;
}

const find = (url: string) =>
  request<FoundLink>('GET', `/admin/link/find?url=${url}`).catch(linkError);

const changeParameter = (
  url: string,
  parameter: LinkParameter,
  value: LinkParameterValue
) =>
  request<void>(
    'POST',
    `/admin/link/parameter?url=${url}&parameter=${parameter}`,
    {
      body: { value }
    }
  );

const remove = (url: string) =>
  request<void>('DELETE', `/admin/link?url=${url}`).catch(linkError);

export const adminLinkAPI = { find, changeParameter, remove };
