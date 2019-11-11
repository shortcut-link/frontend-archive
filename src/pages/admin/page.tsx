import React from 'react';
import { useStore } from 'effector-react';

import {
  CenterContent,
  Card,
  ButtonPrimary,
  ModalWindow,
  Input,
  ButtonLoader,
  ErrorBox
} from 'ui';
import { Col, Row } from 'lib/styled-components';
import {
  $windowContents,
  changeWindowContent,
  closeWindow
} from './model/modal-window';
import {
  $url,
  $isFormDisabled,
  $isSubmitEnabled,
  $urlError,
  urlChange,
  formSubmitted,
  urlFindFetching
} from './model/link-management';

export const AdminPanelPage = () => {
  const windowContents = useStore($windowContents);

  return (
    <CenterContent>
      <Col flexwrap="wrap" justify="center" align="center" gap="1rem">
        <Row gap="1rem">
          <LinkManagementCard />
        </Row>
      </Col>

      {windowContents && (
        <ModalWindow closing={closeWindow}>{windowContents}</ModalWindow>
      )}
    </CenterContent>
  );
};

const LinkManagementCard = () => (
  <Card heading={'Link management'}>
    <ButtonPrimary onClick={() => changeWindowContent(<UrlSearchContent />)}>
      URL Search
    </ButtonPrimary>
  </Card>
);

const UrlSearchContent = () => {
  const url = useStore($url);
  const urlError = useStore($urlError);
  const formError = useStore(urlFindFetching.error);
  const isFormDisabled = useStore($isFormDisabled);
  const isSubmitEnabled = useStore($isSubmitEnabled);

  return (
    <Col onSubmit={handleSubmit} tag="form" gap="1rem">
      {formError && <ErrorBox>{formError}</ErrorBox>}
      <Input
        type="text"
        name="url"
        label="Enter link URL"
        error={url && urlError}
        value={url}
        onChange={urlChange}
        disabled={isFormDisabled}
      />
      <ButtonLoader
        type="submit"
        disabled={!isSubmitEnabled}
        loader={isFormDisabled}
      >
        Search
      </ButtonLoader>
    </Col>
  );
};

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  formSubmitted();
}
