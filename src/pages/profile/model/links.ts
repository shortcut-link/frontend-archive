import { createStore, createEvent, createEffect } from 'effector';

import { createFetching } from 'lib/fetching';
import { accountAPI, getLinksResponse } from 'api/account';
import { linkAPI, Link } from 'api/link';

interface BootOptions {
  startIndex: number;
  count: number;
}

export const getLinks = createEvent<BootOptions>();
export const addLinks = createEvent<Array<Link>>();
export const removeLinks = createEvent<void>();
export const removeLink = createEvent<number>();
export const changeLinkOptions = createEvent<{
  id: number;
  property: string;
}>();
export const editLink = createEvent<{
  id: number;
  options: { transitions?: number };
}>();
export const downloadLinksProcessing = createEffect<
  BootOptions,
  getLinksResponse
>();
export const downloadLinksFetching = createFetching(downloadLinksProcessing);
export const addCountUserLinks = createEvent<number>();

export const $links = createStore([])
  .on(addLinks, (allLinks, newLinks) => [...allLinks, ...newLinks])
  .on(removeLink, (allLinks, id) => {
    allLinks.splice(id, 1);
    return allLinks;
  })
  .on(editLink, (allLinks, { id, options }) => {
    allLinks[id] = { ...allLinks[id], ...options };

    return allLinks;
  })
  .reset(removeLinks);

export const $countUserLinks = createStore(0)
  .on(addCountUserLinks, (_, count) => count)
  .on(removeLink, count => count - 1)
  .on(removeLink, count => count - 1);

getLinks.watch(({ startIndex, count }) => {
  const loading = downloadLinksFetching.isLoading;
  if (loading.getState()) return;

  downloadLinksProcessing({ startIndex, count });
});

downloadLinksProcessing.use(({ startIndex, count }) => {
  const countLinks = count ? 1 : 0;
  return accountAPI.getLinks(startIndex, countLinks);
});

downloadLinksProcessing.done.watch(({ result: { links, count } }) => {
  addLinks(links);
  count && addCountUserLinks(count);
});

changeLinkOptions.watch(({ id, property }) => {
  const { url, transitions } = $links.getState()[id];

  switch (property) {
    case 'tracking':
      const typeTransitionsNumber = typeof transitions === 'number';

      editLink({
        id,
        options: {
          transitions: typeTransitionsNumber ? null : 0
        }
      });

      linkAPI.changeUserLinkOptions(url, {
        tracking: typeTransitionsNumber ? false : true
      });
      break;

    case 'remove':
      const confirm = window.confirm(
        `Are you sure you want to delete the shortened link: http://localhost:8080/${url} ?`
      );

      if (confirm) {
        removeLink(id);
        linkAPI.remove(url);
      }
      break;

    default:
      break;
  }
});
