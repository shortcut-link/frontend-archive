import React from 'react';
import styled from 'styled-components';

import { Container } from 'ui/templates';
import { WithThemeToggler } from 'lib/theme';
import { ToggleSelectTheme } from 'ui/molecules';
import { Authenticated } from './authenticated';
import { Link } from 'ui/atom';
import { routesPath } from 'pages';

export const Header = () => (
  <ContainerBox>
    <Container className={'container'}>
      <Logo />
      <RightPanel>
        <Account />
        <ToggleThemeButton />
      </RightPanel>
    </Container>
  </ContainerBox>
);

const Logo = () => {
  return (
    <h1>
      <Link
        to={routesPath.home}
        style={{
          textTransform: 'uppercase'
        }}
      >
        Shortcut-link
      </Link>
    </h1>
  );
};

const Account = () => {
  const AccountEmpty = () => (
    <Link to={routesPath.join.login}>Login to account</Link>
  );
  const AccountExists = () => <Link to={routesPath.profile}>Your account</Link>;

  return (
    <Authenticated renderExists={AccountExists} renderEmpty={AccountEmpty} />
  );
};

const ToggleThemeButton = () => (
  <WithThemeToggler
    render={({ isDark, toggle }) => (
      <ToggleSelectTheme switching={() => toggle()} isDark={isDark} />
    )}
  />
);

const RightPanel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > :not(:first-child) {
    margin-left: 20px;
  }
`;

const ContainerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;

  & > div.container {
    justify-content: space-between;
    align-items: center;
  }

  ${({ theme }) => theme.embed.canvas}
`;
