import Cookies from 'browser-cookies';

import { $token, tokenChange, tokenRemove } from '../token';

describe('user token', () => {
  let value;
  $token.watch(boolean => (value = boolean));

  it('empty', () => {
    expect(value).toBeNull();
  });

  it('change and reset', () => {
    const newToken = 'dmitriymnv';

    tokenChange(newToken);
    expect(value).toEqual(newToken);
    expect(Cookies.get('sc-token')).toEqual(newToken);

    tokenRemove();
    expect(value).toBeNull();
    expect(Cookies.get('sc-token')).toBeNull();
  });
});
