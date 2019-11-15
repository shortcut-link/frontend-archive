import React from 'react';
import styled from 'styled-components';

import { Row, Col } from 'lib/styled-components';

export type SwitchingType = (payload: void) => void;

interface ToggleProps {
  id: string;
  switching: SwitchingType;
  checked: boolean;
  radius?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  children,
  id,
  switching,
  checked,
  radius = '1.2rem'
}) => (
  <Row gap="0.8rem" align="center" justify="space-between">
    <Label htmlFor={id}>{children}</Label>
    <EnterClickContainer switching={switching} radius={radius}>
      <Checkbox
        type="checkbox"
        onChange={() => switching()}
        defaultChecked={checked}
        id={id}
        radius={radius}
      />
      <Slider className="slider" radius={radius} />
    </EnterClickContainer>
  </Row>
);

interface BoxContainerProps {
  switching: SwitchingType;
  radius?: string;
}

export const EnterClickContainer: React.FC<BoxContainerProps> = ({
  children,
  radius,
  switching
}) => {
  const EnterPress = (e: React.KeyboardEvent) =>
    e.key === 'Enter' && switching();

  return (
    <Box radius={radius} onKeyPress={EnterPress}>
      {children}
    </Box>
  );
};

interface PropsStyled {
  radius: string;
}

const Box = styled.label<PropsStyled>`
  position: relative;
  display: block;
  width: calc((${({ radius }) => radius} * 2) + 8px);
  height: calc(${({ radius }) => radius} + 8px);
`;

export const Slider = styled.span<PropsStyled>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0
  left: 0;
  
  background-color: var(--border);
  border-radius: ${({ radius }) => radius};
  cursor: pointer;
  transition: 0.4s;

  &:before {
    content: "";
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 4px;
    left: 4px;

    width: ${({ radius }) => radius};
    height: ${({ radius }) => radius};

    font-size: calc(${({ radius }) => radius} / 2);
    line-height: 0px;
    background-color: white;
    border-radius: 50%;
    transition: 0.4s;
  }
`;

export const Checkbox = styled.input<PropsStyled>`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked {
    transform: translateX(${({ radius }) => radius});
  }

  &:checked + ${Slider} {
    background-color: var(--primary);
  }

  &:checked + ${Slider}::before {
    transform: translateX(${({ radius }) => radius});
  }
`;

const Label = styled.label`
  cursor: pointer;
`;

export const ContainerToggle = styled(Col)`
  & > :not(:last-child) {
    border-bottom: 1px solid var(--border);
    padding-bottom: 1rem;
  }
`;
