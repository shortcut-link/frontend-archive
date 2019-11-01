import React from 'react';
import { useStore } from 'effector-react';
import styled from 'styled-components';

import {
  $linkManagement,
  changeLinkParameter
} from 'pages/profile/model/link-management';
import { $links } from 'pages/profile/model/links';
import { Col } from 'lib/styled-components';
import { Toggle, ZeroButton } from 'ui';

export const LinkManagement = () => {
  const linkManagement = useStore($linkManagement);
  const { url, transitions } = useStore($links)[linkManagement];

  const elements = [
    {
      id: 'tracking',
      text: 'Track the number of clicks on the link',
      value: typeof transitions === 'number' ? true : false
    }
  ];

  return (
    <Col gap="1rem">
      <h5>{`http://localhost:8080/${url}`}</h5>
      <ContainerToggle gap="1rem" align="center">
        {elements.map(({ id, text, value }) => (
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

const ContainerToggle = styled(Col)`
  & > :not(:last-child) {
    border-bottom: 1px solid var(--border);
    padding-bottom: 1rem;
  }
`;
