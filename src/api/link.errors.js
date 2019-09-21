export const switchError = ({ message }) => {
  switch (message) {
    case 'not_valid_url':
    default:
      return 'Got an unexpected error. Try again later';
  }
};

export const linkError = error => Promise.reject(switchError(error));
