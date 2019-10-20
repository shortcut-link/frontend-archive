import { ErrorResponse } from 'lib/request';

export const linkError = ({ message }: ErrorResponse) => {
  let textError;

  switch (message) {
    default:
      textError = 'Got an unexpected error. Try again later';
  }

  return Promise.reject(textError);
};
