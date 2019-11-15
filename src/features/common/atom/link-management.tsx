import React from 'react';
import styled from 'styled-components';

import { Col } from 'lib/styled-components';
import { ContainerToggle, Toggle, ZeroButton } from 'ui';

type LinkParameter = 'tracking' | 'remove';

interface LinkManagementProps {
  link: {
    url: string;
    transitions: number | null;
    user?: string;
  };
  changeLinkParameter: (type: LinkParameter) => void;
}

interface Parameter {
  id: LinkParameter;
  text: string;
  value: boolean;
}

export const LinkManagement: React.FC<LinkManagementProps> = ({
  link: { url, transitions, user },
  changeLinkParameter
}) => {
  const parameters: Array<Parameter> = [
    {
      id: 'tracking',
      text: 'Track the number of clicks on the link',
      value: typeof transitions === 'number' ? true : false
    }
  ];

  return (
    <Col gap="1rem">
      <h5>
        {`http://localhost:8080/${url}`}{' '}
        {user && <Author>Author: {user}</Author>}
      </h5>

      <ContainerToggle gap="1rem" align="center">
        {parameters.map(({ id, text, value }) => (
          <Toggle
            key={id}
            id={id}
            switching={() => changeLinkParameter(id)}
            checked={value}
          >
            {text}
          </Toggle>
        ))}
        <ZeroButton onClick={() => changeLinkParameter('remove')}>
          Remove link
        </ZeroButton>
      </ContainerToggle>
    </Col>
  );
};

const Author = styled.span`
  display: block;
  padding: 0.5rem;
  font-size: 0.7rem;
`;
