import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { MainTemplate } from '../main-template';

describe('should to render "Main Template"', () => {
  const children = <div>Hello</div>;
  const header = <header>Header</header>;
  const footer = <footer>Footer</footer>;

  it('only with children', () => {
    const tree = renderer.create(<MainTemplate children={children} />).toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('display', 'grid');
    expect(tree).toHaveStyleRule(
      'grid-template-areas',
      /* prettier-ignore */ "'header' '.' 'footer'"
    );
  });

  it('only with header', () => {
    const root = renderer.create(
      <MainTemplate children={children} header={header} />
    ).root;

    expect(root.findByProps({ children: 'Header' }).type).toEqual('header');
  });

  it('only with footer', () => {
    const root = renderer.create(
      <MainTemplate children={children} footer={footer} />
    ).root;

    expect(root.findByProps({ children: 'Footer' }).type).toEqual('footer');
  });

  it('with header, footer, children', () => {
    const tree = renderer
      .create(
        <MainTemplate children={children} header={header} footer={footer} />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
