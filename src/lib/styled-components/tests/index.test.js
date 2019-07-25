import React from 'react';
import { WithTag } from '../index';

describe('should wrap in an element and pass to children, props', () => {
  it('default tag', () => {
    expect(WithTag.defaultProps.tagName).toEqual('div');
  });

  it('default tag', () => {
    const children = <p>Hello</p>;
    const props = { one: () => {}, foo: 'bar' };

    const func = WithTag({ tagName: 'header', children, props });

    expect(func).toMatchSnapshot();
  });
});
