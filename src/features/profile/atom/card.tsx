import React from 'react';
import styled from 'styled-components';

import { Card } from 'ui';
import { Col } from 'lib/styled-components';

interface CardProfileProps {
  heading: React.ReactNode;
}

export const CardProfile: React.FC<CardProfileProps> = ({
  heading,
  children
}) => (
  <Col tag={Card} gap="1rem">
    <Heading>{heading}</Heading>
    {children}
  </Col>
);

const Heading = styled.header`
  font-size: 1.2rem;
`;
