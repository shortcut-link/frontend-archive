import React from 'react';

import { CommonContentTemplate } from '../index';
import { ThemeRouterProvider } from 'lib/dev';

describe('must render Header', () => {
  const children = <div>Children</div>;

  it('with default header, footer', () => {
    const tree = ThemeRouterProvider(
      <CommonContentTemplate>{children}</CommonContentTemplate>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('with custom header, footer', () => {
    const header = <header>Header</header>;
    const footer = <footer>Footer</footer>;

    const tree = ThemeRouterProvider(
      <CommonContentTemplate header={header} footer={footer}>
        {children}
      </CommonContentTemplate>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
