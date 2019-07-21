import React, { Suspense } from 'react';

import { Routes } from './routes';

export const App = () => {
  return (
    <Suspense fallback={<></>}>
      <Routes />
    </Suspense>
  );
};
