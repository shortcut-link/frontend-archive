import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Container } from 'ui/templates';

export const Header = () => (
  <Box>
    <Container className={'container'}>
      <NavLink to="/">Shortcut Link</NavLink>
    </Container>
  </Box>
);

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
`;

const NavItem = styled.a``;

const NavLink = NavItem.withComponent(Link);
