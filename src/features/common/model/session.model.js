import { forward } from 'effector';

import { $session } from './session.store';
import {
  sessionFetchProcessing,
  sessionRemove,
  sessionChange
} from './session.events';
import { tokenRemove } from './token';
import { commonAPI } from '../api';

$session
  .on(sessionFetchProcessing.done, (_, { result: { user } }) => user)
  .on(sessionFetchProcessing.fail, () => null)
  .on(sessionChange, (_, user) => user)
  .reset(sessionRemove);

sessionFetchProcessing.use(() => commonAPI.getCurrentAccount());

forward({ from: sessionFetchProcessing.fail, to: tokenRemove });
forward({ from: sessionRemove, to: tokenRemove });
