import { createEffect, createEvent } from 'effector';

import { createFetching } from 'lib/fetching';

export const emailChange = createEvent();
export const passwordChange = createEvent();
export const formSubmitted = createEvent();
export const captchaPassed = createEvent();

export const loginProcessing = createEffect();

export const loginFetching = createFetching(loginProcessing);
