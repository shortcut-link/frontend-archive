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

    fetch.once(
      JSON.stringify({ ok: true, result: { url: shortUrl } }),
      options
    );

    linkAPI.create(link).then(({ url }) => {
      expect(url).toEqual(shortUrl);
    });

    expect(fetch).toBeCalled();
    const fetchMock = fetch.mock.calls[0][0];
    expect(fetchMock.method).toEqual('POST');
    expect(fetchMock.url).toEqual('/api/link');
    expect(fetchMock.body).toEqual(JSON.stringify({ url: link }));
  });

  it('should return an unknown error', () => {
    fetch.once(JSON.stringify({ ok: false, error: 'unkown' }), {
      options
    });

    linkAPI.create(link).catch(error => {
      expect(error).toEqual(switchError(error));
    });
  });
});
