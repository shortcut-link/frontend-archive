import {
  $email,
  $password,
  $passwordConfirmation,
  $form,
  $captcha
} from './store';
import {
  emailChange,
  passwordChange,
  passwordConfirmationChange,
  formSubmitted,
  registrationProcessing,
  captchaPassed
} from './events';
import { $isSubmitEnabled } from './store';
import { accountAPI } from 'api/account';
import { tokenChange, sessionChange } from 'features/common';
import { history } from 'lib/routing';

const trimEvent = event => event.currentTarget.value.trim();

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

registrationProcessing.use(accountAPI.create);

registrationProcessing.done.watch(({ result: { token, user } }) => {
  tokenChange(token);
  sessionChange(user);
  history.push('/');
});
