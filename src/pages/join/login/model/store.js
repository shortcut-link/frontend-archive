import { createStore, createStoreObject, combine } from 'effector';
import { emailValidator, passwordValidator } from 'lib/validators';
import { loginFetching } from './events';

/* Email */
export const $email = createStore('');
export const $emailError = $email.map(email => emailValidator(email));
const $isEmailCurrent = $emailError.map(email => email === null);

/* Password */
export const $password = createStore('');
export const $passwordError = $password.map(password =>
  passwordValidator(password)
);
const $isPasswordCurrent = $passwordError.map(password => password === null);

/* Captcha */
export const $captcha = createStore(false);

/* Form */
export const $form = createStoreObject({
  email: $email,
  password: $password
});

const $isFormValid = combine(
  $isEmailCurrent,
  $isPasswordCurrent,
  $captcha,
  (email, password, captcha) => email && password && captcha
);

export const $isFormDisabled = loginFetching.isLoading;

export const $isSubmitEnabled = combine(
  $isFormValid,
  $isFormDisabled,
  (isFormValid, isFormDisabled) => isFormValid && !isFormDisabled
);
