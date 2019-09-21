export const switchError = ({ message }) => {
  switch (message) {
    case 'email_already_exists':
      return 'That email already exists.';
    case 'not_valid_email':
      return 'Enter email in the format example@example.com';
    case 'cant_create_session':
    default:
      return 'Got an unexpected error. Try again later';
  }
};

export const accountError = error => Promise.reject(switchError(error));
