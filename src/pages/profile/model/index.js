import { $links, $countUserLinks } from './store';
import {
  downloadLinksProcessing,
  downloadLinksFetching,
  addLinks,
  addCountUserLinks,
  getLinks,
  removeLinks,
  changeLinkParameter
} from './events';
import { accountAPI } from 'api/account';
import { linkAPI } from 'api/link';

$links.on(addLinks, (allLinks, newLinks) => [...allLinks, ...newLinks]);
$links.on(changeLinkParameter, (allLinks, { id, property }) => {
  const { url, transitions } = allLinks[id];
  switch (property) {
    case 'tracking':
      const typeTransitionsNumber = typeof transitions === 'number';
      allLinks[id].transitions = typeTransitionsNumber ? null : 0;

      linkAPI.changeUserLinkOptions(url, {
        tracking: typeTransitionsNumber ? false : true
      });
      break;

    default:
      break;
  }
  return allLinks;
});

$links.reset(removeLinks);

$countUserLinks.on(addCountUserLinks, (_, count) => count);

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
