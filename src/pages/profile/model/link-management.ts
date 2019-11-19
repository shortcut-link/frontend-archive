import { createStore, createEvent } from 'effector';

import { editLink, removeLink } from './links';
import { ParametersType } from 'lib/link-management';

export const openLinkManagement = createEvent<number>();
export const closeLinkManagement = createEvent<void>();
export const changeLinkParameter = createEvent<ParametersType>();

export const $idManagementLinks = createStore<number | null>(null);

$idManagementLinks.on(openLinkManagement, (_, id) => id);
$idManagementLinks.reset(closeLinkManagement, removeLink);

changeLinkParameter.watch(parameter => {
  const idLink = $idManagementLinks.getState();

  editLink({ idLink, parameter });
});
