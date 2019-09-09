import React, { useState, useEffect } from 'react';
import { InfiniteLoader, Table, Column } from 'react-virtualized';
import 'react-virtualized/styles.css';

import { accountAPI } from 'api/account';

export const LinksTable = () => {
  const [rowCount, setRowCount] = useState(0);
  const [loadedData, setLoadedData] = useState([]);

  useEffect(() => {
    loadMoreRows({ startIndex: 0, stopIndex: 15 });
  }, []);

  const loadMoreRows = ({ startIndex, stopIndex }) =>
    accountAPI.links(startIndex, stopIndex).then(({ count, links }) => {
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
          width={180 * 4}
          height={150}
          headerHeight={20}
          rowHeight={30}
          rowCount={loadedData.length}
          onRowsRendered={onRowsRendered}
          rowGetter={({ index }) => loadedData[index]}
        >
          <Column label="Url" dataKey="url" width={180} />
          <Column label="Original Url" dataKey="originalUrl" width={180} />
          <Column label="Transitions" dataKey="transitions" width={180} />
          <Column label="Created at" dataKey="createdAt" width={180} />
        </Table>
      )}
    </InfiniteLoader>
  );
};
