//@flow
import React from 'react';
import type { Node } from 'react';
import styled from 'styled-components';

import { MainTemplate } from 'ui/templates';
import { Container } from 'ui/templates';

export const CommonContentTemplate = ({ children }: { children: Node }) => (
  <MainTemplate>
    <CommonContent>
      <Container>{children}</Container>
    </CommonContent>
  </MainTemplate>
);

const CommonContent = styled.div`
  display: flex;
  justify-content: center;
`;
