//@flow
import { createStore, createStoreObject, combine } from 'effector';

import { loginFetching } from './login.events';
import { emailValidator, passwordValidator } from './validations';

export const $email = createStore<string>('');
export const $emailError = $email.map<string | null>(email =>
  emailValidator(email)
);

export const $password = createStore<string>('');
export const $passwordError = $password.map<string | null>(password =>
  passwordValidator(password)
);

export const $form = createStoreObject({
  email: $email,
  password: $password
});

const $isEmailCurrent = $emailError.map(email => email === null);
const $isPasswordCurrent = $passwordError.map(password => password === null);

const $isFormValid = combine(
  $isEmailCurrent,
  $isPasswordCurrent,
  (email, password) => email && password
);

export const $isFormDisabled = loginFetching.isLoading;

export const $isSubmitEnabled = combine<boolean, boolean, boolean>(
  $isFormValid,
  $isFormDisabled,
  (isFormValid, isLoginFetching) => isFormValid && !isLoginFetching
);
