import React from 'react';
import styled from 'styled-components';

interface CenterContentProps {
  children?: React.ReactNode;
}

export const CenterContent: React.FC<CenterContentProps> = ({ children }) => (
  <MainContainer>{children}</MainContainer>
);

const MainContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  overflow-y: auto;
  width: 100%;

  ${({ theme }) => theme.embed.canvas}
`;
