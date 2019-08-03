import styled from 'styled-components';

import { WithTag, mixins } from 'lib/styled-components';

export const Container = styled(WithTag)`
  ${mixins}
  display: inherit;

  max-width: 50rem;
  width: 100%;
  padding: 1rem;
`;
