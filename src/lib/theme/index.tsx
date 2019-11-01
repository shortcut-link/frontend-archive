import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { useStore } from 'effector-react';
import { Event } from 'effector';

import { $isDark, toggleTheme } from './model';

interface ToggleThemeProviderProps {
  dark: Object;
  light: Object;
  children: React.ReactElement;
}

export const ToggleThemeProvider: React.FC<ToggleThemeProviderProps> = ({
  dark,
  light,
  children
}) => {
  const isDark = useStore($isDark);

  useEffect(() => {
    const html = document.querySelector('html');

    if (html) {
      html.dataset.theme = isDark ? 'dark' : 'light';
    }
  }, [isDark]);

  return (
    <ThemeProvider theme={isDark ? dark : light}>{children}</ThemeProvider>
  );
};

interface WithThemeTogglerProps {
  render: ({
    isDark,
    toggle
  }: {
    isDark: boolean;
    toggle: Event<void>;
  }) => JSX.Element;
}

export const WithThemeToggler = ({
  render
}: WithThemeTogglerProps): JSX.Element => {
  const isDark = useStore($isDark);

  return render({ isDark, toggle: toggleTheme });
};
