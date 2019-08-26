export const switchError = error => {
  switch (error) {
    default:
      return 'Got an unexpected error. Try again later';
  }
};

export const linkError = error => Promise.reject(switchError(error));
