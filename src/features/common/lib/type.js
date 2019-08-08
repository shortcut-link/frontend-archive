//@flow
export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type Options = {
  headers?: { [key: string]: string },
  parse?: 'text' | 'json' | 'noparse',
  baseURI?: string,
  body?: string | FormData | mixed
};

export type ResponseOk<R> = {
  ok: true,
  result: R
};

export type ResponseError<E> = {
  ok: false,
  error: E
};

export type CustomResponse<R, E> = ResponseOk<R> | ResponseError<E>;
