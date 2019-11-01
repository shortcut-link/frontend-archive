import React, { createRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Col } from 'lib/styled-components';

import { Card, Icon } from '../atom';

interface ModalWindowProps {
  closing: () => void;
}

export const ModalWindow: React.FC<ModalWindowProps> = ({
  closing,
  children
}) => {
  const cardRef = createRef<HTMLDivElement>();

  const clickContainer = (event: React.MouseEvent<HTMLDivElement>) => {
    !cardRef.current.contains(event.target as Node) && closing();
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && closing();
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  });

  return (
    <ContainerPopup onClick={clickContainer}>
      <CardPopup ref={cardRef}>
        <Col width="20rem">
          <ClosingModal onClick={() => closing()}>
            <Icon
              name="cross"
              width={24}
              height={24}
              style={{ transition: '0.2s' }}
            />
          </ClosingModal>

          {children}
        </Col>
      </CardPopup>
    </ContainerPopup>
  );
};

const ClosingModal = styled.div`
  position: absolute;
  top: 0rem;
  right: 0rem;
  padding: 0.5rem
  cursor: pointer;

  &:hover > svg {
    stroke: var(--primary);
  }
`;

const animPopup = keyframes`
  from {
    opacity: 0;
    transform: scale(0);
  } 
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const animContainer = keyframes`
  from {
    opacity: 0;
  }  
  to {
    opacity: 1;
  }
`;

const CardPopup = styled(Card)`
  position: relative;
  padding-top: 2.5rem;
  animation: ${animPopup} 0.2s;
`;

const ContainerPopup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(22, 22, 22, 0.5);
  animation: ${animContainer} 0.2s;
`;
