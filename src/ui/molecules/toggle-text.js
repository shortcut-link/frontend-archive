import React from 'react';
import styled from 'styled-components';

import { Toggle } from '../atom';
import { Row, Col } from 'lib/styled-components';

export const ToggleWithText = ({ text, id, toggle, defaultChecked }) => {
  return (
    <ColContainer gap="1rem">
      <Row gap="0.8rem" align="center">
        <Label htmlFor={id}>{text}</Label>
        <Toggle toggle={toggle} id={id} defaultChecked={defaultChecked} />
      </Row>
    </ColContainer>
  );
};

const ColContainer = styled(Col)`
  & > :not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.palette.decoration.borders};
    padding-bottom: 1rem;
  }
`;

const Label = styled.label`
  cursor: pointer;
`;
