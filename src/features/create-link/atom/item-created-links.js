import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { ButtonPrimary, Icon } from 'ui';
import { Row } from 'lib/styled-components';

export const ItemCreatedLinks = ({ url }) => {
  const [isCopy, setIsCopy] = useState(false);
  const linkRef = useRef();

  const onClick = () => {
    linkRef.current.select();
    document.execCommand('copy');

    setIsCopy(true);

    setTimeout(() => setIsCopy(false), 1500);
  };

  return (
    <ButtonPrimary key={url} onClick={onClick}>
      <Row justify="center" align="center" gap="0.8rem">
        <h5>{url}</h5>

        <Icon name={isCopy ? 'check-circle' : 'copy'} width={16} height={16} />

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
