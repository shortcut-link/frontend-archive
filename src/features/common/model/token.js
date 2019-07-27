//@flow
import Cookies from 'browser-cookies';
import { createStore, createEvent } from 'effector';

const TOKEN_ID = 'sc-token';

export const tokenChanged = createEvent<string>();
export const tokenRemove = createEvent<void>();

export const $token = createStore<?string>(Cookies.get(TOKEN_ID) || null);

$token.on(tokenChanged, (_, token) => token).reset(tokenRemove);

$token.watch(token => {
  if (token) {
    Cookies.set(TOKEN_ID, token);
  }
});

tokenRemove.watch(() => Cookies.erase(TOKEN_ID));
