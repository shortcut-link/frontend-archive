import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { CommonContentTemplate } from '../index';
import { ThemeProviderRouter } from 'lib/dev';

describe('must render Header', () => {
  const children = <div>Children</div>;

  it('with default header, footer', () => {
    const component = (
      <ThemeProviderRouter>
        <CommonContentTemplate>{children}</CommonContentTemplate>
      </ThemeProviderRouter>
    );

    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('with custom header, footer', () => {
    const header = <div>Header</div>;
    const footer = <div>Footer</div>;
    const component = (
      <ThemeProviderRouter>
        <CommonContentTemplate header={header} footer={footer}>
          {children}
        </CommonContentTemplate>
      </ThemeProviderRouter>
    );

    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
