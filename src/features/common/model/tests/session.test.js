import '../session.model';
import { $session } from '../session.store';
import { sessionFetch, sessionRemove } from '../session.events';
import { $token, tokenChange } from '../token';

describe('user session', () => {
  let value;
  $session.watch(boolean => (value = boolean));

  it('empty', () => {
    expect(value).toBeNull();
  });

  it('loading and reset', async () => {
    await sessionFetch();

    expect(value).toStrictEqual({
      result: {
        email: 'example@example.com'
      }
    });

    sessionRemove();
    expect(value).toBeNull();
  });

  it('forward', () => {
    let token;
    $token.watch(boolean => (token = boolean));

    const newToken = 'hello';
    tokenChange(newToken);
    expect(token).toEqual(newToken);

    sessionRemove();
    expect(token).toBeNull();
  });
});
