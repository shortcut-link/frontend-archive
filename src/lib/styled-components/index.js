import React from 'react';
import styled, { css } from 'styled-components';

export const WithTag = ({ tagName: Tag = 'div', children, ...props }) => (
  <Tag {...props}>{children}</Tag>
);

const prop = value => {
  return value ? value : 'initial';
};

export const mixins = props => css`
  justify-content: ${prop(props.justify)};
  align-items: ${prop(props.align)};
  width: ${prop(props.width)};
  padding: ${prop(props.padding)};
`;

export const Row = styled(WithTag)`
  display: flex;
  flex-direction: row;

  ${mixins}

  ${p =>
    p.gap &&
    css`
      & > :not(:first-child) {
        margin-left: ${p.gap};
      }
    `}
`;

export const Col = styled(WithTag)`
  display: flex;
  flex-direction: column;

  ${mixins}

  ${p =>
    p.gap &&
    css`
      & > :not(:first-child) {
        margin-top: ${p.gap};
      }
    `}
`;
