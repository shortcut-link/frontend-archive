import { history } from 'lib/routing';
import { tokenChange, sessionChange } from 'features/common';
import { sessionAPI } from 'api/session';
import { $email, $password, $isSubmitEnabled, $form, $captcha } from './store';
import {
  emailChange,
  passwordChange,
  formSubmitted,
  loginProcessing,
  captchaPassed
} from './events';

const trimEvent = event => event.currentTarget.value.trim();

$email.on(emailChange.map(trimEvent), (_, email) => email);
$password.on(passwordChange.map(trimEvent), (_, password) => password);

$captcha.on(captchaPassed, () => true);

formSubmitted.watch(() => {
  if (!$isSubmitEnabled.getState()) return;

  const form = $form.getState();
  loginProcessing(form);
});

loginProcessing.use(dataForm => sessionAPI.createSession(dataForm));

loginProcessing.done.watch(({ result: { token, user } }) => {
  tokenChange(token);
  sessionChange(user.email);
  history.push('/');
});
