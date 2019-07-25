//@flow
import React from 'react';
import type { Node } from 'react';

type Props = {
  tagName: ?string,
  children: Node
};

export const WithTag = ({ tagName: Tag, children, ...props }: Props) => (
  <Tag {...props}>{children}</Tag>
);

WithTag.defaultProps = {
  tagName: 'div'
};
