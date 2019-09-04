import React from 'react';

import { Link } from '../link';
import { ThemeRouterProvider } from 'lib/dev';

it('ui link with wrapper router link', () => {
  const tree = ThemeRouterProvider(<Link to={'/profile'}>Link</Link>).toJSON();

  expect(tree).toMatchSnapshot();
});
