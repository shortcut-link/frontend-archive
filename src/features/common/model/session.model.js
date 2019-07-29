import { forward } from 'effector';

import { $session } from './session.store';
import { sessionFetch, sessionRemove } from './session.events';
import { tokenRemove, $token } from './token';
import { commonAPI } from '../api';

$session
  .on(sessionFetch.done, (_, { result }) => result)
  .on(sessionFetch.fail, () => null)
  .reset(sessionRemove);

sessionFetch.use(() => {
  $token.getState() && commonAPI.getCurrentAccount();
});

forward({ from: sessionFetch.fail, to: tokenRemove });
forward({ from: sessionRemove, to: tokenRemove });
