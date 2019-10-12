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

export type options = { [key: string]: boolean };

$session
  .on(sessionFetchProcessing.done, (_, { result: { user } }) => user)
  .on(sessionChange, (_, user) => user)
  .on(optionsChange, (user, options) => ({
    ...user,
    ...options
  }))
  .reset(sessionRemove);

sessionFetchProcessing.use(sessionAPI.get);

sessionFetchProcessing.fail.watch(() => sessionRemove());

forward({ from: sessionRemove, to: tokenRemove });
