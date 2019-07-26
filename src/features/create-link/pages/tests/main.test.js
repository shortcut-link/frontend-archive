import React from 'react';
import renderer from 'react-test-renderer';

import { CreateLinkMainPage } from '../main';
import { ThemeProviderRouter } from 'lib/dev';

it('must render CreateLinkMainPage', () => {
  const component = (
    <ThemeProviderRouter>
      <CreateLinkMainPage />
    </ThemeProviderRouter>
  );

  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});
