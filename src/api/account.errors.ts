import { ErrorResponse } from 'lib/request';

export const accountError = ({ message }: ErrorResponse) => {
  let textError;

  switch (message) {
    case 'email_already_exists':
      textError = 'That email already exists.';
      break;
    case 'not_valid_email':
      textError = 'Enter email in the format example@example.com';
      break;
    default:
      textError = 'Got an unexpected error. Try again later';
  }

  return Promise.reject(textError);
};
