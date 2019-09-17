import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import { InfiniteLoader, Table, Column } from 'react-virtualized';
import 'react-virtualized/styles.css';

import { ItemTable } from '../atom';
import { $links, $countUserLinks } from 'pages/profile/model/store';
import { removeLinks } from 'pages/profile/model/events';
import { getLinks } from 'pages/profile/model/events';

export const LinksTable = ({ setLinkManagement }) => {
  const links = useStore($links);
  const countUserLinks = useStore($countUserLinks);

  useEffect(() => {
    loadMoreRows({ startIndex: 0, count: true });
    return removeLinks();
  }, []);

  const loadMoreRows = data => {
    getLinks(data);
  };

  return (
    <InfiniteLoader
      isRowLoaded={({ index }) => links[index]}
      loadMoreRows={loadMoreRows}
      rowCount={countUserLinks}
    >
      {({ onRowsRendered, registerChild }) => (
        <Table
          ref={registerChild}
          width={210 + 250 + 150 + 150}
          height={300}
          headerHeight={20}
          rowHeight={35}
          rowCount={links.length}
          onRowsRendered={onRowsRendered}
          rowGetter={({ index }) => links[index]}
          rowRenderer={ItemTable}
          onRowClick={setLinkManagement}
        >
          <Column label="Url" dataKey="url" width={210} />
          <Column label="Original Url" dataKey="originalUrl" width={250} />
          <Column label="Transitions" dataKey="transitions" width={150} />
          <Column label="Created at" dataKey="createdAt" width={150} />
        </Table>
      )}
    </InfiniteLoader>
  );
};
