//@flow
import React from 'react';
import type { Node } from 'react';
import { ThemeProvider } from 'styled-components';
import { createStore, createEvent } from 'effector';
import { useStore } from 'effector-react';
import type { Event as RouterEvent } from 'react-router-dom';
import type { Store, Event as EffectorEvent } from 'effector';

export const toggleTheme: EffectorEvent<any> = createEvent();

export const $isDark: Store<boolean> = createStore(
  localStorage.getItem('theme') === 'dark'
);

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

// TODO: вынести в отдельный файл чтобы использовать в toggleTheme
type RenderProps = {
  isDark: boolean,
  toggle: RouterEvent<void>
};

export const WithThemeToggler = ({
  render
}: {
  render: (props: RenderProps) => void
}) => {
  const isDark = useStore($isDark);

  return render({ isDark, toggle: toggleTheme });
};
