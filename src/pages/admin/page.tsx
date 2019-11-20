import React from 'react';
import { useStore } from 'effector-react';

import {
  CenterContent,
  Card,
  ButtonPrimary,
  ModalWindow,
  Input,
  ButtonLoader,
  ErrorBox,
  Link
} from 'ui';
import { Col, Row } from 'lib/styled-components';
import {
  $windowContents,
  changeWindowContent,
  closeWindow
} from './model/modal-window';
import {
  $urlField,
  $urlError,
  $isFormDisabled,
  $isSubmitEnabled,
  urlChange,
  formSubmitted,
  urlFindFetching
} from './model/link-management';
import { routesPath } from 'pages';

export const AdminPanelPage = () => {
  const windowContents = useStore($windowContents);

  return (
    <CenterContent>
      <Col flexwrap="wrap" justify="center" align="center" gap="1rem">
        <Row gap="1rem">
          <LinkManagementCard />
        </Row>
        <Navigation />
      </Col>

      {windowContents && (
        <ModalWindow closing={closeWindow}>{windowContents}</ModalWindow>
      )}
    </CenterContent>
  );
};

const Navigation = () => (
  <Row justify="space-between">
    <Link to={routesPath.profile}>Return back</Link>
    <Link to={routesPath.home}>Home</Link>
  </Row>
);

const LinkManagementCard = () => (
  <Card heading={'Link management'}>
    <ButtonPrimary onClick={() => changeWindowContent(<UrlSearchContent />)}>
      URL Search
    </ButtonPrimary>
  </Card>
);

const UrlSearchContent = () => {
  const urlField = useStore($urlField);
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
        error={urlField && urlError}
        value={urlField}
        onChange={urlChange}
        disabled={isFormDisabled}
        autoFocus
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
