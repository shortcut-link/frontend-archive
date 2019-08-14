import { createEffect, createEvent } from 'effector';

export const sessionFetchProcessing = createEffect();

export const sessionChange = createEvent();
export const sessionRemove = createEvent();
