import { createStore, combine, createStoreObject } from 'effector';

import {
  emailValidator,
  passwordValidator,
  passwordConfirmationValidator
} from 'lib/validators';
import { registrationFetching } from './events';

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

/* PasswordConfirmation */
export const $passwordConfirmation = createStore('');
export const $passwordConfirmationError = combine(
  $password,
  $passwordConfirmation,
  (first, second) => second && passwordConfirmationValidator(first, second)
);
const $isPasswordConfirmationdCurrent = $passwordConfirmationError.map(
  password => password === null
);

/* Form */
export const $form = createStoreObject({
  email: $email,
  password: $password
});

const $isFormValid = combine(
  $isEmailCurrent,
  $isPasswordCurrent,
  $isPasswordConfirmationdCurrent,
  (email, password, passwordConfirmation) =>
    email && password && passwordConfirmation
);

export const $isFormDisabled = registrationFetching.isLoading;

export const $isSubmitEnabled = combine(
  $isFormValid,
  $isFormDisabled,
  (isFormValid, isFormDisabled) => isFormValid && !isFormDisabled
);
