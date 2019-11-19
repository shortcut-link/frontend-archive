import React, { SyntheticEvent } from 'react';
import { createEvent, createStore, createEffect, combine } from 'effector';

import { createFetching } from 'lib/fetching';
import { urlShortenedValidator } from 'lib/validators';
import { trimEvent, LinkManagement } from 'features/common';
import { linkAPI, FoundLink, LinkParameter } from 'api/link';
import { changeWindowContent, closeWindow } from './modal-window';
import {
  changeLinkParameterHandler,
  ParametersType
} from 'lib/link-management';

export const urlChange = createEvent<SyntheticEvent<HTMLInputElement>>();
export const formSubmitted = createEvent<void>();
export const editLink = createEvent<{
  parameter: LinkParameter;
  value: any;
}>();

export const urlFindProcessing = createEffect<
  string,
  FoundLink,
  { status: number }
>();
export const urlFindFetching = createFetching(urlFindProcessing);

export const $url = createStore<string>('');
export const $urlError = $url.map<null | string>(url =>
  urlShortenedValidator(url)
);

export const $link = createStore<FoundLink>(null);

$url.on(urlChange.map(trimEvent), (_, url) => url);

$link
  .on(urlFindProcessing.done, (_, { result }) => result)
  .on(editLink, (link, { parameter, value }) => ({
    ...link,
    [parameter]: value
  }))
  .reset(closeWindow);

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

urlFindProcessing.done.watch(({ result }) => {
  changeWindowContent(
    <LinkManagement
      link={result}
      changeLinkParameter={changeLinkParameterCallback}
    />
  );
});

function changeLinkParameterCallback(parameter: ParametersType) {
  const link = $link.getState();

  changeLinkParameterHandler({
    parameter,
    link,
    linkAPI,
    changeLink: value => {
      if (parameter !== 'remove') {
        editLink({ parameter, value });
      }
    },
    removeLink: () => {
      closeWindow();
    }
  });
}
