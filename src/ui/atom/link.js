import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const Link = styled(RouterLink)`
  text-decoration: none;
  transition: 0.15s;
  color: inherit;

  &:hover {
    color: ${({ theme }) => theme.palette.primary.hover.background};
  }
`;
