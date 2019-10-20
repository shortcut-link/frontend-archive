const baseUri = '/api';

export type ErrorResponse = {
  message: string;
  status: number;
};

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

type Options = {
  headers?: { [key: string]: string };
  parse?: 'text' | 'json' | 'noparse';
  baseUri?: string;
  body?: string | FormData | Object;
};

export const request = <R>(
  method: Method,
  url: string,
  options: Options = {}
): Promise<R> => {
  const headers = new Headers({
    ...createContentType(options),
    ...options.headers
  });

  const uri = `${options.baseUri || baseUri}${url}`;

  const { body, ...restOptions } = options;

  const config = new Request(uri, {
    method,
    headers,
    ...restOptions,
    body: createBody(options, headers)
  });

  return fetch(config).then(responseToPromise);
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

const createBody = (options: Options, headers: Headers) => {
  const contentType = headers.get('content-type');

  if (options.body && contentType && contentType.includes('json')) {
    return JSON.stringify(options.body);
  }

  if (options.body instanceof FormData) {
    return options.body;
  }

  return undefined;
};

function responseToPromise(response: Response) {
  const contentType = response.headers.get('Content-Type');
  const status = response.status;

  if (contentType && contentType.includes('json')) {
    return response
      .json()
      .then((data: any) =>
        response.ok
          ? Promise.resolve({ ...data, status })
          : Promise.reject({ ...data, status })
      );
  } else {
    return response.ok
      ? Promise.resolve({ status })
      : Promise.reject({ status });
  }
}
