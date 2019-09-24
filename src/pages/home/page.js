import './model';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';

import { CommonContentTemplate, $session } from 'features/common';
import { Col, Row } from 'lib/styled-components';
import {
  $link,
  $linkError,
  $isSubmitEnabled,
  $isFormLoading,
  $createdLinks
} from './model/store';
import { linkChange, formSubmitted, createLinkFetching } from './model/events';
import { ButtonPrimary, Icon, ButtonLoader, Input, ErrorBox } from 'ui';
import { ModalSettings, CreatedLinks } from 'features/create-link';

export const CreateLinkMainPage = () => {
  const [modalWindow, setModalWindow] = useState(false);
  const createdLinks = useStore($createdLinks);

  useEffect(() => {
    document.title = 'Home';
  }, []);

  return (
    <>
      <CommonContentTemplate>
        <Col gap="2rem" width="100%" justify="center" align="center">
          <CreateForm setModalWindow={setModalWindow} />
          <CreatedLinks links={createdLinks} />
        </Col>
      </CommonContentTemplate>

      <ModalSettings
        isOpen={modalWindow}
        closing={() => setModalWindow(false)}
      />
    </>
  );
};

const CreateForm = ({ setModalWindow }) => {
  const link = useStore($link);
  const linkError = useStore($linkError);
  const isFormLoading = useStore($isFormLoading);
  const formError = useStore(createLinkFetching.error);

  return (
    <form onSubmit={handleSubmit}>
      <Col gap="1rem" width="30rem">
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

        <Buttons setModalWindow={setModalWindow} />
      </Col>
    </form>
  );
};

const Buttons = ({ setModalWindow }) => {
  const isSubmitEnabled = useStore($isSubmitEnabled);
  const isFormLoading = useStore($isFormLoading);
  const isLoginAccount = useStore($session);

  return (
    <Row justify="space-between">
      <ButtonForm
        text="Continue"
        type="submit"
        loader={isFormLoading}
        disabled={!isSubmitEnabled}
        style={{ width: '85%' }}
      />
      <ButtonPrimary
        type="button"
        style={{ padding: '0 1rem' }}
        title={
          isLoginAccount
            ? 'Settings for the created link'
            : 'To use the settings - log in'
        }
        onClick={() => setModalWindow(true)}
        disabled={isFormLoading || !isLoginAccount}
      >
        <Icon name="settings" width={18} height={18} fill="none" />
      </ButtonPrimary>
    </Row>
  );
};

const handleSubmit = event => {
  event.preventDefault();
  formSubmitted();
};

const ButtonForm = styled(ButtonLoader)`
  width: 80%;
`;
