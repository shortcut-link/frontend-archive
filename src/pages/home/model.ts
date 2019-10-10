import { SyntheticEvent } from 'react';
import {
  createStore,
  combine,
  createEvent,
  createEffect,
  Store
} from 'effector';

import { createFetching } from 'lib/fetching';
import { urlValidator } from 'lib/validators';
import { linkAPI, CreateResponse } from 'api/link';
import { trimEvent } from 'features/common';

export const linkChange = createEvent<SyntheticEvent<HTMLInputElement>>();
export const linkRemove = createEvent<void>();
export const formSubmitted = createEvent<void>();
export const addCreatedLinks = createEvent<string>();

export const createLinkProcessing = createEffect<string, CreateResponse>();
export const createLinkFetching = createFetching(createLinkProcessing);

export const $link = createStore<string>('');
export const $linkError: Store<null | string> = $link.map(link =>
  urlValidator(link)
);
export const $isLinkCurrent: Store<boolean> = $linkError.map(
  link => link === null
);

export const $createdLinks = createStore<Array<{ url: string }>>([]);

export const $isFormLoading = createLinkFetching.isLoading;

export const $isSubmitEnabled = combine(
  $isLinkCurrent,
  $isFormLoading,
  (isFormValid, isFormLoading) => isFormValid && !isFormLoading
);

$link.on(linkChange.map(trimEvent), (_, link) => link);
$link.reset(linkRemove);

$createdLinks.on(addCreatedLinks, (links, url) => [{ url }, ...links]);

formSubmitted.watch(() => {
  if (!$isSubmitEnabled.getState()) return;

  const link = $link.getState();
  createLinkProcessing(link);
});

createLinkProcessing.use(linkAPI.create);

createLinkProcessing.done.watch(({ result: { url } }) => {
  addCreatedLinks(url);
  linkRemove();
});
