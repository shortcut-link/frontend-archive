import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ToggleThemeProvider } from 'lib/theme';
import { lightTheme, darkTheme } from 'ui/themes';

/* For testing components that
 * require ThemeProvider or BrowserRouter
 */

export const ThemeProviderRouter = ({ children }) => (
  <ToggleThemeProvider light={lightTheme} dark={darkTheme}>
    <BrowserRouter>{children}</BrowserRouter>
  </ToggleThemeProvider>
);
