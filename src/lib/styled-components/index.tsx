import React from 'react';
import styled, { css } from 'styled-components';

interface WithTagProps {
  tagName?: string;
  children: React.ReactNode;
}
// type
export const WithTag = ({ tagName: Tag = 'div', children, ...props }: any) => (
  <Tag {...props}>{children}</Tag>
);

const prop = (value: string) => {
  return value ? value : 'initial';
};

interface MixinsProps {
  justify?: string;
  align?: string;
  flexWrap?: string;
  width?: string;
  height?: string;
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  padding?: string;
}

export const mixins = (props: MixinsProps) => css`
  justify-content: ${prop(props.justify)};
  align-items: ${prop(props.align)};
  flex-wrap: ${prop(props.flexWrap)};
  width: ${prop(props.width)};
  height: ${prop(props.height)};
  min-width: ${prop(props.minWidth)};
  max-width: ${prop(props.maxWidth)};
  min-height: ${prop(props.minHeight)};
  max-height: ${prop(props.maxHeight)};
  padding: ${prop(props.padding)};
`;

interface RowOrColProps extends MixinsProps {
  gap?: string;
}

export const Row = styled(WithTag)`
  display: flex;
  flex-direction: row;
  text-align: left;

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
  text-align: left;

  ${mixins}

  ${p =>
    p.gap &&
    css`
      & > :not(:first-child) {
        margin-top: ${p.gap};
      }
    `}
`;
