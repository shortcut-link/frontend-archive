import React, { SyntheticEvent } from 'react';
import { createEvent, createStore, createEffect, combine } from 'effector';

import { createFetching } from 'lib/fetching';
import { urlShortenedValidator } from 'lib/validators';
import { trimEvent, LinkManagement } from 'features/common';
import { LinkParameter } from 'api/link';
import { adminLinkAPI, FoundLink } from 'api/admin/link';
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

export const $urlField = createStore<string>('');
export const $urlError = $urlField.map<null | string>(url =>
  urlShortenedValidator(url)
);

export const $link = createStore<FoundLink>(null);

$urlField.on(urlChange.map(trimEvent), (_, url) => url).reset(closeWindow);

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
  const urlField = $urlField.getState();
  const getUrlId = urlField.match(/(.{7})$/)[0];

  urlFindProcessing(getUrlId);
});

urlFindProcessing.use(adminLinkAPI.find);

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
    linkAPI: adminLinkAPI,
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
