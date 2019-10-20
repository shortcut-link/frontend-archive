import { ErrorResponse } from 'lib/request';

export const sessionError = ({ message }: ErrorResponse) => {
  let textError;

  switch (message) {
    case 'user_not_found':
      textError = 'Email not found or password is wrong';
      break;
    case 'not_valid_email':
      textError = 'Enter email in the format example@example.com';
      break;
    case 'not_correct_data':
      textError = 'Mail or password are incorrect';
      break;
    default:
      textError = 'Got an unexpected error. Try again later';
  }

  return Promise.reject(textError);
};
