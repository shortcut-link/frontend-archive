import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import { combine } from 'effector';

import { $selectedTheme, themeToggled } from './user-prefers';
import { $prefersDark } from './system-prefers';

const $theme = combine(
  $selectedTheme,
  $prefersDark,
  (selectedTheme, prefersDark) => {
    if (selectedTheme === 'auto') {
      return prefersDark ? 'dark' : 'light';
    }

    return selectedTheme;
  }
);

export const $isDark = $theme.map<boolean>(theme => theme === 'dark');

export const ThemeProvider: React.FC<{}> = ({ children }) => {
  const isDark = useStore($isDark);

  useEffect(() => {
    const html = document.querySelector('html');

    if (html) {
      html.dataset.theme = isDark ? 'dark' : 'light';
    }
  }, [isDark]);

  return <>{children}</>;
};

export const useTheme = () => {
  const theme = useStore($selectedTheme);
  return { theme, toggle: themeToggled };
};
