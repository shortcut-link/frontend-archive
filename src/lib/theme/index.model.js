//@flow
import { createStore, createEvent } from 'effector';
import type { Store, Event } from 'effector';

export const toggleTheme: Event<void> = createEvent();

export const $isDark: Store<boolean> = createStore(
  localStorage.getItem('theme') === 'dark'
);

$isDark.on(toggleTheme, isDark => !isDark);

$isDark.watch(isDark => {
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
