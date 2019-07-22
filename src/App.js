import React, { Suspense } from 'react';

import { Routes } from './routes';
import { ToggleThemeProvider } from 'lib/theme';
import { darkTheme, lightTheme } from 'ui/themes';

export const App = () => {
  return (
    <ToggleThemeProvider dark={darkTheme} light={lightTheme}>
      <Suspense fallback={<></>}>
        <Routes />
      </Suspense>
    </ToggleThemeProvider>
  );
};
