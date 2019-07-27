//@flow
import { createStore } from 'effector';

type Session = {
  email: string
};

export const $session = createStore<?Session>(null);
