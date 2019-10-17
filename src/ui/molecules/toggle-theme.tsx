import React from 'react';
import styled from 'styled-components';

import { EnterClickContainer, Slider, Checkbox } from '../atom/toggle';

interface ToggleSelectThemeProps {
  toggle: () => void;
  isDark: boolean;
}

export const ToggleSelectTheme: React.FC<ToggleSelectThemeProps> = ({
  toggle,
  isDark
}) => {
  const radius = '1.4rem';

  return (
    <EnterClickContainer radius={radius} toggle={toggle}>
      <CheckBoxTheme
        type="checkbox"
        radius={radius}
        onChange={toggle}
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
