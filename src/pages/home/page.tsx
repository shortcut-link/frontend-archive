import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';

import { CommonContentTemplate, $session } from 'features/common';
import { Row, Col } from 'lib/styled-components';
import {
  $link,
  $linkError,
  $isSubmitEnabled,
  $isFormLoading,
  $createdLinks,
  linkChange,
  formSubmitted,
  createLinkFetching
} from './model';
import { ButtonPrimary, Icon, ButtonLoader, Input, ErrorBox } from 'ui';
import { ModalSettings, CreatedLinks } from 'features/create-link';

type setWindowManagingCreatedLinkType = (windowState: boolean) => void;

export const CreateLinkMainPage: React.FunctionComponent = () => {
  const [windowManagingCreatedLink, setWindowManagingCreatedLink] = useState<
    boolean
  >(false);
  const createdLinks = useStore($createdLinks);

  useEffect(() => {
    document.title = 'Home';
  }, []);

  return (
    <>
      <CommonContentTemplate>
        <Col gap="2rem" width="100%" justify="center" align="center">
          <CreateForm
            setWindowManagingCreatedLink={setWindowManagingCreatedLink}
          />
          <CreatedLinks links={createdLinks} />
        </Col>
      </CommonContentTemplate>

      <ModalSettings
        isOpen={windowManagingCreatedLink}
        closing={() => setWindowManagingCreatedLink(false)}
      />
    </>
  );
};

const CreateForm = ({
  setWindowManagingCreatedLink
}: {
  setWindowManagingCreatedLink: setWindowManagingCreatedLinkType;
}) => {
  const link = useStore($link);
  const linkError = useStore($linkError);
  const isFormLoading = useStore($isFormLoading);
  const formError = useStore(createLinkFetching.error);

  return (
    <Col tagName="form" onSubmit={handleSubmit} gap="1rem" width="30rem">
      {formError && <ErrorBox>{formError}</ErrorBox>}
      <Input
        type="text"
        name="link"
        error={link && linkError}
        value={link}
        onChange={linkChange}
        disabled={isFormLoading}
        style={{
          height: '2.5rem'
        }}
      />

      <Buttons setWindowManagingCreatedLink={setWindowManagingCreatedLink} />
    </Col>
  );
};

const Buttons = ({
  setWindowManagingCreatedLink
}: {
  setWindowManagingCreatedLink: setWindowManagingCreatedLinkType;
}) => {
  const isSubmitEnabled = useStore($isSubmitEnabled);
  const isFormLoading = useStore($isFormLoading);
  const isLoginAccount = useStore($session);

  return (
    <Row justify="space-between">
      <ButtonForm
        type="submit"
        loader={isFormLoading}
        disabled={!isSubmitEnabled}
        style={{ width: '85%' }}
      >
        Continue
      </ButtonForm>
      <ButtonPrimary
        type="button"
        title={
          isLoginAccount
            ? 'Settings for the created link'
            : 'To use the settings - log in'
        }
        onClick={() => setWindowManagingCreatedLink(true)}
        disabled={isFormLoading || !isLoginAccount}
      >
        <Icon name="settings" width="1.1rem" height="1.1rem" fill="none" />
      </ButtonPrimary>
    </Row>
  );
};

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  formSubmitted();
};

const ButtonForm = styled(ButtonLoader)`
  width: 80%;
`;
