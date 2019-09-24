import { createStore, createEvent, createEffect } from 'effector';

import { createFetching } from 'lib/fetching';
import { $linkManagement, openlinkManagement } from './link-management';
import { accountAPI } from 'api/account';

export const getLinks = createEvent();
export const addLinks = createEvent();
export const removeLinks = createEvent();
export const removeLink = createEvent();
export const changeLink = createEvent();
export const downloadLinksProcessing = createEffect();
export const downloadLinksFetching = createFetching(downloadLinksProcessing);
export const addCountUserLinks = createEvent();

export const $links = createStore([]);
export const $countUserLinks = createStore(0);

$links.on(addLinks, (allLinks, newLinks) => [...allLinks, ...newLinks]);
$links.on(removeLink, (allLinks, { id }) => {
  allLinks.splice(id, 1);
  return allLinks;
});
$links.on(changeLink, (allLinks, { id, options }) => {
  allLinks[id] = { ...allLinks[id], ...options };

  return allLinks;
});
$links.reset(removeLinks);

$countUserLinks.on(addCountUserLinks, (_, count) => count);
$countUserLinks.on(removeLink, count => count - 1);
$countUserLinks.on(removeLink, count => count - 1);

$linkManagement.on(openlinkManagement, (_, id) => id);

getLinks.watch(({ startIndex, count }) => {
  const loading = downloadLinksFetching.isLoading;
  if (loading.getState()) return;

  downloadLinksProcessing({ startIndex, count });
});

downloadLinksProcessing.use(({ startIndex, count }) => {
  return accountAPI.getLinks(startIndex, count);
});

downloadLinksProcessing.done.watch(({ result: { links, count } }) => {
  addLinks(links);
  count && addCountUserLinks(count);
});
