import React from 'react';
import styled from 'styled-components';

import { Main, IHeaderAndFooter } from 'ui/templates';
import { Container } from 'ui/templates';
import { Header } from '../organisms';

export const CommonContentTemplate: React.FC<IHeaderAndFooter> = ({
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
