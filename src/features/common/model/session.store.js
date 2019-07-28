//@flow
import { createStore } from 'effector';

export type Session = {
  email: string
};

export const $session = createStore<?Session>(null);
