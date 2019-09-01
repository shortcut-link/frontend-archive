import { sessionAPI } from '../session';
import { switchError } from '../session.errors';

describe('testing api session', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  const options = { headers: { 'Content-Type': 'application/json ' } };
  const userData = { email: 'example@example.com', password: 'Qwerty123!@' };

  describe('create session', () => {
    it('successfully', () => {
      fetch.once(
        JSON.stringify({
          ok: true,
          result: { user: { email: userData.email }, token: 'token' }
        }),
        options
      );

      sessionAPI.createSession(userData).then(({ user, token }) => {
        expect(user.email).toEqual(userData['email']);
        expect(token).toEqual('token');
      });

      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0].method).toEqual('POST');
      expect(fetch.mock.calls[0][0].url).toEqual('/api/account/session');
      expect(fetch.mock.calls[0][0].body).toEqual(JSON.stringify(userData));
    });

    it('error, user not found', () => {
      const errorServer = 'user_not_found';

      fetch.once(
        JSON.stringify({
          ok: false,
          error: errorServer
        }),
        options
      );

      sessionAPI
        .createSession(userData)
        .catch(error => expect(error).toEqual(switchError(errorServer)));
    });

    describe('get session', () => {
      it('successfully', () => {
        fetch.once(
          JSON.stringify({
            ok: true,
            result: { user: { email: userData.email } }
          }),
          options
        );

        sessionAPI.getSession().then(({ user }) => {
          expect(user.email).toEqual(userData['email']);
        });

        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0].method).toEqual('GET');
        expect(fetch.mock.calls[0][0].url).toEqual('/api/account/session');
      });

      it('error, not valid token', () => {
        const errorServer = 'not_valid_token';

        fetch.once(
          JSON.stringify({
            ok: false,
            error: errorServer
          }),
          options
        );

        sessionAPI
          .getSession(userData)
          .catch(error => expect(error).toEqual(switchError(errorServer)));
      });
    });
  });
});