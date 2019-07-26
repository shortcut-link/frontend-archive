import React from 'react';
import renderer from 'react-test-renderer';

import { WithTag } from '../index';

describe('must wrap in an item', () => {
  const children = <div>Hello</div>;

  it('with default tag', () => {
    const tree = renderer.create(WithTag({ children })).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('with custom tag and transfer of props', () => {
    const tree = renderer
      .create(WithTag({ tagName: 'header', children, className: 'one' }))
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
