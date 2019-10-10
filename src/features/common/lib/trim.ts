import { SyntheticEvent } from 'react';

export const trimEvent = (event: SyntheticEvent<HTMLInputElement>) =>
  event.currentTarget.value.trim();
