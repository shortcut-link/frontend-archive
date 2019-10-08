import { createEffect, createEvent } from 'effector';
import { GetResponse } from 'api/session';
import { User } from 'api/account';
import { options } from './session.model';

export const sessionFetchProcessing = createEffect<void, GetResponse>();

export const sessionChange = createEvent<User>();
export const sessionRemove = createEvent<void>();

export const optionsChange = createEvent<options>();
