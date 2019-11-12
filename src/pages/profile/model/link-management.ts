import { createStore, createEvent } from 'effector';

import { changeLinkOptions, removeLink } from './links';

export const openLinkManagement = createEvent<number>();
export const closeLinkManagement = createEvent<void>();
export const changeLinkParameter = createEvent<string>();

export const $idManagementLinks = createStore<number | null>(null);

$idManagementLinks.on(openLinkManagement, (_, id) => id);
$idManagementLinks.reset(closeLinkManagement, removeLink);

changeLinkParameter.watch(property => {
  const idLink = $idManagementLinks.getState();

  changeLinkOptions({ id: idLink, property });
});
