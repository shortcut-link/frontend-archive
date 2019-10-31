import React from 'react';
import { create, act } from 'react-test-renderer';

import { Authenticated } from '../authenticated';
import { sessionChange } from '../../model/session';

describe('must render Header', () => {
  const renderExists = () => <div>renderExists</div>;
  const renderEmpty = () => <div>renderEmpty</div>;

  const component = create(
    <Authenticated renderExists={renderExists} renderEmpty={renderEmpty} />
  );

  it('without session', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('with session', () => {
    act(() => {
      sessionChange({ email: 'example.com' });
    });

    expect(component.toJSON()).toMatchSnapshot();
  });
});
