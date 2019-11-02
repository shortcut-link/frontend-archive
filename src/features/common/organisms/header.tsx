import React from 'react';
import styled from 'styled-components';

import { Authenticated } from './authenticated';
import { Container, Link, ZeroButton } from 'ui';
import { routesPath } from 'pages';
import { useTheme } from 'lib/theme';

export const Header: React.FC = () => (
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

const Logo = () => (
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

const Account = () => {
  const AccountEmpty = () => (
    <Link to={routesPath.join.login}>Login to account</Link>
  );
  const AccountExists = () => <Link to={routesPath.profile}>Your account</Link>;

  return (
    <Authenticated renderExists={AccountExists} renderEmpty={AccountEmpty} />
  );
};

const ToggleThemeButton = () => {
  const { theme, toggle } = useTheme();

  const themeEmoji = {
    dark: '🌚',
    light: '🌝',
    auto: '🌗'
  };

  return (
    <ButtonIconToggleTheme onClick={() => toggle()} role="button">
      {themeEmoji[theme]}
    </ButtonIconToggleTheme>
  );
};

const ButtonIconToggleTheme = styled(ZeroButton)`
  font-size: 1.2rem;

  &:hover,
  &:focus {
    transform: scale(1.15);
  }

  &:active {
    transform: scale(0.9);
  }
`;

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
  color: var(--canvas-text);
  background-color: var(--canvas);

  & > div.container {
    justify-content: space-between;
    align-items: center;
  }
`;
