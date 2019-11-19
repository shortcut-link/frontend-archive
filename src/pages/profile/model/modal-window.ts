import { createStore, createEvent } from 'effector';

import { editLink, removeLink } from './links';
import { ParametersType } from 'lib/link-management';

export const openLinkManagementWindow = createEvent<number>();
export const closeLinkManagementWindow = createEvent<void>();
export const changeLinkParameter = createEvent<ParametersType>();

export const $idManagementLink = createStore<number | null>(null);

$idManagementLink.on(openLinkManagementWindow, (_, id) => id);
$idManagementLink.reset(closeLinkManagementWindow, removeLink);

changeLinkParameter.watch(parameter => {
  const idLink = $idManagementLink.getState();

  editLink({ idLink, parameter });
});
