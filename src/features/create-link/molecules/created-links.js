import React from 'react';
import { Col } from 'lib/styled-components';

import { ItemCreatedLink } from '../atom';

export const CreatedLinks = ({ links }) => {
  if (links.length === 0) return null;

  const items = links.map(({ url }) => <ItemCreatedLink key={url} url={url} />);

  return <Col gap="1rem">{items}</Col>;
};
