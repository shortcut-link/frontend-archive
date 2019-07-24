//@flow
import React from 'react';
import styled from 'styled-components';

export const ToggleSelectTheme = ({
  toggle,
  isDark
}: {
  toggle: () => void,
  isDark: boolean
}) => {
  return (
    <Box>
      <Checkbox type="checkbox" onClick={toggle} defaultChecked={isDark} />
      <Slider className="slider" />
    </Box>
  );
};

const radius = '1.4rem';

const Box = styled.label`
  position: relative;
  display: block;
  width: calc((${radius} * 2) + 8px);
  height: calc(${radius} + 8px);
`;

// TODO: Цвет брать из цветовой темы.
const Slider = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0
  left: 0;
  
  background-color: #42A5F5;
  cursor: pointer;
  border-radius: ${radius};

  &:before {
    content: "☀️";
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 4px;
    left: 4px;

    width: ${radius};
    height: ${radius};

    font-size: 0.7rem;
    line-height: 0px;
    background-color: white;
    border-radius: 50%;
    transition: .4s;
  }
`;

const Checkbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${Slider} {
    background-color: #f8bbd0;
  }

  &:checked + ${Slider}::before {
    content: '🌔';
    transform: translateX(${radius});
  }
`;
