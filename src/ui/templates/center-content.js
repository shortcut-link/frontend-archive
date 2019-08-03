import React from 'react';
import styled from 'styled-components';

export const CenterContent = ({ children }) => {
  return <MainContainer>{children}</MainContainer>;
};

const MainContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  width: 100%;

  ${({ theme }) => theme.embed.canvas}
`;
