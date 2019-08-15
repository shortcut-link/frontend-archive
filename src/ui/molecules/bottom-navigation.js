import React from 'react';

import { Row } from 'lib/styled-components';
import { Link } from '../atom/link';
import { routesPath } from 'pages';

export const NavigationLoginPage = () => (
  <Row justify="space-between" padding="1rem 0.5rem">
    <Link to={routesPath['home']}>Return back</Link>
    <Link to={routesPath.join['registrationPage']}>Account registration</Link>
  </Row>
);

export const NavigationRegistrationPage = () => (
  <Row justify="center" padding="1rem 0.5rem">
    <Link to={routesPath.join['loginPage']}>Return back</Link>
  </Row>
);
