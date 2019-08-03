//@flow
import React, { type Node } from 'react';
import { css } from 'styled-components';

type Props = {
  tagName: string,
  children: Node
};

export const WithTag = ({
  tagName: Tag = 'div',
  children,
  ...props
}: Props) => <Tag {...props}>{children}</Tag>;

const prop = (value?: string) => {
  return value ? value : 'initial';
};

export const mixins = (props: { [key: string]: string }) => css`
  justify-content: ${prop(props.justify)};
  align-items: ${prop(props.align)};
`;
