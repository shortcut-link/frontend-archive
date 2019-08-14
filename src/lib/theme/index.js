import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useStore } from 'effector-react';

import { $isDark, toggleTheme } from './index.model';

export const ToggleThemeProvider = ({ dark, light, children }: Props) => {
  const isDark = useStore($isDark);

  return (
    <ThemeProvider theme={isDark ? dark : light}>{children}</ThemeProvider>
  );
};

export const WithThemeToggler = ({ render }) => {
  const isDark = useStore($isDark);

  return render({ isDark, toggle: toggleTheme });
};
