import React, { useState, useEffect } from 'react';
import { InfiniteLoader, Table, Column } from 'react-virtualized';
import 'react-virtualized/styles.css';

import { accountAPI } from 'api/account';
import { ItemTable } from '../atom';

export const LinksTable = () => {
  const [rowCount, setRowCount] = useState(0);
  const [loadedData, setLoadedData] = useState([]);

  useEffect(() => {
    loadMoreRows({ startIndex: 0, count: true });
  }, []);

  const loadMoreRows = ({ startIndex, count = false }) =>
    accountAPI.links(startIndex, count).then(({ count, links }) => {
      setLoadedData(arr => [...arr, ...links]);

      if (count) setRowCount(count);
    });

  return (
    <InfiniteLoader
      isRowLoaded={({ index }) => loadedData[index]}
      loadMoreRows={loadMoreRows}
      rowCount={rowCount}
    >
      {({ onRowsRendered, registerChild }) => (
        <Table
          ref={registerChild}
          width={210 + 250 + 150 + 150}
          height={300}
          headerHeight={20}
          rowHeight={35}
          rowCount={loadedData.length}
          onRowsRendered={onRowsRendered}
          rowGetter={({ index }) => loadedData[index]}
          rowRenderer={ItemTable}
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
