export const switchError = error => {
  switch (error) {
    case 'email_already_exists':
      return 'That email already exists.';
    case 'email_invalid':
      return 'Enter email in the format example@example.com';
    case 'cant_create_session':
    default:
      return 'Got an unexpected error. Try again later';
  }
};

export const accountError = error => Promise.reject(switchError(error));
