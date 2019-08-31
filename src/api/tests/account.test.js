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
      fetch.mockResponse(
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

      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0].method).toEqual('POST');
      expect(fetch.mock.calls[0][0].url).toEqual('/api/account');
      expect(fetch.mock.calls[0][0].body).toEqual(JSON.stringify(userData));
    });

    it('create error, busy mail', () => {
      const errorServer = 'email_already_exists';

      fetch.mockResponse(
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

      fetch.mockResponse(
        JSON.stringify({
          ok: true
        }),
        options
      );

      accountAPI.optionsLink({ linkTransitions: true }).then(res => {
        expect(res).toEqual(undefined);
      });

      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0].method).toEqual('POST');
      expect(fetch.mock.calls[0][0].url).toEqual('/api/account/link');
      expect(fetch.mock.calls[0][0].body).toEqual(JSON.stringify(body));
    });
  });
});
