import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import { lightTheme } from 'ui/themes';

/**
 * For testing components that require ThemeProvider or BrowserRouter
 */
export const ThemeRouterProvider = (component: React.ReactNode) =>
  renderer.create(
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>{component}</BrowserRouter>
    </ThemeProvider>
  );
