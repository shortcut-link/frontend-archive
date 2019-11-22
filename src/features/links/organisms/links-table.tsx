import React from 'react';
import {
  InfiniteLoader,
  Table,
  Column,
  AutoSizer,
  IndexRange,
  ColumnProps
} from 'react-virtualized';
import styled from 'styled-components';
import 'react-virtualized/styles.css';

import { Link } from 'api/link';
import { formattingShortedURL, dateFormatting } from 'lib/formatting';

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

  return (
    <Container>
      <InfiniteLoader
        isRowLoaded={({ index }) => !!formattingLinks[index]}
        loadMoreRows={downloadLinks}
        rowCount={countLinks}
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

const rowClassName = ({ index }: { index: number }) => {
  if (index < 0) return;

  return index % 2 === 0 ? 'even' : 'notEven';
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
