import React from 'react';

import { Header } from '../header';
import { ThemeRouterProvider } from 'lib/dev';

it('must render Header', () => {
  const tree = ThemeRouterProvider(<Header />).toJSON();

  expect(tree).toMatchSnapshot();
});
