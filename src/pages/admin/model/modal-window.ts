import { ReactNode } from 'react';
import { createEvent, createStore } from 'effector';

export const changeWindowContent = createEvent<ReactNode>();
export const closeWindow = createEvent<void>();

export const $windowContents = createStore<ReactNode>(null);

$windowContents
  .on(changeWindowContent, (_, content) => content)
  .reset(closeWindow);
