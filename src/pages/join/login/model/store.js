//@flow
import { createStore, createStoreObject, combine, type Store } from 'effector';
import { emailValidator, passwordValidator } from 'lib/validators';
import { loginFetching } from './events';

export const $email = createStore<string>('');
export const $emailError = $email.map<string | null>(email =>
  emailValidator(email)
);
const $isEmailCurrent = $emailError.map<boolean>(email => email === null);

export const $password = createStore<string>('');
export const $passwordError = $password.map<string | null>(password =>
  passwordValidator(password)
);
const $isPasswordCurrent = $passwordError.map<boolean>(
  password => password === null
);

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

export const $isSubmitEnabled: Store<boolean> = combine(
  $isFormValid,
  $isFormDisabled,
  (isFormValid, isLoginFetching) => isFormValid && !isLoginFetching
);
