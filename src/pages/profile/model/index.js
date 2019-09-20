import { $links, $countUserLinks, $linkManagement } from './store';
import {
  downloadLinksProcessing,
  downloadLinksFetching,
  addLinks,
  addCountUserLinks,
  getLinks,
  removeLinks,
  changeLinkParameter,
  openlinkManagement,
  closelinkManagement,
  removeLink,
  changeLink
} from './events';
import { accountAPI } from 'api/account';
import { linkAPI } from 'api/link';

/* Links */

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

/* Count User Links */

$countUserLinks.on(addCountUserLinks, (_, count) => count);
$countUserLinks.on(removeLink, count => count - 1);
$countUserLinks.reset(removeLinks);

/* Link management */

$linkManagement.on(openlinkManagement, (_, id) => id);
$linkManagement.on(closelinkManagement, () => null);

changeLinkParameter.watch(({ property }) => {
  const id = $linkManagement.getState();
  const { url, transitions } = $links.getState()[id];

  switch (property) {
    case 'tracking':
      const typeTransitionsNumber = typeof transitions === 'number';
      changeLink({
        id,
        options: { transitions: typeTransitionsNumber ? null : 0 }
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
        linkAPI.remove(url);
        removeLink({ id });
        closelinkManagement();
      }
      break;

    default:
      break;
  }
});
