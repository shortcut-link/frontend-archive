import { forward } from 'effector';

import { $session } from './session.store';
import {
  sessionFetchProcessing,
  sessionRemove,
  sessionChange,
  optionsChange
} from './session.events';
import { tokenRemove } from './token';
import { sessionAPI } from 'api/session';

$session
  .on(sessionFetchProcessing.done, (_, { result: { user } }) => user)
  .on(sessionFetchProcessing.fail, () => null)
  .on(sessionChange, (_, user) => user)
  .on(optionsChange, (user, options) => ({ ...user, ...options }))
  .reset(sessionRemove);

sessionFetchProcessing.use(sessionAPI.getSession);

forward({ from: sessionFetchProcessing.fail, to: tokenRemove });
forward({ from: sessionRemove, to: tokenRemove });
