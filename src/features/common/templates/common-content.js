import React from 'react';
import styled from 'styled-components';

import { Main } from 'ui/templates';
import { Container } from 'ui/templates';
import { Header } from '../organisms';

export const CommonContentTemplate = ({
  header = <Header />,
  footer,
  children
}) => (
  <Main header={header} footer={footer}>
    <CommonContent>
      <Container>{children}</Container>
    </CommonContent>
  </Main>
);

const CommonContent = styled.div`
  display: flex;
  justify-content: center;

  ${({ theme }) => theme.embed.canvas}
`;
