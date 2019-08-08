import { $email, $password, $isSubmitEnabled, $form } from './login.store';
import {
  emailChange,
  passwordChange,
  formSubmitted,
  loginProcessing
} from './login.events';
import { sessionApi } from '../api';
import { history } from 'lib/routing';
import { tokenChange } from 'features/common/model/token';
import { sessionChange } from 'features/common/model/session.events';

const trimEvent = event => event.target.value.trim();

$email.on(emailChange.map(trimEvent), (_, email) => email);
$password.on(passwordChange.map(trimEvent), (_, password) => password);

formSubmitted.watch(() => {
  if (!$isSubmitEnabled.getState()) return;

  const form = $form.getState();
  loginProcessing(form);
});

loginProcessing.use(dataForm => sessionApi.createSession(dataForm));

loginProcessing.done.watch(({ result: { token, user } }) => {
  tokenChange(token);
  sessionChange(user);
  history.push('/');
});
