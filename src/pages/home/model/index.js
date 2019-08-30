import { $link, $isSubmitEnabled, $createdLinks } from './store';
import {
  linkChange,
  formSubmitted,
  createLinkProcessing,
  linkRemove,
  createdLinksChange
} from './events';
import { linkAPI } from 'api/link';

const trimEvent = event => event.currentTarget.value.trim();

$link.on(linkChange.map(trimEvent), (_, link) => link);
$link.reset(linkRemove);

$createdLinks.on(createdLinksChange, (links, link) => [link, ...links]);

formSubmitted.watch(() => {
  if (!$isSubmitEnabled.getState()) return;

  const link = $link.getState();
  createLinkProcessing(link);
});

createLinkProcessing.use(linkAPI.createLink);

createLinkProcessing.done.watch(({ result: { url } }) => {
  createdLinksChange({ url });
  linkRemove();
});
