import { createEffect, createEvent, type Effect, type Event } from 'effector';

import type { Session } from './session.store';

export const sessionFetchProcessing: Effect<void, Session> = createEffect();

export const sessionChange = createEvent();
export const sessionRemove: Event<*> = createEvent();
