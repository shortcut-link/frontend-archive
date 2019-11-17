import React from 'react';
import styled from 'styled-components';

import { Col } from 'lib/styled-components';
import { ContainerToggle, Toggle, ZeroButton } from 'ui';
import { LinkParameter } from 'api/link';

interface LinkManagementProps {
  link: {
    url: string;
    originalUrl?: string;
    transitions?: number;
    createdAt?: Date;
    user?: string;
  };
  changeLinkParameter: (type: LinkParameter | 'remove') => void;
}

interface Parameter {
  id: LinkParameter;
  text: string;
  value: boolean;
}

export const LinkManagement: React.FC<LinkManagementProps> = ({
  link: { url, transitions, createdAt, originalUrl, user },
  changeLinkParameter
}) => {
  const parameters: Array<Parameter> = [
    {
      id: 'transitions',
      text: 'Track the number of clicks on the link',
      value: typeof transitions === 'number' ? true : false
    }
  ];

  return (
    <Col gap="1rem">
      <h5>{`http://localhost:8080/${url}`}</h5>
      <Descrition>
        {user && <div>Author: {user}</div>}
        {originalUrl && <div>Original URL: {originalUrl}</div>}
        {createdAt && <div>Date of creation: {createdAt}</div>}
      </Descrition>

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

const Descrition = styled.address`
  margin-bottom: 1rem;
  padding-left: 1rem;
  font-size: 0.7rem;
`;
