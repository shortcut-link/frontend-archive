import { createEvent, createEffect } from 'effector';
import { createFetching } from 'lib/fetching';

export const linkChange = createEvent();
export const linkRemove = createEvent();
export const formSubmitted = createEvent();

export const createLinkProcessing = createEffect();
export const createLinkFetching = createFetching(createLinkProcessing);
