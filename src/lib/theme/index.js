//@flow
import React from 'react';
import type { Node } from 'react';
import { ThemeProvider } from 'styled-components';
import { createStore, createEvent } from 'effector';
import { useStore } from 'effector-react';

const toggleTheme = createEvent();
const $isDark = createStore(localStorage.getItem('theme') === 'dark');

$isDark.on(toggleTheme, isDark => !isDark);

$isDark.watch(isDark => {
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

type Props = {
  dark: Object,
  light: Object,
  children: Node
};

export const ToggleThemeProvider = ({ dark, light, children }: Props) => {
  const isDark = useStore($isDark);

  return (
    <ThemeProvider theme={isDark ? dark : light}>{children}</ThemeProvider>
  );
};
