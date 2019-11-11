const emailRegular = /.+@.+\..+/i;
const passwordRegular = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/;
const UrlRegexp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
const urlShortened = /(^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?(localhost:8080\/)(.{7})$)|^(.{7}$)/;

export const emailValidator = (email: string) =>
  emailRegular.test(email) ? null : 'Please, enter correct email';

export const passwordValidator = (password: string) =>
  passwordRegular.test(password)
    ? null
    : 'Your password should include at least uppercase, lowercase, number and special symbol';

export const passwordConfirmationValidator = (
  firstPassword: string,
  secondPassword: string
) =>
  firstPassword === secondPassword
    ? null
    : 'Your password in two fields must match';

export const urlValidator = (url: string) =>
  UrlRegexp.test(url)
    ? null
    : 'Url must be in the format: example.com, https://example.com';

export const urlShortenedValidator = (url: string) =>
  urlShortened.test(url)
    ? null
    : 'Url must be in the format: localhost:8080/123456, 123456';
