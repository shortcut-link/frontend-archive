import { ErrorResponse } from 'lib/request';

export const linkError = ({ message }: ErrorResponse) => {
  let textError;

  switch (message) {
    case 'link_not_found':
      textError = 'Link with this URL not found';
      break;
    default:
      textError = 'Got an unexpected error. Try again later';
  }

  return Promise.reject(textError);
};
