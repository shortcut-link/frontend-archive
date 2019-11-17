import { createStore, createEvent, createEffect } from 'effector';
import { IndexRange } from 'react-virtualized';

import { createFetching } from 'lib/fetching';
import {
  accountAPI,
  GetLinksResponse,
  GetCountLinksResponse
} from 'api/account';
import { linkAPI, Link } from 'api/link';

export const getLinks = createEvent<IndexRange>();
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
export const addCountUserLinks = createEvent<number>();
export const firstLoadCountAndLinks = createEvent<void>();

export const downloadLinksProcessing = createEffect<
  IndexRange,
  GetLinksResponse
>();
export const downloadLinksFetching = createFetching(downloadLinksProcessing);
export const loadingCountLinks = createEffect<void, GetCountLinksResponse>();

export const $links = createStore([])
  .on(addLinks, (allLinks, newLinks) => {
    return [...allLinks, ...newLinks];
  })
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
  .reset(removeLinks);

getLinks.watch(params => {
  const loading = downloadLinksFetching.isLoading;
  if (loading.getState()) return;

  downloadLinksProcessing(params);
});

downloadLinksProcessing.use(({ startIndex, stopIndex }) => {
  return accountAPI.getLinks(startIndex, stopIndex);
});

downloadLinksProcessing.done.watch(({ result: { links } }) => {
  addLinks(links);
});

loadingCountLinks.use(accountAPI.getCountLinks);

firstLoadCountAndLinks.watch(async () => {
  const { count } = await loadingCountLinks();

  if (count) {
    addCountUserLinks(count);
    return downloadLinksProcessing({ startIndex: 0, stopIndex: 30 });
  }
});

changeLinkOptions.watch(({ id, property }) => {
  const { url, transitions } = $links.getState()[id];

  switch (property) {
    case 'transitions':
      const typeTransitionsNumber = typeof transitions === 'number';

      editLink({
        id,
        options: {
          transitions: typeTransitionsNumber ? null : 0
        }
      });

      linkAPI.changeParameter(
        url,
        'transitions',
        typeTransitionsNumber ? false : true
      );
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
