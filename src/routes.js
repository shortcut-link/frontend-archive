import React from 'react';
import { renderRoutes } from 'react-router-config';

import { CreateLinkRoutes } from 'features/create-link';

const createRoutes = [...CreateLinkRoutes(), { components: <></> }];

export const Routes = () => <>{renderRoutes(createRoutes)}</>;
