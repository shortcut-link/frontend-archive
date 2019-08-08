//@flow
import { createEvent, createEffect, type Effect } from 'effector';

import { createFetching } from 'lib/fetching';
import type { ResponseOk, ResponseError, Session } from 'features/common';

export const emailChange = createEvent<string>();
export const passwordChange = createEvent<string>();
export const formSubmitted = createEvent<void>();

type FetchOk = ResponseOk<{ token: string, user: Session }>;
type FetchError = ResponseError<{ error: string }>;

export const loginProcessing: Effect<
  void,
  FetchOk,
  FetchError
> = createEffect();

export const loginFetching = createFetching<void, FetchOk, FetchError, void>(
  loginProcessing
);
