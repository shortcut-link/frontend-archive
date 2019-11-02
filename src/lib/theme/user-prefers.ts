import { createEvent, createStore } from 'effector';

export const themeToggled = createEvent<void>();

type Theme = 'dark' | 'light' | 'auto';
const availableTheme: Theme[] = ['dark', 'light', 'auto'];

export const $selectedTheme = createStore<Theme>(getTheme());

$selectedTheme.on(themeToggled, toNextTheme);

$selectedTheme.watch(saveTheme);

function getTheme(): Theme {
  const theme = localStorage.getItem('theme');

  for (const available of availableTheme) {
    if (available === theme) {
      return available;
    }
  }
  return 'auto';
}

function saveTheme(theme: Theme) {
  localStorage.setItem('theme', theme);
}

const nextTheme: any = {
  auto: 'dark',
  dark: 'light',
  light: 'auto'
};

function toNextTheme(theme: Theme) {
  return nextTheme[theme];
}
