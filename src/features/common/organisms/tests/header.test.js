import React from 'react';
import renderer from 'react-test-renderer';

import { Header } from '../header';
import { ThemeProviderRouter } from 'lib/dev';

it('must render Header', () => {
  const component = (
    <ThemeProviderRouter>
      <Header />
    </ThemeProviderRouter>
  );

  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});
