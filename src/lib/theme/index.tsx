import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import { Event } from 'effector';

import { $isDark, toggleTheme } from './model';

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
