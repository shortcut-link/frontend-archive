import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Container } from 'ui/templates';
import { WithThemeToggler } from 'lib/theme';
import { ToggleSelectTheme } from 'ui/molecules';

export const Header = () => (
  <Box>
    <Container className={'container'}>
      <NavLink to="/">Shortcut Link</NavLink>
      <RightPanel>
        <ToggleThemeButton />
      </RightPanel>
    </Container>
  </Box>
);

const RightPanel = styled.div`
  display: flex;
`;

const ToggleThemeButton = () => (
  <WithThemeToggler
    render={({ isDark, toggle }) => {
      return <ToggleSelectTheme toggle={toggle} isDark={isDark} />;
    }}
  />
);

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;

  & > div.container {
    justify-content: space-between;
    align-items: center;
  }
`;

const NavItem = styled.a``;

const NavLink = NavItem.withComponent(Link);
