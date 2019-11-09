import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import { InfiniteLoader, Table, Column, AutoSizer } from 'react-virtualized';
import styled from 'styled-components';
import 'react-virtualized/styles.css';

import { ItemLinksTable } from '../atom';
import {
  $links,
  $countUserLinks,
  removeLinks,
  downloadLinksProcessing,
  firstLoadCountAndLinks
} from 'pages/profile/model/links';

interface LinksTableProps {
  openLinkManagement: (payload: number) => void;
}

export const LinksTable: React.FC<LinksTableProps> = ({
  openLinkManagement
}) => {
  const links = useStore($links);
  const countUserLinks = useStore($countUserLinks);

  useEffect(() => {
    firstLoadCountAndLinks();

    return () => {
      removeLinks();
    };
  }, []);

  return (
    <Container>
      <InfiniteLoader
        isRowLoaded={({ index }) => links[index]}
        loadMoreRows={downloadLinksProcessing}
        rowCount={countUserLinks}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer style={{ width: '100%' }}>
            {({ width, height }) => (
              <Table
                ref={registerChild}
                width={width}
                height={height}
                onRowsRendered={onRowsRendered}
                rowRenderer={ItemLinksTable}
                headerHeight={20}
                rowHeight={35}
                rowCount={links.length}
                aria-label="Your links"
                rowGetter={({ index }) => links[index]}
                onRowClick={({ index }) => openLinkManagement(index)}
              >
                <Column label="Url" dataKey="url" width={width * 0.6} />
                <Column
                  label="Original Url"
                  dataKey="originalUrl"
                  width={width * 0.7}
                />
                <Column
                  label="Transitions"
                  dataKey="transitions"
                  width={width * 0.4}
                />
                <Column
                  label="Created at"
                  dataKey="createdAt"
                  width={width * 0.4}
                />
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
`;
