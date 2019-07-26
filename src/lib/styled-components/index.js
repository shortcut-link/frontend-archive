//@flow
import React, { type Node } from 'react';

type Props = {
  tagName: string,
  children: Node
};

export const WithTag = ({
  tagName: Tag = 'div',
  children,
  ...props
}: Props) => <Tag {...props}>{children}</Tag>;
