import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import { ToggleSelectTheme } from '../toggle-theme';

/* Используется ThemeProvider,
 * так как в компоненте берётся цвет из темы
 */

describe('should render Toggle Select Theme', () => {
  let theme = { palette: { primary: { initial: { background: '#fff' } } } };

  const providerToggle = props => (
    <ThemeProvider theme={theme}>
      <ToggleSelectTheme {...props} />
    </ThemeProvider>
  );

  it('dark theme is disabled', () => {
    const tree = renderer
      .create(providerToggle({ isDark: false, toggle: () => {} }))
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('dark theme is on', () => {
    const tree = renderer
      .create(providerToggle({ isDark: true, toggle: () => {} }))
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('click to change themes', () => {
    const mockFunction = jest.fn();

    const component = mount(
      providerToggle({ isDark: false, toggle: mockFunction })
    );

    component.find('input[type="checkbox"]').simulate('click');

    expect(mockFunction).toHaveBeenCalled();

    component.unmount();
  });
});
