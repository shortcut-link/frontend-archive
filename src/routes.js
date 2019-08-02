import React, { lazy } from 'react';
import { renderRoutes } from 'react-router-config';

import { CreateLinkRoutes } from 'features/create-link';
import { joinRoutes } from 'features/join';

const NotFoundPage = lazy(() =>
  import('features/common').then(a => ({ default: a.NotFoundPage }))
);

const createRoutes = [
  ...CreateLinkRoutes(),
  ...joinRoutes(),
  { component: NotFoundPage }
];

export const Routes = () => <>{renderRoutes(createRoutes)}</>;
