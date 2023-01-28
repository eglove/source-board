import { baseUrl, getUrl } from 'source/feature/util/routes';

describe('Routes', () => {
  it('should get valid url', () => {
    let url = getUrl(
      ['one', 'two'],
      [
        { value: 'Ethan', name: 'name' },
        { value: 'cool', name: 'is' },
      ],
    );

    expect(() => {
      return new URL(url);
    }).not.toThrow();
    expect(url).toBe(`${baseUrl}/one/two/?name=Ethan&is=cool`);

    url = getUrl(
      ['one', 'two'],
      [
        { value: 'Ethan', name: 'name' },
        { value: 'cool', name: 'is' },
      ],
      'https://example.com',
    );

    expect(() => {
      return new URL(url);
    }).not.toThrow();
    expect(url).toBe('https://example.com/one/two/?name=Ethan&is=cool');
  });
});
