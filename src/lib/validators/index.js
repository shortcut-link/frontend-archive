const emailRegular = /.+@.+\..+/i;
const passwordRegular = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/;

export const emailValidator = value =>
  emailRegular.test(value) ? null : 'Please, enter correct email';

export const passwordValidator = value =>
  passwordRegular.test(value)
    ? null
    : 'Your password should include at least uppercase, lowercase, number and special symbol';

export const passwordConfirmationValidator = (first, second) =>
  first === second ? null : 'Your password in two fields must match';
