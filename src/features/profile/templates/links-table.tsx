import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import { Event } from 'effector';
import { InfiniteLoader, Table, Column } from 'react-virtualized';
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
  openLinkManagement: Event<number>;
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
    <InfiniteLoader
      isRowLoaded={({ index }) => links[index]}
      loadMoreRows={downloadLinksProcessing}
      rowCount={countUserLinks}
      tabIndex={2}
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
          rowRenderer={ItemLinksTable}
          onRowClick={({ index }) => openLinkManagement(index)}
          tabIndex={3}
          aria-label="Your links"
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
