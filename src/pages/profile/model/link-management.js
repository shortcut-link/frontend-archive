import { createStore, createEvent } from 'effector';

import { $links, changeLink, removeLink } from './links';
import { linkAPI } from 'api/link';

export const openlinkManagement = createEvent();
export const closelinkManagement = createEvent();
export const changeLinkParameter = createEvent();

export const $linkManagement = createStore(null);

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
