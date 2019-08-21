import React from 'react';

import { CommonContentTemplate } from 'features/common';
import { MainTemplate } from 'features/create-link';
import { Col } from 'lib/styled-components';

export const CreateLinkMainPage = () => {
  return (
    <CommonContentTemplate>
      <Col gap="2rem" width="100%" justify="center" align="center">
        <MainTemplate />
      </Col>
    </CommonContentTemplate>
  );
};
