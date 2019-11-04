import React from 'react';
import styled, { css } from 'styled-components';

type AnyTag =
  | string
  | React.FunctionComponent<any>
  | (new (props: any) => React.Component);

interface WithTagProps {
  tag?: AnyTag;
  className?: string;
}

export const WithTag: React.FC<WithTagProps> = ({
  tag: Tag = 'div',
  children,
  ...props
}) => <Tag {...props}>{children}</Tag>;

const prop = (value: string) => {
  return value ? value : 'initial';
};

interface MixinsProps {
  justify?: string;
  align?: string;
  flexwrap?: string;
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
  flex-wrap: ${prop(props.flexwrap)};
  width: ${prop(props.width)};
  height: ${prop(props.height)};
  min-width: ${prop(props.minWidth)};
  max-width: ${prop(props.maxWidth)};
  min-height: ${prop(props.minHeight)};
  max-height: ${prop(props.maxHeight)};
  padding: ${prop(props.padding)};
`;

interface RowOrColProps extends MixinsProps, WithTagProps {
  gap?: string;
  [key: string]: any;
}

export const Row = styled(WithTag)<RowOrColProps>`
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

export const Col = styled(WithTag)<RowOrColProps>`
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
