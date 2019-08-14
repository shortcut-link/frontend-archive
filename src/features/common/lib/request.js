//@flow
import { $token } from '../model/token';
import type { Method, Options, CustomResponse } from './type';

const baseURI = '/api';

export const request = (
  method: Method,
  url: string,
  options: Options = {}
): Promise<any> => {
  const token = $token.getState();

  const headers = new Headers({
    ...createContentType(options),
    ...createAuthorization(token),
    ...options.headers
  });

  const uri = `${options.baseURI || baseURI}${url}`;

  const { body, ...restOptions } = options;

  const config = new Request(uri, {
    method,
    headers,
    ...restOptions,
    body: createBody(options, headers)
  });

  return fetch(config).then(response => {
    if (options.parse === 'text') {
      return response.text;
    }

    if (options.parse === 'noparse') {
      return response.text;
    }

    const contentType = response.headers.get('Content-Type');

    if (contentType && contentType.includes('json')) {
      return response.json().then(responseToPromise, responseToPromise);
    }

    throw new TypeError('Unexpected content-type');
  });
};

const createContentType = (options: Options) => {
  const header = contentTypeFromOptions(options);

  return header ? { 'Content-Type': header } : {};
};

const contentTypeFromOptions = (options: Options) => {
  if (options && options.headers && options.headers['Content-Type']) {
    return options.headers['Content-Type'];
  }

  if (options && options.body && options.body instanceof FormData) {
    return 'multipart/form-data';
  }

  return typeof options.body === 'object' ? 'application/json' : '';
};

const createAuthorization = (token: ?string) =>
  token ? { Authorization: `bearer ${token}` } : {};

const createBody = (
  options: Options,
  headers: Headers
): FormData | string | void => {
  const contentType = headers.get('content-type');

  if (options.body && contentType && contentType.includes('json')) {
    return JSON.stringify(options.body);
  }

  if (options.body instanceof FormData) {
    return options.body;
  }

  return undefined;
};

function responseToPromise<R, E>(response: CustomResponse<R, E>) {
  return response && typeof response.ok === 'boolean'
    ? okToPromise<R, E>(response)
    : response;
}

function okToPromise<R, E>(response: CustomResponse<R, E>): Promise<R> {
  return response.ok
    ? Promise.resolve(response.result)
    : Promise.reject(response.error);
}
