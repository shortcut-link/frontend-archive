import { createEvent, createStore } from 'effector';

export const themeToggled = createEvent<void>();

type Theme = 'dark' | 'light' | 'auto';

export const $selectedTheme = createStore<Theme>(getTheme());

$selectedTheme.on(themeToggled, toNextTheme);

$selectedTheme.watch(saveTheme);

function getTheme(): Theme {
  const theme = localStorage.getItem('theme');

  if (theme === 'dark' || theme === 'light') {
    return theme;
  }

  return 'auto';
}

function saveTheme(theme: Theme) {
  if (theme === 'auto') {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', theme);
  }
}

const nextTheme: any = {
  auto: 'dark',
  dark: 'light',
  light: 'auto'
};

function toNextTheme(theme: Theme) {
  return nextTheme[theme];
}
