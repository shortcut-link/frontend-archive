import React from 'react';
import styled from 'styled-components';

import {
  EnterClickContainer,
  Slider,
  Checkbox,
  SwitchingType
} from '../atom/toggle';

interface ToggleSelectThemeProps {
  switching: SwitchingType;
  isDark: boolean;
}

export const ToggleSelectTheme: React.FC<ToggleSelectThemeProps> = ({
  switching,
  isDark
}) => {
  const radius = '1.4rem';

  return (
    <EnterClickContainer radius={radius} switching={switching}>
      <CheckBoxTheme
        type="checkbox"
        radius={radius}
        onChange={() => switching()}
        checked={isDark}
      />
      <SliderTheme className="slider" radius={radius} />
    </EnterClickContainer>
  );
};

const SliderTheme = styled(Slider)`
  background-color: ${({ theme }) => theme.palette.primary.initial.background};

  &:before {
    content: '☀️';
  }
`;

const CheckBoxTheme = styled(Checkbox)`
  &:checked + ${SliderTheme}::before {
    content: '🌙';
  }
`;
