import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';
import 'jest-styled-components';

import {
  $isDark,
  toggleTheme,
  ToggleThemeProvider,
  WithThemeToggler
} from '../index';

describe('store management for a dark theme', () => {
  let value;
  $isDark.watch(boolean => (value = boolean));
  const storage = () => localStorage.getItem('theme');

  it('create store', () => {
    expect(value).toEqual(false);
    expect(storage()).toEqual('light');
  });

  it('change the theme', () => {
    toggleTheme();
    expect(value).toEqual(true);
    expect(storage()).toEqual('dark');

    toggleTheme();
    expect(value).toEqual(false);
    expect(storage()).toEqual('light');
  });
});

it('theme Provider', () => {
  const lightTheme = { one: { primary: '#fff' } };
  const darkTheme = { one: { primary: '#000' } };

  const Button = styled.button`
    color: ${({ theme }) => theme.one.primary};
  `;

  const tree = renderer
    .create(
      <ToggleThemeProvider
        dark={darkTheme}
        light={lightTheme}
        children={<Button>Dmitriy</Button>}
      />
    )
    .toJSON();

  expect(tree).toHaveStyleRule('color', '#fff');
});

it('wrap for changing themes', () => {
  const mock = jest.fn(() => <div>Hello</div>);

  renderer.create(<WithThemeToggler render={mock} />);

  expect(mock).toHaveBeenCalledWith({ isDark: false, toggle: toggleTheme });
});
