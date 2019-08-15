export const switchError = error => {
  switch (error) {
    case 'user_not_found':
      return 'Email not found or password is wrong';
    case 'email_invalid':
      return 'Enter email in the format example@example.com';
    case 'data_incorrect':
      return 'Mail or password are incorrect';
    case 'cant_create_session':
    default:
      return 'Got an unexpected error. Try again later';
  }
};

export const sessionError = error => Promise.reject(switchError(error));
