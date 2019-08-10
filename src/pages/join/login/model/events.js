//@flow
import { createEffect, createEvent } from 'effector';

import { createFetching } from 'lib/fetching';
import type { Session } from 'features/common';

export const emailChange = createEvent<SyntheticEvent<HTMLInputElement>>();
export const passwordChange = createEvent<SyntheticEvent<HTMLInputElement>>();
export const formSubmitted = createEvent<void>();

export type loginData = {
  email: string,
  password: string
};

type responseOk = { token: string, user: Session };

export const loginProcessing = createEffect<loginData, responseOk, *>();

export const loginFetching = createFetching<loginData, responseOk, *, *>(
  loginProcessing
);
