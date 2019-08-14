import { createStore, createEvent } from 'effector';

export const toggleTheme = createEvent();

export const $isDark = createStore(localStorage.getItem('theme') === 'dark');

$isDark.on(toggleTheme, isDark => !isDark);

$isDark.watch(isDark => {
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
