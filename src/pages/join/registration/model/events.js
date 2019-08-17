import { createEffect, createEvent } from 'effector';

import { createFetching } from 'lib/fetching';

export const emailChange = createEvent();
export const passwordChange = createEvent();
export const passwordConfirmationChange = createEvent();
export const formSubmitted = createEvent();
export const captchaPassed = createEvent();

export const registrationProcessing = createEffect();

export const registrationFetching = createFetching(registrationProcessing);
