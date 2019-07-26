//@flow
import React, { type Node } from 'react';
import { ThemeProvider } from 'styled-components';
import { useStore } from 'effector-react';
import type { Event as RouterEvent } from 'react-router-dom';

import { $isDark, toggleTheme } from './index.model';

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
