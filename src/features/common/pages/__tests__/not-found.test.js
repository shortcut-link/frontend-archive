import React from 'react';
import renderer from 'react-test-renderer';

import { NotFoundPage } from '../not-found';

it('should render the page "not found page"', () => {
  const tree = renderer.create(<NotFoundPage />).toJSON();
  expect(tree).toMatchSnapshot();
});
