import styled, { css } from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { mixins } from 'lib/styled-components';

export const cssLink = css`
  text-decoration: none;
  transition: 0.15s;
  color: inherit;
  font-size: inherit;

  &:hover {
    color: ${({ theme }) => theme.palette.primary.hover.background};
  }
`;

export const Link = styled(RouterLink)`
  ${cssLink}

  ${mixins}
`;
