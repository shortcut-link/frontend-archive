import { linkAPI } from '../link';
import { switchError } from '../link.errors';

describe('testing api links', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  const link = 'example.com';
  const options = { headers: { 'Content-Type': 'application/json ' } };

  it('should shorten the link', () => {
    const shortUrl = 'http://localhost:8080/qwerty';

    fetch.mockResponse(
      JSON.stringify({ ok: true, result: { url: shortUrl } }),
      options
    );

    linkAPI.createLink(link).then(({ url }) => {
      expect(url).toEqual(shortUrl);
    });

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0].method).toEqual('POST');
    expect(fetch.mock.calls[0][0].url).toEqual('/api/link');
    expect(fetch.mock.calls[0][0].body).toEqual(JSON.stringify({ url: link }));
  });

  it('should return an unknown error', () => {
    fetch.mockResponse(JSON.stringify({ ok: false, error: 'unkown' }), {
      options
    });

    linkAPI.createLink(link).catch(error => {
      expect(error).toEqual(switchError(error));
    });
  });
});
