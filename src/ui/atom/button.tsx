import React from 'react';
import styled from 'styled-components';

import { Icon } from './icon';

export const ButtonPrimary = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.7rem 1rem;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  transition: 0.4s;
  user-select: none;
  font-family: inherit;
  color: var(--primary-text);
  background-color: var(--border);

  &:not([disabled]):hover,
  &:not([disabled]):focus {
    background-color: var(--primary-hover);
    color: var(--primary-hover-text);
  }

  &:disabled {
    cursor: default;
  }
`;

interface ButtonLoaderProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loader: boolean;
}

export const ButtonLoader: React.FC<ButtonLoaderProps> = ({
  children,
  loader,
  style,
  ...props
}) => (
  <ButtonPrimary
    style={{
      minHeight: '3rem',
      ...style
    }}
    {...props}
  >
    {loader ? <Icon name="loader" width="1rem" height="1rem" /> : children}
  </ButtonPrimary>
);

export const ZeroButton = styled(ButtonPrimary)`
  padding: 0.5rem 1rem;
  background-color: transparent;
  transition: 0.2s;

  &:not([disabled]):hover,
  &:not([disabled]):focus {
    background-color: transparent;
    color: var(--primary-hover);
  }
`;
