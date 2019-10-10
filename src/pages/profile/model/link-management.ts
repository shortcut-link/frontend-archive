import { createStore, createEvent } from 'effector';

import { changeLinkOptions, removeLink } from './links';
export const openLinkManagement = createEvent<number>();
export const closeLinkManagement = createEvent<void>();
export const changeLinkParameter = createEvent<string>();

export const $linkManagement = createStore<number>(null);

$linkManagement.on(openLinkManagement, (_, id) => id);
$linkManagement.reset(closeLinkManagement, removeLink);

changeLinkParameter.watch(property => {
  const idLink = $linkManagement.getState();

  changeLinkOptions({ id: idLink, property });
});
