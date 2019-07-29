import React from 'react';
import renderer from 'react-test-renderer';

import { Link } from '../link';
import { ThemeProviderRouter } from 'lib/dev';

it('ui link with wrapper router link', () => {
  const component = (
    <ThemeProviderRouter>
      <Link to={'/profile'}>Ссылочка</Link>
    </ThemeProviderRouter>
  );

  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});
