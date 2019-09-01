export const switchError = error => {
  switch (error) {
    case 'not_valid_url':
    default:
      return 'Got an unexpected error. Try again later';
  }
};

export const linkError = error => Promise.reject(switchError(error));
