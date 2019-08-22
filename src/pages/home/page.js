import './model';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';

import { CommonContentTemplate } from 'features/common';
import { Col, Row } from 'lib/styled-components';
import {
  $link,
  $linkError,
  $isSubmitEnabled,
  $isFormLoading
} from './model/store';
import { linkChange, formSubmitted } from './model/events';
import { ButtonPrimary, Icon, ButtonLoader, Input } from 'ui';

export const CreateLinkMainPage = () => {
  useEffect(() => {
    document.title = 'Home';
  }, []);

  return (
    <CommonContentTemplate>
      <Col gap="2rem" width="100%" justify="center" align="center">
        <CreateForm />
      </Col>
    </CommonContentTemplate>
  );
};

const CreateForm = () => {
  const link = useStore($link);
  const linkError = useStore($linkError);
  const isFormLoading = useStore($isFormLoading);

  return (
    <form onSubmit={handleSubmit}>
      <Col gap="1rem" width="30rem">
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

        <Buttons />
      </Col>
    </form>
  );
};

const Buttons = () => {
  const isSubmitEnabled = useStore($isSubmitEnabled);
  const isFormLoading = useStore($isFormLoading);

  return (
    <Row justify="space-between">
      <ButtonForm
        text="Continue"
        type="submit"
        loader={isFormLoading}
        disabled={!isSubmitEnabled}
        style={{ width: '85%' }}
      />
      <ButtonPrimary disabled={isFormLoading} style={{ padding: '0 1rem' }}>
        <Icon
          name="settings"
          width={18}
          height={18}
          stroke="orange"
          fill="none"
        />
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
