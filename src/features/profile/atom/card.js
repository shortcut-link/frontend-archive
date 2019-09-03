import React from 'react';
import styled from 'styled-components';

import { Card } from 'ui';
import { Col } from 'lib/styled-components';

export const CardProfile = ({ heading, children }) => {
  return (
    <Card>
      <Col>
        <Heading>{heading}</Heading>
        {children}
      </Col>
    </Card>
  );
};

const Heading = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;
