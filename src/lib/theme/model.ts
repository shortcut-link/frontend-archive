import { createStore, createEvent } from 'effector';

export const toggleTheme = createEvent<void>();

export const $isDark = createStore<boolean>(
  localStorage.getItem('theme') === 'dark'
);

$isDark.on(toggleTheme, isDark => !isDark);

$isDark.watch(isDark => {
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
