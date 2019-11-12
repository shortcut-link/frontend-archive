import { SyntheticEvent } from 'react';
import { createEvent, createStore, createEffect, combine } from 'effector';

import { createFetching } from 'lib/fetching';
import { urlShortenedValidator } from 'lib/validators';
import { trimEvent } from 'features/common';
import { linkAPI } from 'api/link';
import { changeWindowContent } from './modal-window';

export const urlChange = createEvent<SyntheticEvent<HTMLInputElement>>();
export const formSubmitted = createEvent<void>();

export const urlFindProcessing = createEffect<
  string,
  void,
  { status: number }
>();
export const urlFindFetching = createFetching(urlFindProcessing);

export const $url = createStore<string>('');
export const $urlError = $url.map<null | string>(url =>
  urlShortenedValidator(url)
);

$url.on(urlChange.map(trimEvent), (_, url) => url);

export const $isFormDisabled = urlFindFetching.isLoading;

export const $isSubmitEnabled = combine(
  $urlError,
  $isFormDisabled,
  (urlError, isFormDisabled) => urlError === null && !isFormDisabled
);

formSubmitted.watch(() => {
  const url = $url.getState();
  const getUrlId = url.match(/(.{7})$/)[0];

  urlFindProcessing(getUrlId);
});

urlFindProcessing.use(linkAPI.find);

urlFindProcessing.done.watch(() => {
  changeWindowContent('Continue');
});
