import React from 'react';
import styled from 'styled-components';

export const Main = ({ children, header, footer }) => (
  <MainContainer>
    {header && <Header>{header}</Header>}
    {children}
    {footer && <Footer>{footer}</Footer>}
  </MainContainer>
);

const MainContainer = styled.div`
  display: grid;
  min-height: 100vh;
  max-height: 100vh;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header'
    '.'
    'footer';
`;

const Header = styled.header`
  grid-area: header;
`;

const Footer = styled.footer`
  grid-area: footer;
`;
