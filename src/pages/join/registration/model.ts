import { SyntheticEvent } from 'react';
import {
  createEffect,
  createEvent,
  createStore,
  combine,
  createStoreObject
} from 'effector';

import { createFetching } from 'lib/fetching';
import { accountAPI } from 'api/account';
import { sessionAPI, CreateResponse } from 'api/session';
import { tokenChange, trimEvent } from 'features/common';
import { history } from 'lib/routing';
import {
  emailValidator,
  passwordValidator,
  passwordConfirmationValidator
} from 'lib/validators';

export interface RegisterData {
  email: string;
  password: string;
}

export const emailChange = createEvent<SyntheticEvent<HTMLInputElement>>();
export const passwordChange = createEvent<SyntheticEvent<HTMLInputElement>>();
export const passwordConfirmationChange = createEvent<
  SyntheticEvent<HTMLInputElement>
>();
export const formSubmitted = createEvent<void>();
export const captchaPassed = createEvent<void>();

export const registrationProcessing = createEffect<
  RegisterData,
  CreateResponse
>();

export const registrationFetching = createFetching(registrationProcessing);

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
  $isPasswordConfirmationdCurrent,
  $captcha,
  (email, password, passwordConfirmation, captcha) =>
    email && password && passwordConfirmation && captcha
);

export const $isFormDisabled = registrationFetching.isLoading;

export const $isSubmitEnabled = combine(
  $isFormValid,
  $isFormDisabled,
  (isFormValid, isFormDisabled) => isFormValid && !isFormDisabled
);

$email.on(emailChange.map(trimEvent), (_, email) => email);

$password.on(passwordChange.map(trimEvent), (_, password) => password);

$passwordConfirmation.on(
  passwordConfirmationChange.map(trimEvent),
  (_, passwordConfirmation) => passwordConfirmation
);

$captcha.on(captchaPassed, () => true);

formSubmitted.watch(() => {
  if (!$isSubmitEnabled.getState()) return;

  const form = $form.getState();
  registrationProcessing(form);
});

registrationProcessing.use(form =>
  accountAPI.create(form).then(() => sessionAPI.create(form))
);

registrationProcessing.done.watch(({ result: { token } }) => {
  tokenChange(token);
  history.push('/');
});
