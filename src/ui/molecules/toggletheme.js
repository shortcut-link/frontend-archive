import React from 'react';
import styled from 'styled-components';

import { Box, Slider, Checkbox } from '../atom/toggle';

export const ToggleSelectTheme = ({ toggle, isDark }) => {
  const radius = '1.4rem';

  return (
    <Box radius={radius}>
      <CheckBoxTheme
        type="checkbox"
        radius={radius}
        onClick={toggle}
        defaultChecked={isDark}
      />
      <SliderTheme className="slider" radius={radius} />
    </Box>
  );
};

const SliderTheme = styled(Slider)`
  background-color: ${({ theme }) => theme.palette.primary.initial.background};

  &:before {
    content: '☀️';
  }
`;

const CheckBoxTheme = styled(Checkbox)`
  &:checked + ${Slider}::before {
    content: '🌙';
  }
`;
