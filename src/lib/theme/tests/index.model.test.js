import { toggleTheme, $isDark } from '../model';

describe('store management for a dark theme', () => {
  let value;
  $isDark.watch(boolean => (value = boolean));
  const storage = () => localStorage.getItem('theme');

  it('create store', () => {
    expect(value).toEqual(false);
    expect(storage()).toEqual('light');
  });

  it('change the theme', () => {
    toggleTheme();
    expect(value).toEqual(true);
    expect(storage()).toEqual('dark');

    toggleTheme();
    expect(value).toEqual(false);
    expect(storage()).toEqual('light');
  });
});
