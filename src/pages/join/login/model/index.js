//@flow
import { history } from 'lib/routing';
import { sessionChange } from 'features/common/model/session.events';
import { tokenChange } from 'features/common/model/token';
import { sessionAPI } from 'api/session';
import { $email, $password, $isSubmitEnabled, $form } from './store';
import {
  emailChange,
  passwordChange,
  formSubmitted,
  loginProcessing
} from './events';

const trimEvent = (event: SyntheticEvent<HTMLInputElement>) =>
  event.currentTarget.value.trim();

$email.on(emailChange.map(trimEvent), (_, email) => email);
$password.on(passwordChange.map(trimEvent), (_, password) => password);

formSubmitted.watch(() => {
  if (!$isSubmitEnabled.getState()) return;

  const form = $form.getState();
  loginProcessing(form);
});

loginProcessing.use(dataForm => sessionAPI.createSession(dataForm));

loginProcessing.done.watch(({ result: { token, user } }) => {
  tokenChange(token);
  sessionChange(user);
  history.push('/');
});
