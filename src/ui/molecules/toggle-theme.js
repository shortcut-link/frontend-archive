import React from 'react';
import styled from 'styled-components';

import { BoxContainer, Slider, Checkbox } from '../atom/toggle';

export const ToggleSelectTheme = ({ toggle, isDark }) => {
  const radius = '1.4rem';

  return (
    <BoxContainer radius={radius} toggle={toggle}>
      <CheckBoxTheme
        type="checkbox"
        radius={radius}
        onChange={toggle}
        checked={isDark}
        value={isDark}
      />
      <SliderTheme className="slider" radius={radius} />
    </BoxContainer>
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
