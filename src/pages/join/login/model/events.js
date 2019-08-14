//@flow
import { createEffect, createEvent } from 'effector';

import { createFetching, type Fetching } from 'lib/fetching';
import type { createSessionData } from 'api/session';
import type { responseCreateSession } from 'api/session';

export const emailChange = createEvent<SyntheticEvent<HTMLInputElement>>();
export const passwordChange = createEvent<SyntheticEvent<HTMLInputElement>>();
export const formSubmitted = createEvent<void>();

export const loginProcessing = createEffect<
  createSessionData,
  responseCreateSession,
  *
>();

export const loginFetching: Fetching<responseCreateSession, *> = createFetching(
  loginProcessing
);
