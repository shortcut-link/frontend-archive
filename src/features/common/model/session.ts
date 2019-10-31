import { createEffect, createEvent, createStore, forward } from 'effector';

import { GetResponse, sessionAPI } from 'api/session';
import { User } from 'api/account';
import { tokenRemove } from './token';

export type options = { [key: string]: boolean };

export const sessionChange = createEvent<User>();
export const sessionRemove = createEvent<void>();
export const sessionFetchProcessing = createEffect<void, GetResponse>();
export const optionsChange = createEvent<options>();

export const $session = createStore<User | null>(null);

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
