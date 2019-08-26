import { $link, $isSubmitEnabled } from './store';
import {
  linkChange,
  formSubmitted,
  createLinkProcessing,
  linkRemove
} from './events';
import { linkAPI } from 'api/link';

const trimEvent = event => event.currentTarget.value.trim();

$link.on(linkChange.map(trimEvent), (_, link) => link);
$link.reset(linkRemove);

formSubmitted.watch(() => {
  if (!$isSubmitEnabled.getState()) return;

  const link = $link.getState();
  createLinkProcessing(link);
});

createLinkProcessing.use(linkAPI.createLink);

createLinkProcessing.done.watch(() => {
  linkRemove();
});
