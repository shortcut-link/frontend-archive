import { createEvent, createEffect } from 'effector';

import { createFetching } from 'lib/fetching';

export const getLinks = createEvent();
export const addLinks = createEvent();
export const removeLinks = createEvent();
export const addCountUserLinks = createEvent();

export const changeLinkParameter = createEvent();

export const downloadLinksProcessing = createEffect();
export const downloadLinksFetching = createFetching(downloadLinksProcessing);
