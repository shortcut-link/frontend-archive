import React, { Suspense } from 'react';

import { Routes } from './routes';
import { ToggleThemeProvider } from 'lib/theme';
import { darkTheme, lightTheme } from 'ui/themes';
import { GlobalStyle } from 'ui/templates';
import { AccountLoader } from 'features/common';

export const App = () => {
  return (
    <ToggleThemeProvider dark={darkTheme} light={lightTheme}>
      <Suspense fallback={<></>}>
        <GlobalStyle />

        <AccountLoader>
          <Routes />
        </AccountLoader>
      </Suspense>
    </ToggleThemeProvider>
  );
};
