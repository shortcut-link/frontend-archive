import React from 'react';
import styled from 'styled-components';

import { Icon } from './icon';

export const ButtonPrimary = styled.button`
  font-size: 0.9rem;
  line-height: 0.9rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  transition: 0.4s;
  user-select: none;
  font-family: inherit;
  color: ${({ theme }) => theme.palette.primary.initial.color};
  background-color: ${({ theme }) => theme.palette.decoration.borders};

  &:not([disabled]):hover,
  &:not([disabled]):focus {
    background-color: ${({ theme }) => theme.palette.primary.hover.background};
    color: ${({ theme }) => theme.palette.primary.hover.color};
  }

  &:disabled {
    cursor: default;
  }
`;

export const ButtonLoader = ({ text, disabled, loader, style, ...props }) => (
  <ButtonPrimary
    disabled={disabled}
    style={{
      height: '3rem',
      lineHeight: '0',
      ...style
    }}
    {...props}
  >
    {loader ? <Icon name="loader" width="1rem" height="1rem" /> : text}
  </ButtonPrimary>
);

export const ZeroButton = styled(ButtonPrimary)`
  padding: 0.5rem 1rem;
  background-color: transparent;
  transition: 0.2s;

  &:not([disabled]):hover,
  &:not([disabled]):focus {
    background-color: transparent;
    color: ${({ theme }) => theme.palette.primary.hover.background};
  }
`;
