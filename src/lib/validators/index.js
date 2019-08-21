const emailRegular = /.+@.+\..+/i;
const passwordRegular = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/;
const UrlRegexp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

export const emailValidator = value =>
  emailRegular.test(value) ? null : 'Please, enter correct email';

export const passwordValidator = value =>
  passwordRegular.test(value)
    ? null
    : 'Your password should include at least uppercase, lowercase, number and special symbol';

export const passwordConfirmationValidator = (first, second) =>
  first === second ? null : 'Your password in two fields must match';

export const urlValidator = value =>
  UrlRegexp.test(value)
    ? null
    : 'Url must be in the format: example.com, https://example.com';
