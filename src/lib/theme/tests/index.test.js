import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';

import { ToggleThemeProvider, WithThemeToggler } from '../index';
import { toggleTheme } from '../index.model';

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
