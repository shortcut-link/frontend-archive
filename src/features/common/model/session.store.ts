import { createStore } from 'effector';
import { User } from 'api/account';

export const $session = createStore<User | null>(null);
