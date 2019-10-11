import Cookies from 'browser-cookies';
import { createStore, createEvent } from 'effector';

const TOKEN_ID = 'sc-token';

export const tokenChange = createEvent<string>();
export const tokenRemove = createEvent<void>();

export const $token = createStore<string>(Cookies.get(TOKEN_ID) || null);

$token.on(tokenChange, (_, token) => token).reset(tokenRemove);

tokenChange.watch(token => Cookies.set(TOKEN_ID, token, { expires: 365 }));

tokenRemove.watch(() => Cookies.erase(TOKEN_ID));
