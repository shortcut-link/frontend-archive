import { createStore, createStoreObject, combine } from 'effector';
import { emailValidator, passwordValidator } from 'lib/validators';
import { loginFetching } from './events';

export const $email = createStore('');
export const $emailError = $email.map(email => emailValidator(email));
const $isEmailCurrent = $emailError.map(email => email === null);

export const $password = createStore('');
export const $passwordError = $password.map(password =>
  passwordValidator(password)
);
const $isPasswordCurrent = $passwordError.map(password => password === null);

export const $form = createStoreObject({
  email: $email,
  password: $password
});

const $isFormValid = combine(
  $isEmailCurrent,
  $isPasswordCurrent,
  (email, password) => email && password
);

export const $isFormDisabled = loginFetching.isLoading;

export const $isSubmitEnabled = combine(
  $isFormValid,
  $isFormDisabled,
  (isFormValid, isLoginFetching) => isFormValid && !isLoginFetching
);
