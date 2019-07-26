import React from 'react';
import renderer from 'react-test-renderer';

import { NotFoundPage } from '../not-found';

it('must render NotFoundPage', () => {
  const tree = renderer.create(<NotFoundPage />).toJSON();
  expect(tree).toMatchSnapshot();
});
