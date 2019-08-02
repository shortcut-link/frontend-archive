import React from 'react';
import styled from 'styled-components';

import { Container } from 'ui/templates';
import { WithThemeToggler } from 'lib/theme';
import { ToggleSelectTheme } from 'ui/molecules';
import { Authenticated } from './authenticated';
import { Link } from 'ui/atom';
import { pathRoutes } from 'features/join';

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
    <Link to={'/'} style={{ textTransform: 'uppercase' }}>
      Shortcut-link
    </Link>
  );
};

const Account = () => (
  <Authenticated
    renderExists={() => TextAccount(true)}
    renderEmpty={() => TextAccount(false)}
  />
);

const TextAccount = auth => {
  const link = auth ? '/profile' : pathRoutes['join'];
  const text = auth ? 'Ваш аккаунт' : 'Войти в аккаунт';

  return (
    <Link to={link} style={{ marginRight: '20px' }}>
      {text}
    </Link>
  );
};

const ToggleThemeButton = () => (
  <WithThemeToggler
    render={({ isDark, toggle }) => {
      return <ToggleSelectTheme toggle={toggle} isDark={isDark} />;
    }}
  />
);

const RightPanel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
