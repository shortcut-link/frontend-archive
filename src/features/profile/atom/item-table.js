import React from 'react';
import styled, { css } from 'styled-components';

export const ItemTable = ({
  index,
  className,
  key,
  style,
  columns,
  rowData: { url, originalUrl, transitions, createdAt },
  onRowClick = () => {}
}) => {
  const outputUrl = `localhost:8080/${url}`;
  const outputTransitions =
    typeof transitions === 'number' ? transitions : 'Not';
  const outputDate = dateFormatting(createdAt);

  const backgroundColor = index % 2 === 0 ? true : false;

  return (
    <ContainerItem
      key={key}
      className={className}
      style={{ ...style, display: 'flex' }}
      backgroundColor={backgroundColor}
      onClick={() => onRowClick(index)}
      aria-label="Links"
    >
      <div {...columns[0].props} title={outputUrl}>
        {outputUrl}
      </div>

      <div {...columns[1].props}>{originalUrl}</div>

      <div {...columns[2].props} title={outputTransitions}>
        {outputTransitions}
      </div>

      <div {...columns[3].props} title={outputDate}>
        {outputDate}
      </div>
    </ContainerItem>
  );
};

const dateFormatting = date =>
  new Date(date).toLocaleDateString('ru', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });

const ContainerItem = styled.div`
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${({ theme }) =>
      theme.palette.primary.initial.background};
  }

  ${({ theme, backgroundColor }) => css`
    background-color: ${backgroundColor
      ? theme.palette.decoration.borders
      : undefined};
  `}
`;
