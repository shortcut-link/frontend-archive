import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Container } from '../container';

it('should render CSS container', () => {
  const tree = renderer.create(<Container />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('max-width', '50rem');
});
