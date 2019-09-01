export const switchError = error => {
  switch (error) {
    case 'user_not_found':
      return 'Email not found or password is wrong';
    case 'not_valid_email':
      return 'Enter email in the format example@example.com';
    case 'not_correct_data':
      return 'Mail or password are incorrect';
    case 'cant_create_session':
    case 'not_valid_token':
    default:
      return 'Got an unexpected error. Try again later';
  }
};

export const sessionError = error => Promise.reject(switchError(error));
