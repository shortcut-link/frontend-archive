import React, { useRef } from 'react';
import styled from 'styled-components';

import { ButtonPrimary, Icon } from 'ui';
import { Row } from 'lib/styled-components';

export const ItemCreatedLinks = ({ url }) => {
  const linkRef = useRef();

  const clickLink = () => {
    linkRef.current.select();
    document.execCommand('copy');
  };

  return (
    <ButtonPrimary key={url} onClick={() => clickLink(url)}>
      <Row justify="center" align="center" gap="0.8rem">
        <h5>{url}</h5>
        <Icon name="copy" width={16} height={16} />

        <InputLink ref={linkRef} value={url} readOnly />
      </Row>
    </ButtonPrimary>
  );
};

const InputLink = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  user-select: none;
`;
