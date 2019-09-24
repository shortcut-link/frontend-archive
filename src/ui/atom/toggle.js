import React from 'react';
import styled from 'styled-components';

export const Toggle = ({ toggle, id, value = false, radius = '1.2rem' }) => {
  const EnterPress = ({ key }) => key === 'Enter' && toggle();

  return (
    <Box radius={radius} onKeyPress={EnterPress}>
      <Checkbox
        type="checkbox"
        radius={radius}
        onChange={toggle}
        value={value}
        defaultChecked={value}
        id={id}
      />
      <Slider className="slider" radius={radius} />
    </Box>
  );
};

export const Box = styled.label`
  position: relative;
  display: block;
  width: calc((${({ radius }) => radius} * 2) + 8px);
  height: calc(${({ radius }) => radius} + 8px);
`;

export const Slider = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0
  left: 0;
  
  background-color: ${({ theme }) => theme.palette.decoration.borders};
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

export const Checkbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked {
    transform: translateX(${({ radius }) => radius});
  }

  &:checked + ${Slider} {
    background-color: ${({ theme }) =>
      theme.palette.primary.initial.background};
  }

  &:checked + ${Slider}::before {
    transform: translateX(${({ radius }) => radius});
  }
`;
