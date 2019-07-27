import { forward } from 'effector';

import { $session } from './session.store';
import { sessionFetch, sessionRemove } from './session.events';
import { tokenRemove } from './token';

$session
  .on(sessionFetch.done, (_, { result }) => result)
  .on(sessionFetch.fail, () => null)
  .reset(sessionRemove);

sessionFetch.use(() =>
  // due to lack of api
  Promise.resolve({
    result: {
      email: 'example@example.com'
    }
  })
);

forward({ from: sessionFetch.fail, to: tokenRemove });
forward({ from: sessionRemove, to: tokenRemove });
