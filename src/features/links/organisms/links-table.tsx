import React from 'react';
import {
  InfiniteLoader,
  Table,
  Column,
  AutoSizer,
  IndexRange,
  ColumnProps,
  defaultTableRowRenderer,
  TableRowProps,
  Index
} from 'react-virtualized';
import styled from 'styled-components';
import 'react-virtualized/styles.css';

import { Link } from 'api/link';
import { formattingShortedURL, dateFormatting } from 'lib/formatting';
import { Icon } from 'ui';

interface LinksTableProps {
  links: Link[];
  countLinks: number;
  columns: ColumnProps[];
  downloadLinks: (payload: IndexRange) => void;
  openLinkManagementWindow: (payload: number) => void;
}

export const LinksTable: React.FC<LinksTableProps> = ({
  links,
  countLinks,
  columns,
  downloadLinks,
  openLinkManagementWindow
}) => {
  const formattingLinks = links.map(
    ({ url, transitions, createdAt, ...props }) => {
      return {
        url: formattingShortedURL(url),
        transitions: typeof transitions === 'number' ? transitions : 'Not',
        createdAt: dateFormatting(createdAt),
        ...props
      };
    }
  );

  const loadMoreRows = (payload: IndexRange) => {
    downloadLinks(payload);

    return new Promise(resolve => resolve());
  };

  const rowClassName = ({ index }: Index) => {
    if (index < 0) return;

    return index % 2 === 0 ? 'even' : 'notEven';
  };

  const rowRenderer = (defaultProps: TableRowProps) => {
    const indexRow = defaultProps.index;

    // Check that this is the last element and if not all links are loaded then show the loader
    if (indexRow === formattingLinks.length && indexRow !== countLinks) {
      return (
        <div
          key={defaultProps.key}
          style={{
            ...defaultProps.style,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Icon name="loader" />
        </div>
      );
    }

    return defaultTableRowRenderer(defaultProps);
  };

  return (
    <Container>
      <InfiniteLoader
        isRowLoaded={({ index }) => !!formattingLinks[index]}
        loadMoreRows={loadMoreRows}
        rowCount={countLinks}
        minimumBatchSize={30}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer style={{ width: '100%' }}>
            {({ width, height }) => (
              <Table
                ref={registerChild}
                width={width}
                height={height}
                onRowsRendered={onRowsRendered}
                rowClassName={rowClassName}
                rowRenderer={rowRenderer}
                headerHeight={20}
                rowHeight={35}
                rowCount={formattingLinks.length}
                aria-label="Your links"
                rowGetter={({ index }) => formattingLinks[index]}
                onRowClick={({ index }) => openLinkManagementWindow(index)}
              >
                {columns.map(({ width: columnWidth, dataKey, ...props }) => (
                  <Column
                    key={dataKey}
                    dataKey={dataKey}
                    width={width * columnWidth}
                    {...props}
                  />
                ))}
              </Table>
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    </Container>
  );
};

const Container = styled.div`
  height: 400px;
  width: 750px;

  .even,
  .notEven {
    cursor: pointer;
  }

  .even {
    background-color: var(--border);
  }

  .even:hover,
  .notEven:hover {
    background-color: var(--primary);
  }
`;
