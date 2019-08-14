import { $token } from '../model/token';

const baseURI = '/api';

export const request = (method, url, options = {}) => {
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

const createContentType = options => {
  const header = contentTypeFromOptions(options);

  return header ? { 'Content-Type': header } : {};
};

const contentTypeFromOptions = options => {
  if (options && options.headers && options.headers['Content-Type']) {
    return options.headers['Content-Type'];
  }

  if (options && options.body && options.body instanceof FormData) {
    return 'multipart/form-data';
  }

  return typeof options.body === 'object' ? 'application/json' : '';
};

const createAuthorization = token =>
  token ? { Authorization: `bearer ${token}` } : {};

const createBody = (options, headers) => {
  const contentType = headers.get('content-type');

  if (options.body && contentType && contentType.includes('json')) {
    return JSON.stringify(options.body);
  }

  if (options.body instanceof FormData) {
    return options.body;
  }

  return undefined;
};

function responseToPromise(response) {
  return response && typeof response.ok === 'boolean'
    ? okToPromise(response)
    : response;
}

function okToPromise(response) {
  return response.ok
    ? Promise.resolve(response.result)
    : Promise.reject(response.error);
}
