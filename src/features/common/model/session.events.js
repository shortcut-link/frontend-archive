import { createEffect, createEvent, type Effect, type Event } from 'effector';

import type { Session } from './session.store';

export const sessionFetch: Effect<void, Session> = createEffect();
export const sessionRemove: Event<*> = createEvent();
