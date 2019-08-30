import { createStore, combine } from 'effector';
import { urlValidator } from 'lib/validators';
import { createLinkFetching } from './events';

export const $link = createStore('');
export const $linkError = $link.map(link => urlValidator(link));
export const $isLinkCurrent = $linkError.map(link => link === null);

export const $createdLinks = createStore([]);

export const $isFormLoading = createLinkFetching.isLoading;

export const $isSubmitEnabled = combine(
  $isLinkCurrent,
  $isFormLoading,
  (isFormValid, isFormLoading) => isFormValid && !isFormLoading
);
