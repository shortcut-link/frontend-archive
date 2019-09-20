import { createEvent, createEffect } from 'effector';

import { createFetching } from 'lib/fetching';

/* Links */
export const getLinks = createEvent();
export const addLinks = createEvent();
export const removeLinks = createEvent();
export const removeLink = createEvent();
export const changeLink = createEvent();

export const downloadLinksProcessing = createEffect();
export const downloadLinksFetching = createFetching(downloadLinksProcessing);

/* Count User Links */

export const addCountUserLinks = createEvent();

/* Link management */

export const openlinkManagement = createEvent();
export const closelinkManagement = createEvent();
export const changeLinkParameter = createEvent();
