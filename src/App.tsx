import React, { Suspense } from 'react';

import { Routes } from './pages';
import { ThemeProvider } from 'lib/theme';
import { GlobalStyle, CenterContent } from 'ui/templates';
import { AccountLoader } from 'features/common';

export const App = () => (
  <ThemeProvider>
    <Suspense fallback={<CenterContent />}>
      <GlobalStyle />

      <AccountLoader>
        <Routes />
      </AccountLoader>
    </Suspense>
  </ThemeProvider>
);
