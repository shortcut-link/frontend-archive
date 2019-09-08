import { accountAPI } from '../account';
import { switchError } from '../account.errors';

describe('testing api account', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  const options = { headers: { 'Content-Type': 'application/json ' } };
  const userData = { email: 'example@example.com', password: 'Qwerty123!@' };

  describe('create account', () => {
    it('successful creation', () => {
      fetch.once(
        JSON.stringify({
          ok: true,
          result: { user: { email: userData.email }, token: 'token' }
        }),
        options
      );

      accountAPI.createAccount(userData).then(({ user, token }) => {
        expect(user.email).toEqual(userData['email']);
        expect(token).toEqual('token');
      });

      expect(fetch).toBeCalled();
      const fetchMock = fetch.mock.calls[0][0];
      expect(fetchMock.method).toEqual('POST');
      expect(fetchMock.url).toEqual('/api/account');
      expect(fetchMock.body).toEqual(JSON.stringify(userData));
    });

    it('create error, busy mail', () => {
      const errorServer = 'email_already_exists';

      fetch.once(
        JSON.stringify({
          ok: false,
          error: errorServer
        }),
        options
      );

      accountAPI
        .createAccount(userData)
        .catch(error => expect(error).toEqual(switchError(errorServer)));
    });
  });

  describe('options link', () => {
    it('change link tracking status', () => {
      const body = { linkTransitions: true };

      fetch.once(
        JSON.stringify({
          ok: true
        }),
        options
      );

      accountAPI.optionsLink({ linkTransitions: true }).then(res => {
        expect(res).toEqual(undefined);
      });

      expect(fetch).toBeCalled();
      const fetchMock = fetch.mock.calls[0][0];
      expect(fetchMock.method).toEqual('POST');
      expect(fetchMock.url).toEqual('/api/account/linkSettings');
      expect(fetchMock.body).toEqual(JSON.stringify(body));
    });
  });
});
