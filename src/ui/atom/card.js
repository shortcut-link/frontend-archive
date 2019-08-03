import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-flow: column;
  padding: 2rem;

  box-shadow: 0px 0px 22px -5px rgba(36, 37, 38, 0.48);
  border-radius: 4px;

  ${({ theme }) => theme.embed.card}
`;
