import { createStore, createEvent, createEffect } from 'effector';
import { IndexRange } from 'react-virtualized';

import { createFetching } from 'lib/fetching';
import {
  accountAPI,
  GetLinksResponse,
  GetCountLinksResponse
} from 'api/account';
import { linkAPI, Link, LinkParameterValue } from 'api/link';
import {
  ParametersType,
  changeLinkParameterHandler
} from 'lib/link-management';

export const downloadLinks = createEvent<IndexRange>();
export const addLinks = createEvent<Link[]>();
export const removeLinks = createEvent<void>();
export const removeLink = createEvent<number>();
export const editLink = createEvent<{
  idLink: number;
  parameter: ParametersType;
}>();
export const addCountUserLinks = createEvent<number>();
export const firstLoadCountAndLinks = createEvent<void>();

export const downloadLinksProcessing = createEffect<
  IndexRange,
  GetLinksResponse
>();
export const downloadLinksFetching = createFetching(downloadLinksProcessing);
export const loadingCountLinks = createEffect<void, GetCountLinksResponse>();

export const $links = createStore<Link[]>([])
  .on(addLinks, (allLinks, newLinks) => {
    return [...allLinks, ...newLinks];
  })
  .on(removeLink, (allLinks, id) => {
    allLinks.splice(id, 1);
    return allLinks;
  })
  .on(editLink, (allLinks, { idLink, parameter }) => {
    const link = allLinks[idLink];

    function changeLink(value: LinkParameterValue) {
      allLinks[idLink] = { ...allLinks[idLink], [parameter]: value };
    }

    changeLinkParameterHandler({
      parameter,
      link,
      changeLink,
      removeLink: () => removeLink(idLink),
      linkAPI
    });

    return allLinks;
  })
  .reset(removeLinks);

export const $countUserLinks = createStore(0)
  .on(addCountUserLinks, (_, count) => count)
  .on(removeLink, count => count - 1)
  .reset(removeLinks);

downloadLinks.watch(params => {
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
