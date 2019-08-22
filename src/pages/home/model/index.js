import { $link, $isSubmitEnabled } from './store';
import { linkChange, formSubmitted, createLinkProcessing } from './events';

const trimEvent = event => event.currentTarget.value.trim();

$link.on(linkChange.map(trimEvent), (_, link) => link);

formSubmitted.watch(() => {
  if (!$isSubmitEnabled.getState()) return;

  const link = $link.getState();
  createLinkProcessing(link);
});

createLinkProcessing.use(link => fetch('/vk.com'));
