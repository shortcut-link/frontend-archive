import React from 'react';

export const ItemTable = ({
  className,
  key,
  style,
  columns,
  rowData: { url, originalUrl, transitions, createdAt }
}) => {
  const outputUrl = `localhost:8080/${url}`;
  const outputTransitions =
    typeof transitions === 'number' ? transitions : 'Not';
  const outputDate = dateFormatting(createdAt);

  return (
    <div key={key} className={className} style={{ ...style, display: 'flex' }}>
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
    </div>
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
