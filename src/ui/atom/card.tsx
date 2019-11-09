import React from 'react';
import styled from 'styled-components';

import { Col } from 'lib/styled-components';

interface CardProps {
  heading?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ heading, children }) => (
  <Col tag={CardContainer} gap="1rem">
    {heading && <Heading>{heading}</Heading>}
    {children}
  </Col>
);

export const CardContainer = styled.div`
  display: flex;
  flex-flow: column;
  padding: 2rem;
  box-shadow: 0px 0px 22px -5px rgba(36, 37, 38, 0.48);
  border-radius: 4px;
  color: var(--card-text);
  background-color: var(--card);
`;

const Heading = styled.header`
  font-size: 1.2rem;
`;
