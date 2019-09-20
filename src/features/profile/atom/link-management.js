import React from 'react';
import { useStore } from 'effector-react';
import styled from 'styled-components';

import { $links, $linkManagement } from 'pages/profile/model/store';
import { changeLinkParameter } from 'pages/profile/model/events';
import { Col } from 'lib/styled-components';
import { ToggleWithText, ZeroButton } from 'ui';

export const LinkManagement = () => {
  const linkManagement = useStore($linkManagement);
  const { url, transitions } = useStore($links)[linkManagement];

  const elements = [
    {
      id: 'tracking',
      text: 'Track the number of clicks on the link',
      defaultChecked: typeof transitions === 'number' ? true : false
    }
  ];

  const clickSettings = id => {
    changeLinkParameter({
      property: id
    });
  };

  return (
    <Col gap="1rem">
      <h5>{`http://localhost:8080/${url}`}</h5>
      <ContainerToggle gap="1rem" align="center">
        {elements.map(({ id, text, defaultChecked }) => (
          <ToggleWithText
            text={text}
            key={id}
            id={id}
            toggle={() => clickSettings(id)}
            defaultChecked={defaultChecked}
          />
        ))}
        <ZeroButton onClick={() => clickSettings('remove')}>
          Remove link
        </ZeroButton>
      </ContainerToggle>
    </Col>
  );
};

const ContainerToggle = styled(Col)`
  & > :not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.palette.decoration.borders};
    padding-bottom: 1rem;
  }
`;
