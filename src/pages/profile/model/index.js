import { $links, $countUserLinks } from './store';
import {
  downloadLinksProcessing,
  downloadLinksFetching,
  addLinks,
  addCountUserLinks,
  getLinks,
  removeLinks
} from './events';
import { accountAPI } from 'api/account';

$links.on(addLinks, (allLinks, newLinks) => [...allLinks, ...newLinks]);
$links.reset(removeLinks);

$countUserLinks.on(addCountUserLinks, (_, count) => count);

getLinks.watch(({ startIndex, count }) => {
  const loading = downloadLinksFetching.isLoading;
  if (loading.getState()) return;

  downloadLinksProcessing({ startIndex, count });
});

downloadLinksProcessing.use(({ startIndex, count }) => {
  return accountAPI.links(startIndex, count);
});

downloadLinksProcessing.done.watch(({ result: { links, count } }) => {
  addLinks(links);
  count && addCountUserLinks(count);
});
