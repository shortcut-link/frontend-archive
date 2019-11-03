import React from 'react';

import { ItemCreatedLink } from '../atom';
import { CreatedLink } from 'api/link';
import { Col } from 'lib/styled-components';

interface CreatedLinksProps {
  links: Array<CreatedLink>;
}

export const CreatedLinks: React.FC<CreatedLinksProps> = ({ links }) => {
  if (links.length === 0) return null;

  const items = links.map(({ url }) => <ItemCreatedLink key={url} url={url} />);

  return <Col gap="1rem">{items}</Col>;
};
