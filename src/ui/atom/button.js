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
  color: ${({ theme }) => theme.palette.primary.initial.color};
  background-color: ${({ theme }) => theme.palette.decoration.borders};

  &:not([disabled]):hover {
    background-color: ${({ theme }) => theme.palette.primary.hover.background};
    color: ${({ theme }) => theme.palette.primary.hover.color};
  }

  &:disabled {
    cursor: default;
  }
`;

export const ButtonLoader = ({ text, disabled, loader, ...props }) => (
  <ButtonPrimary style={{ height: '3rem' }} disabled={disabled} {...props}>
    {loader ? <Icon name="loader" width="1rem" height="1rem" /> : text}
  </ButtonPrimary>
);
